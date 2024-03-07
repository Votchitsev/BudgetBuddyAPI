export interface ISignUpRequest {
    name: string;
    password: string;
    confirmPassword: string;
    applicationToken: string;
}

export interface ISignInRequest {
    applicationToken: string;
    username: string;
    password: string;
}

export interface ILogoutRequest {
    token: string;
}

export interface IPlannedBudget {
    id?: number;
    name: string;
    amount: number;
    date: Date;
}

export interface IIncome {
    id?: number;
    name: string;
    amount: number;
    date: Date;
}

export interface IPlannedExpense {
    id?: number;
    amount: number;
    plannedBudgetId: number;
}


export interface ISelectedPlannedExpense {
    dataValues: {
        id: number
        name: string
        amount: number
        date: Date
        PlannedExpenses: IPlannedExpense[]
    }
}

interface IPlannedExpenseListItem {
    id: number
    name: string
    plannedAmount: number
    expenseAmount: number
    balance: number
}
