<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
DB_CONNECTION=sqlsrv
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME='root'
DB_PASSWORD=''
DB_DATABASE='studyup'


Route::middleware('api')->group(function () {
    Route::get('/annee', function () {
        return DB::table('annee')->pluck('nom');
    });
});

?>
