import type { Context } from 'elysia'
import type { IPlannedBudget } from '@types'
import { createPlannedBudget } from '@services'

export default {
    post: async (Context: Context, userId: number) => {
        const params = Context.body as IPlannedBudget

        try {
            const budgetData = {
                ...params,
                userId,
            }

            const createdPlannedBudget = await createPlannedBudget(budgetData)
            
            return {
                id: createdPlannedBudget.id,
                name: createdPlannedBudget.name,
                amount: createdPlannedBudget.amount,
                date: createdPlannedBudget.date,  
            }
        } catch (error) {
            Context.set.status = 500
            return error
        }
    }
}
