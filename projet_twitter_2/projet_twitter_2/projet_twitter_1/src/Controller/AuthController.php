<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;


class AuthController extends AbstractController
{
    #[Route('/api/csrf-token', name: 'api_csrf_token', methods: ['GET'])]
    public function csrf(CsrfTokenManagerInterface $csrfTokenManager): JsonResponse
    {
        $token = $csrfTokenManager->getToken('authenticate')->getValue();
        return new JsonResponse(['csrfToken' => $token]);


    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher,
        JWTTokenManagerInterface $jwtManager
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $username = $data['_email'] ?? '';
        $password = $data['_password'] ?? '';

        $user = $em->getRepository(User::class)->findOneBy(['email' => $username]);

        if (!$user || !$hasher->isPasswordValid($user, $password)) {
            return new JsonResponse(['error' => 'Invalid credentials'], 401);
        }

        $token = $jwtManager->create($user);

        return new JsonResponse([
            'token' => $token,
            'username' => $user->getUserIdentifier(),
            'roles' => $user->getRoles(),
        ]);
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher,
        JWTTokenManagerInterface $jwtManager
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // Validation des données requises
        if (empty($data['email']) || empty($data['password']) || empty($data['name']) || 
            empty($data['lastname']) || empty($data['pseudo']) || empty($data['country'])) {
            return new JsonResponse(['error' => 'Tous les champs obligatoires doivent être remplis'], 400);
        }

        // Vérifier si l'email existe déjà
        $existingUser = $em->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return new JsonResponse(['error' => 'Cet email est déjà utilisé'], 400);
        }

        // Vérifier si le pseudo existe déjà
        $existingPseudo = $em->getRepository(User::class)->findOneBy(['pseudo' => $data['pseudo']]);
        if ($existingPseudo) {
            return new JsonResponse(['error' => 'Ce pseudo est déjà utilisé'], 400);
        }

        try {
            $user = new User();
            $user->setEmail($data['email']);
            $user->setName($data['name']);
            $user->setLastname($data['lastname']);
            $user->setPseudo($data['pseudo']);
            $user->setCountry($data['country']);
            
            // Date de naissance (optionnelle)
            if (!empty($data['birthday'])) {
                $birthday = new \DateTime($data['birthday']);
                $user->setBirthday($birthday);
            } else {
                // Date par défaut si non fournie
                $user->setBirthday(new \DateTime('1990-01-01'));
            }

            // Champs optionnels
            if (isset($data['phone'])) {
                $user->setPhone($data['phone']);
            }
            if (isset($data['bio'])) {
                $user->setBio($data['bio']);
            }
            if (isset($data['photo'])) {
                $user->setPhoto($data['photo']);
            }

            // Hasher le mot de passe
            $hashedPassword = $hasher->hashPassword($user, $data['password']);
            $user->setPassword($hashedPassword);

            $em->persist($user);
            $em->flush();

            // Créer un token JWT pour l'utilisateur nouvellement créé
            $token = $jwtManager->create($user);

            return new JsonResponse([
                'message' => 'Utilisateur créé avec succès',
                'token' => $token,
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'name' => $user->getName(),
                    'lastname' => $user->getLastname(),
                    'pseudo' => $user->getPseudo()
                ]
            ], 201);

        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Erreur lors de la création de l\'utilisateur: ' . $e->getMessage()], 500);
        }
    }

    #[Route('/api/profile', name: 'api_profile', methods: ['GET'])]
    public function getProfile(): JsonResponse
    {
        $user = $this->getUser();
        
        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non authentifié'], 401);
        }

        return new JsonResponse([
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'name' => $user->getName(),
                'lastname' => $user->getLastname(),
                'pseudo' => $user->getPseudo(),
                'phone' => $user->getPhone(),
                'bio' => $user->getBio(),
                'birthday' => $user->getBirthday() ? $user->getBirthday()->format('Y-m-d') : null,
                'country' => $user->getCountry(),
                'photo' => $user->getPhoto(),
                'roles' => $user->getRoles()
            ]
        ]);
    }

    #[Route('/api/profile/edit', name: 'api_profile_edit', methods: ['POST'])]
    public function editProfile(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher
    ): JsonResponse {
        $user = $this->getUser();
        
        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non authentifié'], 401);
        }

        $data = json_decode($request->getContent(), true);

        // Mettre à jour les champs modifiables
        if (isset($data['name'])) {
            $user->setName($data['name']);
        }
        
        if (isset($data['lastname'])) {
            $user->setLastname($data['lastname']);
        }
        
        if (isset($data['pseudo'])) {
            // Vérifier si le pseudo est déjà utilisé par un autre utilisateur
            $existingUser = $em->getRepository(User::class)->findOneBy(['pseudo' => $data['pseudo']]);
            if ($existingUser && $existingUser->getId() !== $user->getId()) {
                return new JsonResponse(['error' => 'Ce pseudo est déjà utilisé'], 400);
            }
            $user->setPseudo($data['pseudo']);
        }
        
        if (isset($data['phone'])) {
            $user->setPhone($data['phone']);
        }
        
        if (isset($data['bio'])) {
            $user->setBio($data['bio']);
        }
        
        if (isset($data['country'])) {
            $user->setCountry($data['country']);
        }
        
        if (isset($data['photo'])) {
            $user->setPhoto($data['photo']);
        }

        // Mettre à jour le mot de passe si fourni
        if (isset($data['password']) && !empty($data['password'])) {
            $hashedPassword = $hasher->hashPassword($user, $data['password']);
            $user->setPassword($hashedPassword);
        }

        try {
            $em->persist($user);
            $em->flush();

            return new JsonResponse([
                'message' => 'Profil mis à jour avec succès',
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'name' => $user->getName(),
                    'lastname' => $user->getLastname(),
                    'pseudo' => $user->getPseudo(),
                    'phone' => $user->getPhone(),
                    'bio' => $user->getBio(),
                    'birthday' => $user->getBirthday() ? $user->getBirthday()->format('Y-m-d') : null,
                    'country' => $user->getCountry(),
                    'photo' => $user->getPhoto()
                ]
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Erreur lors de la mise à jour du profil'], 500);
        }
    }
}

