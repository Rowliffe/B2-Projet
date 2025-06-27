<?php

namespace App\Entity;

use App\Repository\TweetRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TweetRepository::class)]
class Tweet
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 32)]
    private ?string $title = null;

    #[ORM\Column(length: 128)]
    private ?string $content = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $picture = null;

    #[ORM\Column(nullable: true)]
    private ?int $idParent = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(length: 24, nullable: true)]
    private ?string $type = null;

    #[ORM\ManyToOne(inversedBy: 'tweets')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $author = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): static
    {
        $this->picture = $picture;

        return $this;
    }

    public function getIdParent(): ?int
    {
        return $this->idParent;
    }

    public function setIdParent(?int $idParent): static
    {
        $this->idParent = $idParent;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): static
    {
        $this->author = $author;

        return $this;
    }

    public function getLikesCount($tweets): int
    {
        $count = 0;
        foreach ($tweets as $t) {
            if ($t->getType() === 'like' && $t->getIdParent() === $this->getId()) {
                $count++;
            }
        }
        return $count;
    }

    public function getRetweetsCount($tweets): int
    {
        $count = 0;
        foreach ($tweets as $t) {
            if ($t->getType() === 'retweet' && $t->getIdParent() === $this->getId()) {
                $count++;
            }
        }
        return $count;
    }

    public function getCommentsCount($tweets): int
    {
        $count = 0;
        foreach ($tweets as $t) {
            if ($t->getType() === 'comment' && $t->getIdParent() === $this->getId()) {
                $count++;
            }
        }
        return $count;
    }
}
