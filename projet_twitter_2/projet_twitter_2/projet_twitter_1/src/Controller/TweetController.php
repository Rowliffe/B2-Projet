<?php

namespace App\Controller;

use App\Entity\Tweet;
use App\Entity\User;
use App\Form\TweetType;
use App\Form\UserType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\BinaryFileResponse;


class TweetController extends AbstractController
{
    #[Route('/', name: 'homepage')]
    public function index(): Response
    {
        return $this->render('tweet/index.html.twig');
    }

    #[Route('/tweet', name: 'tweet', methods: ['GET'])]
    public function homepage(EntityManagerInterface $entityManager): Response
    {
        $tweetRepository = $entityManager->getRepository(Tweet::class);
        $tweets = $tweetRepository->findAll();

        return $this->render('tweet/homepage.html.twig', [
            'tweets' => $tweets
        ]);
    }

    #[Route('/inscription',name:'inscription' ,methods: ['GET','POST'])]
    public function inscription(Request $request, EntityManagerInterface $entityManager, AuthenticationUtils $authenticationUtils, UserPasswordHasherInterface $passwordHasher):Response
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $user->setPassword($passwordHasher->hashPassword($user, $user->getPassword()));
            $user->setRoles(['ROLE_USER']);
            $entityManager->persist($user);
            $entityManager->flush();
            return $this->redirectToRoute('app_login');
        }
        return $this->render('security/inscription.html.twig',[
            'form' => $form,
        ]);
    }

    #[Route('/add_tweet', name:'add_tweet', methods: ['GET','POST'])]
    public function add_tweet(Request $request, EntityManagerInterface $entityManager ) :Response
    {
        $tweet = new Tweet();
        $form = $this->createForm(TweetType::class, $tweet);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $tweet->setAuthor($this->getUser());
            $tweet->setCreatedAt(new \DateTimeImmutable('now'));
            $entityManager->persist($tweet);
            $entityManager->flush();
            return $this->redirectToRoute('tweet');
        }
        return $this->render('tweet/add_tweet.html.twig',[
            'form' => $form,
        ]);

    }

    #[Route('/tweet/edit/{id}', name: 'edit_tweet', methods: ['GET', 'POST'])]
    public function editTweet(Tweet $tweet,Request $request, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(TweetType::class, $tweet);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid() && $this->getUser() == $tweet->getAuthor()) {
            $entityManager->flush();
            return $this->redirectToRoute('tweet');
        }
        return $this->render('tweet/edit_tweet.html.twig',[
            'tweet' => $tweet,
            'form' => $form,
        ]);
    }

    #[Route('/tweet/delete/{id}', name: 'delete_tweet', methods: ['GET'])]
    public function deleteTweet(Tweet $tweet, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($tweet);
        $entityManager->flush();
        return $this->redirectToRoute('tweet');
    }

    #[Route('/tweet/like/{id}', name: 'tweet_like', methods: ['GET'])]
    #[Route('/api/tweet/like/{id}', name: 'api_tweet_like', methods: ['GET'])]
    public function likeTweet(Tweet $tweet = null, EntityManagerInterface $entityManager, Request $request): Response
    {
        if (!$tweet) {
            return new JsonResponse(['error' => 'Tweet not found'], 404);
        }

        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'User must be authenticated'], 401);
        }

        try {
            $existingLike = $entityManager->getRepository(Tweet::class)->findOneBy([
                'idParent' => $tweet->getId(),
                'author' => $user,
                'type' => 'like'
            ]);

            if ($existingLike) {
                $entityManager->remove($existingLike);
                $entityManager->flush();
                $message = 'Like retiré !';
            } else {
                $tweetLike = new Tweet();
                $tweetLike->setAuthor($user);
                $tweetLike->setTitle($tweet->getTitle());
                $tweetLike->setContent($tweet->getContent());
                $tweetLike->setPicture($tweet->getPicture());
                $tweetLike->setCreatedAt(new \DateTimeImmutable('now'));
                $tweetLike->setIdParent($tweet->getId());
                $tweetLike->setType('like');
                
                $entityManager->persist($tweetLike);
                $entityManager->flush();
                $message = 'Like ajouté !';
            }

            // Si c'est une requête API, retourner une réponse JSON
            if (str_contains($request->getPathInfo(), '/api/')) {
                return new JsonResponse([
                    'success' => true,
                    'message' => $message
                ]);
            }

            // Sinon, rediriger vers la page précédente
            $referer = $request->headers->get('referer');
            if ($referer) {
                return $this->redirect($referer);
            }
            
            return $this->redirectToRoute('tweet');
            
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/tweet/delete/{id}', name: 'api_tweet_delete', methods: ['GET'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function apiDeleteTweet(Tweet $tweet, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->getUser();
        
        // Vérifier que l'utilisateur est le propriétaire du tweet
        if ($tweet->getAuthor() !== $user) {
            return new JsonResponse(['error' => 'Vous ne pouvez supprimer que vos propres tweets'], 403);
        }
        
        try {
            $entityManager->remove($tweet);
            $entityManager->flush();
            return new JsonResponse(['success' => true, 'message' => 'Tweet supprimé avec succès']);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Erreur lors de la suppression: ' . $e->getMessage()], 500);
        }
    }
    
        

    #[Route(path: '/tweet/retweet/{id}', name: 'tweet_retweet', methods: ['GET'])]
    public function retweet(Tweet $tweet, EntityManagerInterface $entityManager): Response
    {
        $existingRetweet = $entityManager->getRepository(Tweet::class)->findOneBy([
            'idParent' => $tweet->getId(),
            'author' => $this->getUser(),
            'type' => 'retweet'
        ]);

        if ($existingRetweet) {
            $entityManager->remove($existingRetweet);
            $entityManager->flush();
            $this->addFlash('success', 'Retweet annulé !');
        } else {
            $tweetRetweet = new Tweet();
            $tweetRetweet->setAuthor($this->getUser());
            $tweetRetweet->setTitle($tweet->getTitle());
            $tweetRetweet->setContent($tweet->getContent());
            $tweetRetweet->setPicture($tweet->getPicture());
            $tweetRetweet->setCreatedAt(new \DateTimeImmutable('now'));
            $tweetRetweet->setIdParent($tweet->getId());
            $tweetRetweet->setType('retweet');
            
            $entityManager->persist($tweetRetweet);
            $entityManager->flush();
            
        }
        
        return $this->redirectToRoute('tweet');
    }
    #[Route('/api/tweet/retweet/{id}', name: 'api_tweet_retweet', methods: ['GET'])]
    public function apiRetweet(Tweet $tweet, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Non authentifié'], 401);
        }

        $existingRetweet = $entityManager->getRepository(Tweet::class)->findOneBy([
            'idParent' => $tweet->getId(),
            'author' => $user,
            'type' => 'retweet'
        ]);

        if ($existingRetweet) {
            $entityManager->remove($existingRetweet);
            $entityManager->flush();
            return new JsonResponse(['success' => true, 'message' => 'Retweet annulé']);
        } else {
            $tweetRetweet = new Tweet();
            $tweetRetweet->setAuthor($user);
            $tweetRetweet->setTitle($tweet->getTitle());
            $tweetRetweet->setContent($tweet->getContent());
            $tweetRetweet->setPicture($tweet->getPicture());
            $tweetRetweet->setCreatedAt(new \DateTimeImmutable('now'));
            $tweetRetweet->setIdParent($tweet->getId());
            $tweetRetweet->setType('retweet');

            $entityManager->persist($tweetRetweet);
            $entityManager->flush();

            return new JsonResponse(['success' => true, 'message' => 'Retweet ajouté']);
        }
    }

    #[Route('/tweet/comment/{id}', name: 'tweet_comment', methods: ['GET', 'POST'])]
    public function comment(Tweet $tweet, Request $request, EntityManagerInterface $entityManager): Response
    {
        $comment = new Tweet();
        $form = $this->createForm(TweetType::class, $comment);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $comment->setAuthor($this->getUser());
            $comment->setCreatedAt(new \DateTimeImmutable('now'));
            $comment->setIdParent($tweet->getId());
            $comment->setType('comment');
            
            $entityManager->persist($comment);
            $entityManager->flush();
            
            return $this->redirectToRoute('tweet');
        }
        
        return $this->render('tweet/comment.html.twig', [
            'form' => $form,
            'tweet' => $tweet
        ]);
    }
    

    #[Route('/profile', name: 'user_profile')]
    public function userProfile(EntityManagerInterface $entityManager): Response
    {
        $user = $this->getUser();
        $tweetRepository = $entityManager->getRepository(Tweet::class);
        
        // Récupérer les tweets de l'utilisateur
        $userTweets = $tweetRepository->findBy(['author' => $user, 'type' => null]);
        
        // Récupérer les likes de l'utilisateur
        $userLikes = $tweetRepository->findBy(['author' => $user, 'type' => 'like']);
        
        // Récupérer les retweets de l'utilisateur
        $userRetweets = $tweetRepository->findBy(['author' => $user, 'type' => 'retweet']);

        return $this->render('user/profile.html.twig', [
            'user' => $user,
            'tweets' => $userTweets,
            'likes' => $userLikes,
            'retweets' => $userRetweets
        ]);
    }


    #[Route('/tweet/{id}', name: 'tweet_show', methods: ['GET'])]
    public function showTweet(Tweet $tweet, EntityManagerInterface $entityManager): Response
    {
        // Récupérer les commentaires du tweet
        $comments = $entityManager->getRepository(Tweet::class)->findBy([
            'idParent' => $tweet->getId(),
            'type' => 'comment'
        ], ['createdAt' => 'DESC']);

        // Récupérer tous les tweets pour vérifier les likes et retweets
        $tweets = $entityManager->getRepository(Tweet::class)->findAll();

        return $this->render('tweet/show.html.twig', [
            'tweet' => $tweet,
            'comments' => $comments,
            'tweets' => $tweets
        ]);
    }

    #[Route('/profile/edit', name: 'edit_profile', methods: ['GET', 'POST'])]
    public function editProfile(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): Response
    {
        $user = $this->getUser();
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($form->get('password')->getData()) {
                $user->setPassword($passwordHasher->hashPassword($user, $form->get('password')->getData()));
            }
            $entityManager->flush();
            return $this->redirectToRoute('user_profile');
        }

        return $this->render('user/edit_profile.html.twig', [
            'form' => $form,
            'user' => $user
        ]);
    }

    #[Route('/api/tweets', name: 'api_tweets', methods: ['GET'])]
    public function getTweets(EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $tweetRepository = $entityManager->getRepository(Tweet::class);
            $user = $this->getUser();
            
            // Récupérer seulement les tweets originaux (sans idParent et sans type ou type=null)
            $originalTweets = $tweetRepository->findBy([
                'idParent' => null,
                'type' => null
            ], ['createdAt' => 'DESC']);

            // Récupérer tous les tweets pour calculer les likes/retweets
            $allTweets = $tweetRepository->findAll();

            // Si l'utilisateur est connecté, récupérer ses likes et retweets
            $userLikes = [];
            $userRetweets = [];
            if ($user) {
                $userLikesData = $tweetRepository->findBy(['author' => $user, 'type' => 'like']);
                $userRetweetsData = $tweetRepository->findBy(['author' => $user, 'type' => 'retweet']);
                
                foreach ($userLikesData as $like) {
                    $userLikes[] = $like->getIdParent();
                }
                foreach ($userRetweetsData as $retweet) {
                    $userRetweets[] = $retweet->getIdParent();
                }
            }

            $tweetsArray = array_map(function($tweet) use ($allTweets, $userLikes, $userRetweets) {
                $author = $tweet->getAuthor();
                $createdAt = $tweet->getCreatedAt();
                
                // Compter les commentaires de ce tweet
                $commentsCount = 0;
                foreach ($allTweets as $t) {
                    if ($t->getIdParent() === $tweet->getId() && $t->getType() === 'comment') {
                        $commentsCount++;
                    }
                }
                
                return [
                    'id' => $tweet->getId(),
                    'title' => $tweet->getTitle(),
                    'content' => $tweet->getContent(),
                    'picture' => $tweet->getPicture(),
                    'createdAt' => $createdAt ? $createdAt->format('Y-m-d H:i:s') : null,
                    'type' => $tweet->getType(),
                    'idParent' => $tweet->getIdParent(),
                    'author' => $author ? [
                        'id' => $author->getId(),
                        'pseudo' => $author->getPseudo(),
                        'name' => $author->getName(),
                        'lastname' => $author->getLastname(),
                        'photo' => $author->getPhoto()
                    ] : null,
                    'likesCount' => $tweet->getLikesCount($allTweets),
                    'retweetsCount' => $tweet->getRetweetsCount($allTweets),
                    'commentsCount' => $commentsCount,
                    'isLiked' => in_array($tweet->getId(), $userLikes),
                    'isRetweeted' => in_array($tweet->getId(), $userRetweets)
                ];
            }, $originalTweets);

            return new JsonResponse($tweetsArray);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/my-tweets', name: 'api_my_tweets', methods: ['GET'])]
    public function getMyTweets(EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $user = $this->getUser();
            if (!$user) {
                return new JsonResponse(['error' => 'Non authentifié'], 401);
            }

            $tweetRepository = $entityManager->getRepository(Tweet::class);
            
            // Récupérer uniquement les tweets originaux de l'utilisateur (pas les likes/retweets)
            $userTweets = $tweetRepository->findBy(
                ['author' => $user, 'type' => null], 
                ['createdAt' => 'DESC']
            );

            // Récupérer tous les tweets pour calculer les likes/retweets
            $allTweets = $tweetRepository->findAll();

            // Récupérer les likes et retweets de l'utilisateur
            $userLikes = [];
            $userRetweets = [];
            $userLikesData = $tweetRepository->findBy(['author' => $user, 'type' => 'like']);
            $userRetweetsData = $tweetRepository->findBy(['author' => $user, 'type' => 'retweet']);
            
            foreach ($userLikesData as $like) {
                $userLikes[] = $like->getIdParent();
            }
            foreach ($userRetweetsData as $retweet) {
                $userRetweets[] = $retweet->getIdParent();
            }

            $tweetsArray = array_map(function($tweet) use ($allTweets, $userLikes, $userRetweets) {
                $author = $tweet->getAuthor();
                $createdAt = $tweet->getCreatedAt();
                
                // Compter les commentaires de ce tweet
                $commentsCount = 0;
                foreach ($allTweets as $t) {
                    if ($t->getIdParent() === $tweet->getId() && $t->getType() === 'comment') {
                        $commentsCount++;
                    }
                }
                
                return [
                    'id' => $tweet->getId(),
                    'title' => $tweet->getTitle(),
                    'content' => $tweet->getContent(),
                    'picture' => $tweet->getPicture(),
                    'createdAt' => $createdAt ? $createdAt->format('Y-m-d H:i:s') : null,
                    'type' => $tweet->getType(),
                    'author' => $author ? [
                        'id' => $author->getId(),
                        'pseudo' => $author->getPseudo(),
                        'name' => $author->getName(),
                        'lastname' => $author->getLastname(),
                        'photo' => $author->getPhoto()
                    ] : null,
                    'likesCount' => $tweet->getLikesCount($allTweets),
                    'retweetsCount' => $tweet->getRetweetsCount($allTweets),
                    'commentsCount' => $commentsCount,
                    'isLiked' => in_array($tweet->getId(), $userLikes),
                    'isRetweeted' => in_array($tweet->getId(), $userRetweets)
                ];
            }, $userTweets);

            return new JsonResponse([
                'tweets' => $tweetsArray,
                'count' => count($tweetsArray)
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/tweets', name: 'api_add_tweet', methods: ['POST'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function addTweet(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $user = $this->getUser();
            if (!$user) {
                return new JsonResponse(['error' => 'Non authentifié'], 401);
            }

            $title = $request->request->get('title');
            $content = $request->request->get('content');

            if (!$title || !$content) {
                return new JsonResponse(['error' => 'Titre et contenu requis'], 400);
            }

            $picturePath = null;

            // Gérer l'URL d'image
            $imageUrl = $request->request->get('imageUrl');
            if ($imageUrl && filter_var($imageUrl, FILTER_VALIDATE_URL)) {
                $picturePath = $imageUrl;
            } else {
                // Gérer l'upload d'image
                $pictureFile = $request->files->get('picture');
                if ($pictureFile) {
                    // Vérifier que c'est bien une image
                    $allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                    if (!in_array($pictureFile->getMimeType(), $allowedMimeTypes)) {
                        return new JsonResponse(['error' => 'Format d\'image non supporté. Utilisez JPG, PNG, GIF ou WebP.'], 400);
                    }

                    // Vérifier la taille du fichier (max 5MB)
                    if ($pictureFile->getSize() > 5000000) {
                        return new JsonResponse(['error' => 'L\'image est trop volumineuse. Taille maximum : 5MB.'], 400);
                    }

                    // Générer un nom unique pour le fichier
                    $originalFilename = pathinfo($pictureFile->getClientOriginalName(), PATHINFO_FILENAME);
                    $safeFilename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $originalFilename);
                    $newFilename = $safeFilename.'-'.uniqid().'.'.$pictureFile->guessExtension();

                    // Déplacer le fichier dans le dossier d'upload
                    try {
                        $uploadsDirectory = $this->getParameter('kernel.project_dir').'/public/uploads/tweets';
                        $pictureFile->move($uploadsDirectory, $newFilename);
                        $picturePath = '/uploads/tweets/'.$newFilename;
                    } catch (FileException $e) {
                        return new JsonResponse(['error' => 'Erreur lors de l\'upload de l\'image.'], 500);
                    }
                }
            }

            $tweet = new Tweet();
            $tweet->setTitle($title);
            $tweet->setContent($content);
            $tweet->setAuthor($user);
            $tweet->setCreatedAt(new \DateTimeImmutable());
            $tweet->setPicture($picturePath);

            $entityManager->persist($tweet);
            $entityManager->flush();

            return new JsonResponse([
                'success' => true,
                'id' => $tweet->getId(),
                'message' => 'Tweet créé avec succès',
                'picture' => $picturePath
            ]);

        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }

    #[Route('/api/profile/edit', name: 'api_edit_profile', methods: ['POST'])]
    public function apiEditProfile(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Non authentifié'], 401);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) $user->setName($data['name']);
        if (isset($data['lastname'])) $user->setLastname($data['lastname']);
        if (isset($data['pseudo'])) $user->setPseudo($data['pseudo']);
        if (isset($data['photo'])) $user->setPhoto($data['photo']);
        if (!empty($data['password'])) {
            $user->setPassword($passwordHasher->hashPassword($user, $data['password']));
        }

        $entityManager->flush();

        return new JsonResponse(['success' => true]);
    }

    #[Route('/api/tweet/{id}/comments', name: 'api_tweet_comments', methods: ['GET'])]
    public function getTweetComments(Tweet $tweet, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $tweetRepository = $entityManager->getRepository(Tweet::class);
            
            // Récupérer les commentaires du tweet
            $comments = $tweetRepository->findBy([
                'idParent' => $tweet->getId(),
                'type' => 'comment'
            ], ['createdAt' => 'ASC']);

            $commentsArray = array_map(function($comment) {
                $author = $comment->getAuthor();
                $createdAt = $comment->getCreatedAt();
                
                return [
                    'id' => $comment->getId(),
                    'content' => $comment->getContent(),
                    'createdAt' => $createdAt ? $createdAt->format('Y-m-d H:i:s') : null,
                    'author' => $author ? [
                        'id' => $author->getId(),
                        'pseudo' => $author->getPseudo(),
                        'name' => $author->getName(),
                        'lastname' => $author->getLastname(),
                        'photo' => $author->getPhoto()
                    ] : null,
                ];
            }, $comments);

            return new JsonResponse([
                'comments' => $commentsArray,
                'count' => count($commentsArray)
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/tweet/{id}/comment', name: 'api_add_comment', methods: ['POST'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function addComment(Tweet $tweet, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $user = $this->getUser();
            if (!$user) {
                return new JsonResponse(['error' => 'Non authentifié'], 401);
            }

            $data = json_decode($request->getContent(), true);
            $content = $data['content'] ?? '';

            if (empty($content)) {
                return new JsonResponse(['error' => 'Le contenu du commentaire est requis'], 400);
            }

            $comment = new Tweet();
            $comment->setContent($content);
            $comment->setAuthor($user);
            $comment->setCreatedAt(new \DateTimeImmutable());
            $comment->setIdParent($tweet->getId());
            $comment->setType('comment');
            $comment->setTitle(''); // Les commentaires n'ont pas de titre

            $entityManager->persist($comment);
            $entityManager->flush();

            // Retourner le commentaire créé
            $author = $comment->getAuthor();
            $createdAt = $comment->getCreatedAt();

            return new JsonResponse([
                'success' => true,
                'comment' => [
                    'id' => $comment->getId(),
                    'content' => $comment->getContent(),
                    'createdAt' => $createdAt ? $createdAt->format('Y-m-d H:i:s') : null,
                    'author' => [
                        'id' => $author->getId(),
                        'pseudo' => $author->getPseudo(),
                        'name' => $author->getName(),
                        'lastname' => $author->getLastname(),
                        'photo' => $author->getPhoto()
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Erreur: ' . $e->getMessage()
            ], 500);
        }
    }

    #[Route('/api/my-likes', name: 'api_my_likes', methods: ['GET'])]
    public function getMyLikes(EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $user = $this->getUser();
            if (!$user) {
                return new JsonResponse(['error' => 'Non authentifié'], 401);
            }

            $tweetRepository = $entityManager->getRepository(Tweet::class);
            
            // Récupérer les likes de l'utilisateur
            $userLikes = $tweetRepository->findBy(
                ['author' => $user, 'type' => 'like'], 
                ['createdAt' => 'DESC']
            );

            // Récupérer les tweets originaux likés
            $likedTweetsArray = [];
            $allTweets = $tweetRepository->findAll(); // Récupérer une seule fois
            
            foreach ($userLikes as $like) {
                $originalTweet = $tweetRepository->find($like->getIdParent());
                if ($originalTweet && $originalTweet->getType() !== 'like' && $originalTweet->getType() !== 'retweet') {
                    $author = $originalTweet->getAuthor();
                    $createdAt = $originalTweet->getCreatedAt();
                    
                    // Calculer les stats du tweet original
                    $likesCount = $originalTweet->getLikesCount($allTweets);
                    $retweetsCount = $originalTweet->getRetweetsCount($allTweets);
                    $commentsCount = $originalTweet->getCommentsCount($allTweets);
                    
                    $likedTweetsArray[] = [
                        'id' => $originalTweet->getId(),
                        'title' => $originalTweet->getTitle(),
                        'content' => $originalTweet->getContent(),
                        'picture' => $originalTweet->getPicture(),
                        'createdAt' => $createdAt ? $createdAt->format('Y-m-d H:i:s') : null,
                        'type' => $originalTweet->getType(),
                        'idParent' => $originalTweet->getIdParent(),
                        'likesCount' => $likesCount,
                        'retweetsCount' => $retweetsCount,
                        'commentsCount' => $commentsCount,
                        'isLiked' => true, // Puisque c'est dans ses likes
                        'isRetweeted' => false, // On pourrait calculer mais pas nécessaire ici
                        'likedAt' => $like->getCreatedAt() ? $like->getCreatedAt()->format('Y-m-d H:i:s') : null,
                        'author' => $author ? [
                            'id' => $author->getId(),
                            'pseudo' => $author->getPseudo(),
                            'name' => $author->getName(),
                            'lastname' => $author->getLastname(),
                            'photo' => $author->getPhoto()
                        ] : null,
                    ];
                }
            }

            return new JsonResponse([
                'likes' => $likedTweetsArray,
                'count' => count($likedTweetsArray),
                'debug' => [
                    'userLikesCount' => count($userLikes),
                    'userId' => $user->getId()
                ]
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/my-retweets', name: 'api_my_retweets', methods: ['GET'])]
    public function getMyRetweets(EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $user = $this->getUser();
            if (!$user) {
                return new JsonResponse(['error' => 'Non authentifié'], 401);
            }

            $tweetRepository = $entityManager->getRepository(Tweet::class);
            
            // Récupérer les retweets de l'utilisateur
            $userRetweets = $tweetRepository->findBy(
                ['author' => $user, 'type' => 'retweet'], 
                ['createdAt' => 'DESC']
            );

            $retweetsArray = array_map(function($retweet) {
                $author = $retweet->getAuthor();
                $createdAt = $retweet->getCreatedAt();
                
                return [
                    'id' => $retweet->getId(),
                    'title' => $retweet->getTitle(),
                    'content' => $retweet->getContent(),
                    'picture' => $retweet->getPicture(),
                    'createdAt' => $createdAt ? $createdAt->format('Y-m-d H:i:s') : null,
                    'type' => $retweet->getType(),
                    'idParent' => $retweet->getIdParent(),
                    'author' => $author ? [
                        'id' => $author->getId(),
                        'pseudo' => $author->getPseudo(),
                        'name' => $author->getName(),
                        'lastname' => $author->getLastname(),
                        'photo' => $author->getPhoto()
                    ] : null,
                ];
            }, $userRetweets);

            return new JsonResponse([
                'retweets' => $retweetsArray,
                'count' => count($retweetsArray)
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/image/{folder}/{filename}', name: 'serve_image', methods: ['GET'])]
    public function serveImage(string $folder, string $filename): Response
    {
        $projectDir = $this->getParameter('kernel.project_dir');
        $filePath = $projectDir.'/public/uploads/'.$folder.'/'.$filename;
        
        if (!file_exists($filePath)) {
            return new JsonResponse(['error' => 'Image non trouvée'], 404);
        }
        
        $response = new BinaryFileResponse($filePath);
        
        // Ajouter les en-têtes CORS
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type');
        
        return $response;
    }

}       