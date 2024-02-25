import type { IIncome } from '@types'
import type { Context } from 'elysia'
import { createIncome, deleteIncome, getIncome, getTotalIncome, updateIncome } from '@services'

export default {
    post: async (Context: Context, userId: number) => {
        const { name, amount, date } = Context.body as IIncome

        try {
            const incomeData = {
                name,
                amount,
                date,
                userId
            }

            const createdIncome = await createIncome(incomeData, userId)

            return {
                id: createdIncome.id,
                name: createdIncome.name,
                amount: createdIncome.amount,
                date: createdIncome.date
            }
        } catch (error) {
            Context.set.status = 500
            return error
        }
    },
    get: async (Context: Context, userId: number) => {
        const { date } = Context.params as { date: string }

        try {
            const incomeListResponse = await getIncome(userId, date)

            const incomeList = incomeListResponse.map((income: IIncome) => ({
                id: income.id,
                name: income.name,
                amount: income.amount,
                date: income.date
            }))

            const total = await getTotalIncome(incomeList)

            return {
                date,
                total,
                incomeList
            }
        } catch (error) {
            Context.set.status = 500
            return error
        }
    },
    delete: async (Context: Context, userId: number) => {
        const { id } = Context.params as { id: string }

        try {
            await deleteIncome(id, userId)
            return 'Income deleted'
        } catch (error) {
            Context.set.status = 500
            return error
        }
    },
    put: async (Context: Context, userId: number) => {
        const params = Context.body as IIncome

        try {
            if (!params.id) {
                Context.set.status = 404
                return 'Income not found'
            }

            await updateIncome(params, userId)

            return true
        } catch (error) {
            Context.set.status = 500
            return error
        }
    }
}
