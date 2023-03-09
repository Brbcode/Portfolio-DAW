<?php

namespace App\EventListener;


class DetailExceptionListener extends ProdExceptionListener
{
    protected function extractJSON(\Throwable $exception): array
    {
        $json = parent::extractJSON($exception);

        $trace_count = count($exception->getTrace());
        $count = isset($_ENV['MAXIMUM_TRACE_COUNT'])?min($_ENV['MAXIMUM_TRACE_COUNT'],$trace_count):$trace_count;

        $json['environment'] = $_SERVER['APP_ENV'];
        $json['exception'] = [
            'trace' => array_slice($exception->getTrace(),0,$count),
            'type' => $exception::class,
            'message' => $exception->getMessage(),
            'code' => $exception->getCode(),
        ];

        return  $json;
    }

}