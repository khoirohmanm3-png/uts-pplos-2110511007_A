<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;

// Rute untuk mengambil data karyawan
Route::get('/employees', [EmployeeController::class, 'index']);