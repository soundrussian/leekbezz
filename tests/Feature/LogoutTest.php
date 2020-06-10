<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LogoutTest extends TestCase
{
    use RefreshDatabase;

    public function testLogsOutCurrentUser()
    {
        $this->withoutExceptionHandling();
        $user = factory(User::class)->create();

        $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password'
        ], [
            'Referer' => 'localhost' // We need to pass Referer to make sure Sanctum middleware starts a session
        ]);

        $this->assertAuthenticatedAs($user);

        $this->deleteJson('/api/logout', [], [
                'Referer' => 'localhost' // We need to pass Referer to make sure Sanctum middleware starts a session
            ])
            ->assertStatus(204);

        $this->assertGuest();
    }
}
