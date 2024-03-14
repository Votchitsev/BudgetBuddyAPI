import type { Context } from 'elysia'
import { deleteSavingsPercentage, getSavingsPercentage, updateSavingsPercentage } from '@services'

export default {
    put: async (context: Context, userId: number) => {
        const { percent, date } = context.body as { percent: number, date: string }

        try {
            if (percent < 0 || percent > 100) {
                context.set.status = 400
                return 'Invalid percentage'
            }

            await updateSavingsPercentage({ percent, date }, userId)

            return 'updated'

        } catch (error) {
            context.set.status = 500
            return error
        }
    },
    get: async (context: Context, userId: number) => {
        const { date } = context.params as { date: string }

        try {
            return getSavingsPercentage(date, userId)
        } catch (error) {
            context.set.status = 500
            return error
        }
    },
    delete: async (context: Context, userId: number) => {
        const { date } = context.params as { date: string }

        try {
            const result = await deleteSavingsPercentage(date, userId)
            
            if (Number(result)) {
                return true
            }

            return false
        } catch (error) {
            context.set.status = 500
            return error
        }
    }
}
