<?php

namespace Tests\Unit;

use App\Notifications\ResetPasswordNotification;
use App\User;
use PHPUnit\Framework\TestCase;

class ResetPasswordNotificationTest extends TestCase
{
    public function testReturnsEmailWithResetPasswordUrl()
    {
        $token = 'reset-token';

        $notification = new ResetPasswordNotification($token);
        $mail = $notification->toMail(new User);

        $expected = "/#/forgot/$token";

        $this->assertEquals($expected, $mail->viewData['url']);
    }
}
