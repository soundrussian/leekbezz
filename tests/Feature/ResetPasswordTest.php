<?php

namespace Tests\Feature;

use App\Notifications\ResetPasswordNotification;
use App\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class ResetPasswordTest extends TestCase
{
    use RefreshDatabase;

    public function testSendsResetPasswordToken()
    {
        Notification::fake();
        $user = factory(User::class)->create();

        $this->postJson('/api/forgot', [ 'email' => $user->email ])
            ->assertStatus(200)
            ->assertJson(['message' => 'We have emailed your password reset link!']);

        Notification::assertSentTo(
            [$user], ResetPasswordNotification::class
        );
    }

    public function testReturnsErrorIfNoEmail()
    {
        Notification::fake();

        $this->postJson('/api/forgot', [ 'email' => '' ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);

        Notification::assertNothingSent();
    }
}
