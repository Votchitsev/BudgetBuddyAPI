import { t } from 'elysia'

export const SIncomeRequest = t.Object({
    name: t.String(),
    amount: t.Number(),
    date: t.RegExp(/^[0-9]{4}-[0-9]{2}$/),
})

export const SIncomeResponse = t.Object({
    id: t.Number(),
    name: t.String(),
    amount: t.Number(),
    date: t.Date(),
})

export const SIncomeListResponse = t.Object({
    date: t.Date(),
    total: t.Number(),
    incomeList: t.Array(SIncomeResponse),
})

export const SIncomeListRequest = t.Object({
    date: t.RegExp(/^[0-9]{4}-[0-9]{2}$/),
})

export const SIncomeDeleteRequest = t.Object({
    id: t.String(),
})

export const SIncomeUpdateRequest = t.Object({
    id: t.String(),
    name: t.String(),
    amount: t.Number(),
    date: t.RegExp(/^[0-9]{4}-[0-9]{2}$/),
})
