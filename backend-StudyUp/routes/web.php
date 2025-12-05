<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
DB_CONNECTION=sqlsrv
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=xxxx
DB_DATABASE=yourdb


Route::middleware('api')->group(function () {
    Route::get('/annee', function () {
        return DB::table('annee')->pluck('nom');
    });
});

?>
