<?php

namespace Tests\Feature;

use App\Notifications\ResetPasswordNotification;
use App\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
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

    public function testResetsPasswordIfTokenCorrect()
    {
        $user = factory(User::class)->create();
        $token = Password::broker()->createToken($user);
        $params = [
            'email' => $user->email,
            'password' => 'newpassword',
            'password_confirmation' => 'newpassword',
            'token' => $token
        ];

        $this->putJson('/api/forgot', $params)
            ->assertSuccessful()
            ->assertJson(['email' => $user->email]);

        $user->refresh();

        $this->assertTrue(Hash::check('newpassword', $user->password));
        $this->assertAuthenticatedAs($user);
    }

    public function testReturnsErrorIfTokenIncorrect()
    {
        $user = factory(User::class)->create();
        Password::broker()->createToken($user);
        $params = [
            'email' => $user->email,
            'password' => 'newpassword',
            'password_confirmation' => 'newpassword',
            'token' => 'bad token'
        ];

        $this->putJson('/api/forgot', $params)
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);

        $user->refresh();

        $this->assertFalse(Hash::check('newpassword', $user->password));
        $this->assertGuest();
    }

    public function testReturnsErrorIfEmailIncorrect()
    {
        $user = factory(User::class)->create();
        $token = Password::broker()->createToken($user);
        $params = [
            'email' => 'another.user@gmail.com',
            'password' => 'newpassword',
            'password_confirmation' => 'newpassword',
            'token' => $token
        ];

        $this->putJson('/api/forgot', $params)
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);

        $user->refresh();

        $this->assertFalse(Hash::check('newpassword', $user->password));
        $this->assertGuest();
    }

    public function testReturnsErrorIfPasswordTooShort()
    {
        $user = factory(User::class)->create();
        $token = Password::broker()->createToken($user);
        $params = [
            'email' => $user->email,
            'password' => 'short',
            'password_confirmation' => 'short',
            'token' => $token
        ];

        $this->putJson('/api/forgot', $params)
            ->assertStatus(422)
            ->assertJsonValidationErrors(['password']);

        $user->refresh();

        $this->assertFalse(Hash::check('newpassword', $user->password));
        $this->assertGuest();
    }

    public function testReturnsErrorIfPasswordUnconfirmed()
    {
        $user = factory(User::class)->create();
        $token = Password::broker()->createToken($user);
        $params = [
            'email' => $user->email,
            'password' => 'short',
            'password_confirmation' => 'hort',
            'token' => $token
        ];

        $this->putJson('/api/forgot', $params)
            ->assertStatus(422)
            ->assertJsonValidationErrors(['password']);

        $user->refresh();

        $this->assertFalse(Hash::check('newpassword', $user->password));
        $this->assertGuest();
    }
}
