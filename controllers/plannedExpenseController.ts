import type { Context } from 'elysia'
import { createPlannedExpense, getPlannedExpenseList, deletePlannedExpense } from '@services'
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
    },
    delete: async (Context: Context, userId: number) => {
        const { id } = Context.params as { id: string }

        try {
            const result  = await deletePlannedExpense(Number(id), userId)

            console.log(result)

            if (!result) {
                Context.set.status = 404
                return 'Planned expense not found'
            }

            return 'Planned expense deleted'
        } catch (error) {
            Context.set.status = 500
            return error
        }
    }
}
