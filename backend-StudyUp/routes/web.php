<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::middleware('api')->group(function () {
    Route::get('/annees', function () {
        return DB::table('annee')->pluck('nom');
    });
});

?>
