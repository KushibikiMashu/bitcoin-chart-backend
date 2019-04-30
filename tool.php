<?php

function createJson(string $filename){
    $data = [];
    $fp   = fopen("{$filename}.csv", 'r');
    while (($csv = fgetcsv($fp)) !== false) {
        $data[] = [
            'id'       => (int)$csv[0],
            'buyPrice' => (int)$csv[1],
            'datetime' => $csv[2],
        ];
    }
    fclose($fp);

    $json = fopen("{$filename}.json", 'w+b');
    fwrite($json, json_encode($data, JSON_UNESCAPED_UNICODE));
    fclose($json);
}

foreach (['zaif', 'bitflyer', 'coincheck'] as $filename) {
    createJson($filename);
}
