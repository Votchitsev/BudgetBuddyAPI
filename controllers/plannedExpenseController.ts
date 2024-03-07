import type { Context } from 'elysia'
import { createPlannedExpense, getPlannedExpenseList } from '@services'
import type { IPlannedExpense } from '@types'

export default {
    post: async (Context: Context, userId: number) => {
        const params = Context.body as IPlannedExpense

        try {
            const plannedExpense = await createPlannedExpense(params, userId)

            return {
                id: plannedExpense.id,
                amount: plannedExpense.amount,
                plannedBudgetId: plannedExpense.plannedBudgetId
            }
        } catch (error) {
            Context.set.status = 500
            return error
        }
    },
    get: async (Context: Context, userId: number) => {
        const { date } = Context.params as { date: string }
        const expenseList = await getPlannedExpenseList({ date }, userId)

        return {
            date,
            expenseList
        }
    }
}