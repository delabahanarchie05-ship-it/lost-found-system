<?php

namespace Tests\Feature;

use App\Models\dashboard;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get(route('dashboard'));
        $response->assertOk();
    }

    public function test_dashboard_shows_recent_uploaded_items_from_the_database()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        dashboard::create([
            'item' => 'Mobile phone',
            'description' => 'Black phone in a case',
            'location' => 'OSA',
            'date' => '2026-09-26',
            'status' => 'Unclaimed',
        ]);

        $response = $this->get(route('dashboard'));

        $response->assertOk();
        $response->assertSee('Mobile phone');
        $response->assertSee('OSA');
    }
}
