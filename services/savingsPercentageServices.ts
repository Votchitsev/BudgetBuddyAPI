import { models } from 'utils'

export const updateSavingsPercentage = async (params: { percent: number, date: string }, userId: number) => {
    const foundSavings = await models.SavingsPercentage.findOne({
        where: {
            userId,
            date: params.date
        }
    })

    if (foundSavings) {
        return await models.SavingsPercentage.update(params, {
            where: {
                userId
            },
        })
    }

    return await models.SavingsPercentage.create({
        ...params,
        userId
    })
}

export const deleteSavingsPercentage = async (date: string, userId: number) => {
    return await models.SavingsPercentage.destroy({
        where: {
            date,
            userId
        }
    })
}

export const getSavingsPercentage = async (date: string, userId: number) => {
    const savings = await models.SavingsPercentage.findOne({ where: { userId, date } })

    if (savings) {
        const amount = await models.Income.sum('amount', {
            where: {
                userId,
                date
            }
        })

        return {
            id: savings.id,
            percent: savings.percent,
            amount: amount * (savings.percent / 100),
            date: savings.date
        }
    }

    return null
}
