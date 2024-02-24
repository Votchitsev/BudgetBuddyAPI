import { t } from 'elysia'

export const SSignUpCredentials = t.Object({
    name: t.String(),
    password: t.String(),
    confirmPassword: t.String(),
})

export const SSignUpResponse = t.Object({
    name: t.String(),
})
