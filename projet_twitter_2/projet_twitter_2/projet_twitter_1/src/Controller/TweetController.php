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
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;


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

    #[Route('/api/profile', name: 'api_user_profile', methods: ['GET'])]
    public function apiUserProfile(EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Non authentifié'], 401);
        }

        $tweetRepository = $entityManager->getRepository(Tweet::class);

        // Récupérer les tweets de l'utilisateur
        $userTweets = $tweetRepository->findBy(['author' => $user, 'type' => null]);

        // Récupérer les likes de l'utilisateur
        $userLikes = $tweetRepository->findBy(['author' => $user, 'type' => 'like']);

        // Récupérer les retweets de l'utilisateur
        $userRetweets = $tweetRepository->findBy(['author' => $user, 'type' => 'retweet']);

        return new JsonResponse([
            'user' => [
                'id' => $user->getId(),
                'pseudo' => $user->getPseudo(),
                'name' => $user->getName(),
                'lastname' => $user->getLastname(),
                'photo' => $user->getPhoto()
            ],
            'tweets' => array_map(function($tweet) {
                return [
                    'id' => $tweet->getId(),
                    'title' => $tweet->getTitle(),
                    'content' => $tweet->getContent(),
                    'picture' => $tweet->getPicture(),
                    'createdAt' => $tweet->getCreatedAt() ? $tweet->getCreatedAt()->format('Y-m-d H:i:s') : null,
                    'type' => $tweet->getType(),
                    'idParent' => $tweet->getIdParent()
                ];
            }, $userTweets),
            'likesCount' => count($userLikes),
            'retweetsCount' => count($userRetweets)
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
            $tweets = $tweetRepository->findAll();

            $tweetsArray = array_map(function($tweet) use ($tweets) {
                $author = $tweet->getAuthor();
                $createdAt = $tweet->getCreatedAt();
                
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
                    'likesCount' => $tweet->getLikesCount($tweets),
                    'retweetsCount' => $tweet->getRetweetsCount($tweets)
                ];
            }, $tweets);

            return new JsonResponse($tweetsArray);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }



}       