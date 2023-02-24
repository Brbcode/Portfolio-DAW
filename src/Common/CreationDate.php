<?php

namespace App\Common;

use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;

trait CreationDate
{
    #[ORM\Column]
    private DateTimeImmutable $createdAt;

    public function __construct(){
        $this->createdAt = new DateTimeImmutable();
    }

    public function getCreationDate(): DateTimeImmutable{
        return $this->createdAt;
    }
}