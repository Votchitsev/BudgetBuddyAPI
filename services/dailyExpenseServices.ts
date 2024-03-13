import { Op } from 'sequelize'
import type { IDailyExpense, IDailyExpenseBalance } from '@types'
import { models, sequelize } from '@utils'

export const createDailyExpense = async (params: IDailyExpense, userId: number) => {
    return await models.DailyExpense.create({
        ...params,
        userId
    })
}

export const getDailyExpense = async (userId: number, date: string) => {
    const [year, month] = date.split('-')

    const expenseList = await models.DailyExpense.findAll({
        where: {
            userId,
            date: {
                [Op.between]: [
                    new Date(`${year}-${month}-01`),
                    new Date(`${year}-${month}-${new Date(`${year}-${month}-01`).getDate() + 1}`)
                ]
            }
        }
    })

    const income = await models.Income.findOne({
        attributes: [
            [sequelize.fn('sum', sequelize.col('amount')), 'total']
        ],
        where: {
            userId,
            date
        }
    })

    const plannedBudget = await models.PlannedBudget.findOne({
        attributes: [
            [sequelize.fn('sum', sequelize.col('amount')), 'total']
        ],
        where: {
            userId,
            date
        }
    })

    const buildExpenseData = (date: string, incomeBalance: number) => {
        const dateObj = new Date(date)
        const month = dateObj.getMonth() + 1
        const dailyAllowedExpense = Math.round(incomeBalance / dateObj.daysInMonth())
    
        const days = []
        let balance = 0

        while (dateObj.getMonth() + 1 === month) {
            balance += dailyAllowedExpense

            const currentDate = new Date(dateObj)

            const currentDateExpense = expenseList.filter((expense: IDailyExpense) => {
                const expenseDate = new Date(expense.date)
                return expenseDate.getDate() === currentDate.getDate()
            })

            if (currentDateExpense.length) {
                const expense = currentDateExpense.reduce((acc: number, expense: IDailyExpense) => {
                    return acc + expense.amount
                }, 0)

                balance -= expense

                days.push({
                    date: currentDate.toISOString().split('T')[0],
                    amount: expense,
                    budget: dailyAllowedExpense,
                    balance
                })
            } else {
                days.push({
                    date: currentDate.toISOString().split('T')[0],
                    amount: 0,
                    budget: dailyAllowedExpense,
                    balance
                })
            }
            
            dateObj.setDate(dateObj.getDate() + 1)
        }

        return days
    }

    const getTodayAllowedExpense = (expenseData: IDailyExpenseBalance[]) => {
        const today = new Date().toISOString().split('T')[0]
        return expenseData.find((data: IDailyExpenseBalance) => data.date === today) ?? 0
    }

    const incomeBalance = income.dataValues.total - plannedBudget.dataValues.total
    const expenseData = buildExpenseData(date, incomeBalance)
    const allowedExpense = getTodayAllowedExpense(expenseData)
    const outcomeBalance = expenseData[expenseData.length - 1].balance

    return {
        allowedExpense,
        outcomeBalance,
        expenseData
    }
}

export const deleteDailyExpense = async (date: string, userId: number) => {
    return await models.DailyExpense.destroy({
        where: {
            date,
            userId
        }
    })
}
