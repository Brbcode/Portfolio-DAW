<?php

namespace App\Exception;

class InvalidArgumentException extends \InvalidArgumentException implements IDomainException
{
    public function __construct(string $message = "", int $code = 400, ?\Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}