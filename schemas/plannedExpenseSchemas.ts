import { t } from 'elysia'

export const SPlannedExpenseRequest = t.Object({
    amount: t.Number(),
    plannedBudgetId: t.Number(),
})

export const SPlannedExpenseResponse = t.Object({
    id: t.Number(),
    amount: t.Number(),
    plannedBudgetId: t.Number(),
})
