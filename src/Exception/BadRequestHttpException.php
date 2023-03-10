<?php

namespace App\Exception;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException as ParentException;

class BadRequestHttpException extends ParentException implements IDomainException
{
    public function __construct(string $message = '', \Throwable $previous = null, int $code = Response::HTTP_BAD_REQUEST, array $headers = [])
    {
        parent::__construct($message, $previous, $code, $headers);
    }

}