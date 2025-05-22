#!/bin/bash

response=$(curl -s -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{"email": "teste@email.com", "password": "123"}')

token=$(echo $response | jq -r .token)

if [ "$token" == "null" ]; then
  echo "Falha ao obter token. Resposta: $response"
  exit 1
fi

echo "Token: $token"

protected_response=$(curl -s -X POST http://localhost:3000/cpf/?id=1 \
-H "Authorization: Bearer $token")

echo "$protected_response"