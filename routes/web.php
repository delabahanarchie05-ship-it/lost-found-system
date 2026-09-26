<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::inertia('upload-lost-items', 'upload-lost-items')->name('upload.lost-items');
    Route::inertia('unclaimed-policy', 'unclaimed-policy')->name('unclaimed-policy');
    Route::post('dashboard', [DashboardController::class, 'store'])->name('dashboard.store');
    Route::put('dashboard/{dashboard}', [DashboardController::class, 'update'])->name('dashboard.update');
    Route::delete('dashboard/{dashboard}', [DashboardController::class, 'destroy'])->name('dashboard.destroy');
});

require __DIR__.'/settings.php';
