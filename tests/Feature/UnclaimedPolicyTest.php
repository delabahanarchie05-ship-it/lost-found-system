<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class UnclaimedPolicyTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_from_the_unclaimed_policy(): void
    {
        $this->get(route('unclaimed-policy'))
            ->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_view_the_unclaimed_policy(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('unclaimed-policy'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('unclaimed-policy'));
    }
}