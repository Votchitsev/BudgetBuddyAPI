import { t } from 'elysia'

export const SDailyExpenseRequest = t.Object({
    amount: t.Number(),
    date: t.RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
})

export const SDailyExpenseResponse = t.Object({
    id: t.Number(),
    amount: t.Number(),
    date: t.Date(),
})

export const SGetDailyExpenseRequest = t.Object({
    date: t.RegExp(/^[0-9]{4}-[0-9]{2}$/),
})

export const SGetDailyExpenseResponse = t.Object({
    allowedExpense: t.Number(),
    outcomeBalance: t.Number(),
    expenseList: t.Array(
        t.Object({
            date: t.Date(),
            amount: t.Number(),
            budget: t.Number(),
            balance: t.Number(),
        })
    ),
})

export const SDeleteDailyExpenseRequest = t.Object({
    date: t.RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
})
