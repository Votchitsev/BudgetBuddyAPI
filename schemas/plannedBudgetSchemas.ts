import { t } from 'elysia'

export const SPlannedBudgetRequest = t.Object({
    name: t.String(),
    amount: t.Number(),
    date: t.RegExp(/^[0-9]{4}-[0-9]{2}$/),
})

export const SPlannedBudgetResponse = t.Object({
    id: t.Number(),
    name: t.String(),
    amount: t.Number(),
    date: t.Date(),
})
