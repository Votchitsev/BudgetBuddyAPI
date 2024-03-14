import { t } from 'elysia'

export * from './authSchemas'
export * from './plannedBudgetSchemas'
export * from './incomeSchemas'
export * from './plannedExpenseSchemas'
export * from './dailyExpenseSchemas'
export * from './savingsPercentage'

export const SError = {
    message: t.String(),
}
