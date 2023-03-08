<?php

namespace App\EventListener;


class DetailExceptionListener extends ProdExceptionListener
{
    protected function extractJSON(\Throwable $exception): array
    {
        $json = parent::extractJSON($exception);

        $json['environment_mode'] = 'development';
        $json['exception'] = [
            'trace' => $exception->getTrace(),
            'type' => $exception::class,
            'message' => $exception->getMessage(),
            'code' => $exception->getCode(),
        ];

        return  $json;
    }

}