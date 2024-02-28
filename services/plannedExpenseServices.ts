import type { IPlannedExpense } from '@types'
import { models } from '@utils'

export const createPlannedExpense = async (params: IPlannedExpense, userId: number) => {
    return await models.PlannedExpense.create({
        ...params,
        userId
    })
}
