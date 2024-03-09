import type { IPlannedExpense, IPlannedExpenseListItem, ISelectedPlannedExpense } from '@types'
import { models } from '@utils'

export const createPlannedExpense = async (params: IPlannedExpense, userId: number) => {
    return await models.PlannedExpense.create({
        ...params,
        userId
    })
}

export const getPlannedExpenseList = async (params: { date: string }, userId: number) => {
    const getDataFromDB = async (date: string) => {
        return await models.PlannedBudget.findAll({
            where: {
                date,
                userId
            },
            include: [{
                model: models.PlannedExpense,
            }],
        })
    }

    const buildPlannedExpenseList = (data: ISelectedPlannedExpense[]) => {
        const plannedExpense: IPlannedExpenseListItem[] = []        

        data.forEach((plannedBudget: ISelectedPlannedExpense) => {
            const expense = plannedBudget.dataValues.PlannedExpenses

            const expenseAmount = expense.length ? (
                plannedBudget.dataValues.PlannedExpenses.reduce((acc: number, expense: IPlannedExpense) => {
                    return acc + expense.amount
                }, 0)
            ) : 0

            const { id, name, amount } = plannedBudget.dataValues

            plannedExpense.push({
                id,
                name,
                plannedAmount: amount,
                expenseAmount,
                balance: amount - expenseAmount
            })
        })

        return plannedExpense
    }
    
    const plannedExpense = await getDataFromDB(params.date)
    const plannedExpenseList = buildPlannedExpenseList(plannedExpense)

    return plannedExpenseList
}

export const deletePlannedExpense = async (id: number, userId: number) => {
    return await models.PlannedExpense.destroy({
        where: {
            plannedBudgetId: id,
            userId
        }
    })
}
