<?php

namespace App\Command;

use App\Entity\Tweet;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-tweet',
    description: 'Creates a new tweet with a test user if needed',
)]
class CreateTweetCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        // First, check if we have a test user, if not create one
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['email' => 'test@example.com']);

        if (!$user) {
            $user = new User();
            $user->setEmail('test@example.com');
            $user->setPseudo('TestUser');
            $user->setPassword($this->passwordHasher->hashPassword($user, 'password123'));
            $user->setRoles(['ROLE_USER']);
            $user->setName('Test');
            $user->setLastname('User');
            $user->setCountry('France');
            $user->setBirthday(new \DateTime('1990-01-01'));
            
            $this->entityManager->persist($user);
            $this->entityManager->flush();
            
            $io->success('Created test user: test@example.com');
        }

        // Create a new tweet
        $tweet = new Tweet();
        $tweet->setTitle('Mon premier tweet');
        $tweet->setContent('Ceci est un tweet de test créé via la commande Symfony !');
        $tweet->setCreatedAt(new \DateTimeImmutable());
        $tweet->setAuthor($user);
        $tweet->setType('tweet');

        $this->entityManager->persist($tweet);
        $this->entityManager->flush();

        $io->success('Tweet created successfully!');

        return Command::SUCCESS;
    }
} 