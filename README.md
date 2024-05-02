# Scrap For Consultaprocessos - RJ

Esse é apenas um caso de estudo sobre puppeteer

# Site alvo
https://www.consultaprocessos.rj.gov.br/UPOWEB/servlet/StartCISPage?PAGEURL=/cisnatural/NatLogon.html&xciParameters.natsession=Consulta_UPO

# Objetivo
- Ignorar o captcha do Google
- Matar o captcha interno
- Obter o resultado final através de webscrap


# Rota da API

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
        "F_77": "1234567",
        "F_89": "123456789",
        "F_80": "12345678910",
        "F_92": "12345678911",
        "F_102": "2022"
    }',
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json'
    ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
```
