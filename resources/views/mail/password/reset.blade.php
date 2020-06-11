@component('mail::message')
# Password reset

Someone (hopefully, you) requested a password reset for your LeekBezz account.

To set a new password, click the button:

@component('mail::button', ['url' => $url])
    Reset password
@endcomponent

If you do not want to change password, just ignore this message.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
