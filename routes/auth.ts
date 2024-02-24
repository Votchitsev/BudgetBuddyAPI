import { Elysia } from 'elysia'
import type { Context } from 'elysia'
import { authController } from '@controllers'
import { SSignUpCredentials, SSignUpResponse, SError } from '@Schemas'

export default new Elysia({ prefix: '/auth' })
    .post('/signup', (Context: Context) => authController.signup(Context), {
        detail: {
            tags: ['Регистрация, авторизация пользователей']
        },
        body: SSignUpCredentials,
        responses: {
            201: SSignUpResponse,
            500: SError,
            409: SError
        },
    })
    .post('/login', () => 'Post auth')
    .post('/logout', () => 'Post auth')
    .post('/delete', () => 'Post auth')
