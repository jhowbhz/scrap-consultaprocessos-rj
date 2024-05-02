# Scrap For Consultaprocessos - RJ

Esse é apenas um caso de estudo sobre puppeteer

## Site alvo
https://www.consultaprocessos.rj.gov.br/UPOWEB/servlet/StartCISPage?PAGEURL=/cisnatural/NatLogon.html&xciParameters.natsession=Consulta_UPO

## Objetivo
- Ignorar o captcha do Google
- Matar o captcha interno
- Obter o resultado final através de webscrap


## Rotas da API

GET
```
http://localhost:3000/
```

POST
```
http://localhost:3000/api
```

## Como consumir com PHP
```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => 'http://localhost:3000/api',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS =>'{
        "origem": "1234567",
        "numero": "123456789",
        "complemento": "12345678910",
        "ano": "2022",
        "email": "email@tantofaz.com"
    }',
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json'
    ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
```
