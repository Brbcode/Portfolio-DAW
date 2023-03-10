<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EndpointController extends AbstractController
{

    #[Route(['/endpoint'], name: 'app_endpoint')]
    public function index(Request $request): JsonResponse
    {
        return $this->json([
            'request' => $request
        ]);
    }
}
