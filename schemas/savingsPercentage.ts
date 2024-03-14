import { t } from 'elysia'

export const SPutSavingsRequest = t.Object({
    percent: t.Number(),
    date: t.RegExp(/^[0-9]{4}-[0-9]{2}$/),
})

export const SPutSavingsResponse = t.Object({
    id: t.Number(),
    percent: t.Number(),
    date: t.Date(),
})

export const SDeleteSavingsRequest = t.Object({
    date: t.RegExp(/^[0-9]{4}-[0-9]{2}$/),
})

export const SGetSavingsRequest = t.Object({
    date: t.RegExp(/^[0-9]{4}-[0-9]{2}$/),
})

export const SGetSavingsResponse = t.Object({
    id: t.Number(),
    percent: t.Number(),
    amount: t.Number(),
    date: t.Date(),
})
