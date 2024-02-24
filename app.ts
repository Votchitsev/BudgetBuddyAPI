import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { version } from './package.json'
import { plannedBudgetRoutes, authRoutes } from '@routes'
import './utils/db'

const port = Number(process.env.PORT || 3000)

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
    .use(plannedBudgetRoutes)
    .use(authRoutes)
    .listen(port)

console.log(
    `Application is running at ${app.server?.hostname}:${app.server?.port}`
)
