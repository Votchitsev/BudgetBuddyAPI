import { t } from 'elysia'

export const SSignUpCredentials = t.Object({
    name: t.String(),
    password: t.String(),
    confirmPassword: t.String(),
})

export const SSignUpResponse = t.Object({
    name: t.String(),
})

export const SSighInCredentials = t.Object({
    username: t.String(),
    password: t.String(),
})

export const SSighInResponse = t.Object({
    token: t.String(),
    user:  t.String(),
})

export const SVerifyRequest = t.Object({
    authorization: t.String(),
})

export const SVerifyResponse = t.Object({
    id: t.String(),
    user:  t.String(),
})
