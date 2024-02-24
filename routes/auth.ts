import { Elysia } from 'elysia'
import type { Context } from 'elysia'
import { authController } from '@controllers'
import {
    SSignUpCredentials,
    SSignUpResponse,
    SError,
    SSighInCredentials,
    SSighInResponse,
    SLogoutRequest
} from '@Schemas'

export default new Elysia({ prefix: '/auth' })
    .post('/signup', (Context: Context) => authController.signup(Context), {
        detail: {
            tags: ['Регистрация, авторизация пользователей'],
            description: 'Регистрация пользователя'
        },
        body: SSignUpCredentials,
        responses: {
            201: SSignUpResponse,
            500: SError,
            409: SError
        },
    })
    .post('/login', (Context: Context) => authController.login(Context), {
        detail: {
            tags: ['Регистрация, авторизация пользователей'],
            description: 'Авторизация пользователя'
        },
        body: SSighInCredentials,
        responses: {
            200: SSighInResponse,
            401: SError,
            500: SError
        },
    })
    .post('/logout', (Context: Context) => authController.logout(Context) , {
        detail: {
            tags: ['Регистрация, авторизация пользователей'],
            description: 'Выход пользователя из системы'
        },
        headers: SLogoutRequest,
        responses: {
            200: 'User is logged out',
            401: SError,
            500: SError
        },
    })
    .post('/delete', () => 'Post auth')
