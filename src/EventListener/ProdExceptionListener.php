<?php

namespace App\EventListener;

use App\Exception\IDomainException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;

class ProdExceptionListener implements IExceptionListener
{
    protected function extractJSON(\Throwable $exception): array
    {
        $json = [];
        if($exception instanceof IDomainException){
            $json['message'] = $exception->getMessage();
            $json['code'] = $exception->getCode();
        }
        else{
            $json['message'] = 'Internal server error';
            $json['code'] = 500;
        }

        return $json;
    }

    public function onKernelException(ExceptionEvent $event): void{
        $exception = $event->getThrowable();

        $json = $this->extractJSON($exception);

        $response = new JsonResponse($json);
        $response->setStatusCode($json['code']);

        $event->setResponse($response);
    }
}