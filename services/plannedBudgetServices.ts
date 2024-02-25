import { models } from '@utils'
import type { IPlannedBudget } from '@types'

export const createPlannedBudget = async (params: IPlannedBudget) => {
    return await models.PlannedBudget.create(params)
}

export const getPlannedBudget = async (userId: number, date: string) => {
    return await models.PlannedBudget.findAll({ where: { userId, date } })
}

export const getTotalPlannedBudget = (budgetList: IPlannedBudget[]) => {
    return budgetList.reduce((acc: number, budget: IPlannedBudget) => acc + budget.amount, 0)
}

export const deletePlannedBudget = async (id: string, userId: number) => {
    return await models.PlannedBudget.destroy({ where: { id: Number(id), userId } })
}

export const updatePlannedBudget = async (params: IPlannedBudget, userId: number) => {
    return await models.PlannedBudget.update(params, {
        where: {
            id: params.id,
            userId
        }
    })
}
