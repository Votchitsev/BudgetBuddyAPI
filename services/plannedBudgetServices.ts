import { models } from '@utils'
import type { IPlannedBudget } from '@types'

export const createPlannedBudget = async (params: IPlannedBudget) => {
    return await models.PlannedBudget.create(params)
}
