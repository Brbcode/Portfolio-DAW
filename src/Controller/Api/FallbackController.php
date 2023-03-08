<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FallbackController extends AbstractController
{

    #[Route(['/{endpoint}'], name: 'app_api_fallback', requirements: ['endpoint'=>'.+'], priority: -1)]
    public function index(): Response
    {
        throw new \Exception();
    }
}
