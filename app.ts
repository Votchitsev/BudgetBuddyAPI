import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { version } from './package.json'
import {
    plannedBudgetRoutes,
    authRoutes,
    incomeRoutes,
    plannedExpenseRoutes,
    dailyExpenseRoutes,
    savingsPercentageRoutes
} from '@routes'
import './utils/db'
import { initPrototypes } from '@utils'

initPrototypes()

const port = Number(process.env.APP_PORT || 3000)

const app = new Elysia()
    .use(swagger({
        documentation: {
            info: {
                title: 'Budget Buddy API',
                description: 'Personal budgeting app',
                version,
            }
        }
    }))
    .use(authRoutes)
    .use(incomeRoutes)
    .use(plannedBudgetRoutes)
    .use(plannedExpenseRoutes)
    .use(dailyExpenseRoutes)
    .use(savingsPercentageRoutes)
    .listen(port)

console.log(
    `Application is running at ${app.server?.hostname}:${app.server?.port}`
)
