import type { Context } from 'elysia'
import type { IPlannedBudget } from '@types'
import { createPlannedBudget, getPlannedBudget, getTotalPlannedBudget, deletePlannedBudget, updatePlannedBudget } from '@services'

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
    },
    get: async (Context: Context, userId: number) => {
        const { date } = Context.params as { date: string }

        try {
            const plannedBudget = await getPlannedBudget(userId, date)

            const plannedBudgetList = plannedBudget.map((budget: IPlannedBudget) => ({
                id: budget.id,
                name: budget.name,
                amount: budget.amount,
                date: budget.date,
            }))

            const total = getTotalPlannedBudget(plannedBudgetList)

            return {
                date,
                total,
                plannedBudgetList,
            }
        } catch (error) {
            Context.set.status = 500
            return error
        }
    },
    delete: async (Context: Context, userId: number) => {
        const { id } = Context.params as { id: string }

        try {
            await deletePlannedBudget(id, userId)
            return 'Planned budget deleted'
        } catch (error) {
            Context.set.status = 500
            return error
        }
    },
    put: async (Context: Context, userId: number) => {
        const params = Context.body as IPlannedBudget

        if (!params.id) {
            Context.set.status = 404
            return 'Planned budget not found'
        }

        try {
            await updatePlannedBudget(params, userId)
            
            return true
        } catch (error) {
            Context.set.status = 500
            return error
        }
    },
}
