import type { IIncome } from '@types'
import { models } from '@utils'

export const createIncome = async (params: IIncome, userId: number) => {
    return await models.Income.create({
        ...params,
        userId
    })
}

export const getIncome = async (userId: number, date: string) => {
    return await models.Income.findAll({ where: { userId, date } })
}

export const getTotalIncome = async (incomeList: IIncome[]) => {
    return incomeList.reduce((acc, income) => acc + income.amount, 0)
}

export const deleteIncome = async (id: string, userId: number) => {
    return await models.Income.destroy({ where: { id: Number(id), userId } })
}

export const updateIncome = async (params: IIncome, userId: number) => {
    return await models.Income.update(params, {
        where: {
            id: params.id,
            userId
        }
    })
}