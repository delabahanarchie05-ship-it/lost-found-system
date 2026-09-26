<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => 'password'],
        );

        User::firstOrCreate(
            ['email' => 'osa@lostfound.test'],
            [
                'name' => 'OSA',
                'password' => 'Admin12345',
                'role' => 'admin',
                'email_verified_at' => now(),
            ],
        );

        User::firstOrCreate(
            ['email' => 'safety.security@lostfound.test'],
            [
                'name' => 'Safety Security',
                'password' => 'Admin12345',
                'role' => 'admin',
                'email_verified_at' => now(),
            ],
        );
    }
}
