<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function testLogsInWithCorrectCredentials()
    {
        $user = factory(User::class)->create();

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password'
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'email' => $user->email
            ]);
        $this->assertAuthenticatedAs($user);
    }

    public function testNotAuthenticatesWithWrongCredentials()
    {
        $user = factory(User::class)->create();
        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'bad password'
        ]);

        $response->assertStatus(422);
        $this->assertGuest();
    }
}
