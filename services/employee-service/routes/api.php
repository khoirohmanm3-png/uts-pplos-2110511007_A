<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Auth
Route::post('/login', [AuthController::class, 'login']);

// Employee CRUD
Route::get('/employees', [EmployeeController::class, 'index']);      // READ ALL (GET)
Route::post('/employees', [EmployeeController::class, 'store']);     // CREATE (POST)
Route::get('/employees/{id}', [EmployeeController::class, 'show']);  // READ SINGLE (GET)
Route::put('/employees/{id}', [EmployeeController::class, 'update']); // UPDATE (PUT)
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']); // DELETE (DELETE)