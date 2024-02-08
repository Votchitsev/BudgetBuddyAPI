import { Sequelize } from 'sequelize'
import { dailyExpenseDefiner, incomeDefiner, plannedBudgetDefiner, plannedExpenseDefiner } from '@models'
import type { TModel } from '@types'

const sequelize = new Sequelize(
    process.env.DB_NAME || 'BudgetBuddyDev',
    process.env.DB_USER || 'BudgetBuddyAdmin',
    process.env.DB_PASSWORD || 'password',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        port: Number(process.env.DB_PORT) || 5432,
    }
)

const modelDefiners = [
    dailyExpenseDefiner,
    incomeDefiner,
    plannedBudgetDefiner,
    plannedExpenseDefiner,
]

export const models: { [modelName: string]: TModel } = {}

modelDefiners.forEach(async definer => {
    const model = definer(sequelize)
    const { name } = model
    models[name] = model
})

const { PlannedBudget, PlannedExpense } = models

PlannedExpense.belongsTo(PlannedBudget, { foreignKey: 'plannedBudgetId' })
PlannedBudget.hasMany(PlannedExpense, { foreignKey: 'plannedBudgetId' })

sequelize.sync({ alter: true })

export default sequelize
