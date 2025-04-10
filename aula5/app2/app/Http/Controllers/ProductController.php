<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ProductController extends Controller
{
    public function getProducts() 
    {
        $client = new Client();

        // Fazer a requisição GET para a API
        $responseOfApi = $client->get("http://localhost:3000/products");

        // Decodificar o corpo da resposta JSON
        $responseData = json_decode($responseOfApi->getBody());

        // Verificar se a resposta foi decodificada corretamente
        if (is_null($responseData)) {
            return response()->json(['msg' => 'Erro ao decodificar a resposta da API.'], 500);
        }

        // Mapeando os dados
        $response = array_map(function($element) {
            return [
                'nameOfCar' => "($element->name) - ($element->description)",
                'price' => $element->price
            ];
        }, $responseData);

        // Retornando a resposta em formato JSON
        return response()->json([
            'msg' => 'from ProductController',
            'response of localhost:3000' => $response
        ]);
    }
}