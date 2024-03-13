import type { Context } from 'elysia'
import { createDailyExpense, deleteDailyExpense, getDailyExpense } from '@services'
import type { IDailyExpense } from '@types'

export default {
    post: async (Context: Context, userId: number) => {
        const { amount, date } = Context.body as IDailyExpense

        try {
            const createdDailyExpense = await createDailyExpense({ amount, date }, userId)

            return {
                id: createdDailyExpense.id,
                amount: createdDailyExpense.amount,
                date: createdDailyExpense.date
            }
            
        } catch (error) {
            Context.set.status = 500
            return error
        }
    },
    get: async (Context: Context, userId: number) => {
        const { date } = Context.params as { date: string }

        try {
            return await getDailyExpense(userId, date)
        } catch (error) {
            Context.set.status = 500
            return error
        }
    },
    delete: async (Context: Context, userId: number) => {
        const { date } = Context.params as { date: string }

        try {
            const result = await deleteDailyExpense(date, userId)

            if (Number(result)) {
                return true
            }

            return false
        } catch (error) {
            Context.set.status = 500
            return error
        }
    }
}
