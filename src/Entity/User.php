<?php

namespace App\Entity;

use App\Common\CreationDate;
use App\Common\UuidGenerator;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    use CreationDate;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    private Uuid $uuid;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\Email(message: 'The email {{ value }} is not a valid email.')]
    private string $email;

    #[ORM\Column(length: 180)]
    #[Assert\Length(min: 3)]
    private string $username;

    #[ORM\Column]
    private bool $isActive;

    #[ORM\Column]
    private array $roles;

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private string $password;

    public function __construct(string $username, string $email, string $password, bool $isActive=false,
                                array $roles=[], Uuid|string|null $id=null)
    {
        $this->uuid = UuidGenerator::from($id);
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
        $this->isActive = $isActive;
        $this->roles = $roles;
    }

    public function getId(): Uuid
    {
        return $this->uuid;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->uuid;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getUsername(): string{
        return $this->username;
    }

    public function setUsername(string $username): self{
        throw new \Exception("This method is not defined yet");
    }

    public function getEmail(): string{
        return $this->email;
    }

    public function setEmail(string $email): self{
        throw new \Exception("This method is not defined yet");
    }

    public function isActive() : bool{
        return $this->isActive;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }
}
