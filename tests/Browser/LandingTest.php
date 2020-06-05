<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class LandingTest extends DuskTestCase
{
    public function testSeesAppName()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->assertSee('LeekBezz');
        });
    }
}
