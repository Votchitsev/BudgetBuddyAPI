export * from './controllers'

export type TModel = (
    ReturnType<typeof dailyExpenseDefiner> |
    ReturnType<typeof incomeDefiner> |
    ReturnType<typeof plannedBudgetDefiner> |
    ReturnType<typeof plannedExpenseDefiner>  
)
