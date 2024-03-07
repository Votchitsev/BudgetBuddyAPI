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

export const SPlannedExpenseListRequest = t.Object({
    date: t.RegExp(/^[0-9]{4}-[0-9]{2}$/),
})

export const SPlannedExpenseListResponse = t.Object({
    date: t.String(),
    expenseList: t.Array(
        t.Object({
            id: t.Number(),
            name: t.String(),
            plannedAmount: t.Number(),
            expenseAmount: t.Number(),
            balance: t.Number(),
        })
    ),
})
