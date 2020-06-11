<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    public function testRegistersWithValidParams()
    {
        $params = $this->validParams();

        $response = $this->postJson('/api/users', $params);

        $response->assertStatus(201)
            ->assertJson([
                'name' => $params['name'],
                'email' => $params['email']
            ]);

        $user = User::firstWhere('email', $params['email']);
        $this->assertEquals($params['name'], $user->name);
    }

    public function testSignsInCreatedUser()
    {
        $params = $this->validParams();
        $this->postJson('/api/users', $params);
        $user = User::firstWhere('email', $params['email']);

        $this->assertAuthenticatedAs($user);
    }

    public function testFiresRegisteredEvent()
    {
        Event::fake();
        $params = $this->validParams();
        $this->postJson('/api/users', $params);
        $user = User::firstWhere('email', $params['email']);

        Event::assertDispatched(function (Registered $event) use ($user) {
            return $event->user->id === $user->id;
        });
    }

    public function testValidatesEmailPresence()
    {
        $params = $this->validParams();
        $params['email'] = '';

        $response = $this->postJson('/api/users', $params);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function testValidatesEmailFormat()
    {
        $params = $this->validParams();
        $params['email'] = 'not an email';

        $response = $this->postJson('/api/users', $params);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function testValidatesEmailLength()
    {
        $params = $this->validParams();
        $params['email'] = str_repeat('a', 255) . '@example.com';

        $response = $this->postJson('/api/users', $params);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function testValidatesEmailUniqueness()
    {
        $user = factory(User::class)->create();

        $params = $this->validParams();
        $params['email'] = $user->email;

        $response = $this->postJson('/api/users', $params);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function testValidatesNamePresence()
    {
        $params = $this->validParams();
        $params['name'] = '';

        $response = $this->postJson('/api/users', $params);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    public function testValidatesNameIsString()
    {
        $params = $this->validParams();
        $params['name'] = 12345;

        $response = $this->postJson('/api/users', $params);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    public function testValidatesNameLength()
    {
        $params = $this->validParams();
        $params['name'] = str_repeat('a', 256);

        $response = $this->postJson('/api/users', $params);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    public function testValidatesPasswordPresence()
    {
        $params = $this->validParams();
        $params['password'] = '';

        $response = $this->postJson('/api/users', $params);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function testValidatesPasswordIsString()
    {
        $params = $this->validParams();
        $params['password'] = 12345;

        $response = $this->postJson('/api/users', $params);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function testValidatesPasswordIsLong()
    {
        $params = $this->validParams();
        $params['password'] = 'short';

        $response = $this->postJson('/api/users', $params);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function testValidatesPasswordIsConfirmed()
    {
        $params = $this->validParams();
        $params['password_confirmation'] = 'wrong';

        $response = $this->postJson('/api/users', $params);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    function validParams()
    {
        return [
            'email' => $this->faker->email,
            'name' => $this->faker->name,
            'password' => 'password',
            'password_confirmation' => 'password'
        ];
    }
}
