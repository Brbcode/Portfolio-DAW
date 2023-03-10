<?php

namespace App\Controller\Api;

use App\Exception\DomainException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FallbackController extends AbstractController
{

    #[Route(['/{endpoint}'], name: 'app_api_fallback', requirements: ['endpoint'=>'.+'], priority: -1)]
    public function index(string $endpoint): Response
    {
        throw new DomainException("Api endpoint '/api/$endpoint' not found.",404);
    }
}
