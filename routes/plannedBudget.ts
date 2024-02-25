import { Elysia } from 'elysia'
import type { Context } from 'elysia'
import { SError, SPlannedBudgetRequest, SPlannedBudgetResponse, SVerifyRequest } from '@Schemas'
import { authController, plannedBudgetController } from '@controllers'

let userId: number

export default new Elysia({ prefix: '/plan' })
    .guard({
        async beforeHandle(context) {
            const response = await authController.verify(context as Context)

            const isValidUser = typeof response === 'object' && response && 'username' in response
            
            if (!isValidUser) {
                return (context.set.status = 'Unauthorized')
            }

            userId = response.id
        },
    },
    (app) => 
        app
            .post('', (Context: Context) => plannedBudgetController.post(Context, userId), {
                detail: {
                    tags: ['Планируемые расходы'],
                    description: 'Создание статьи расхода'
                },
                headers: SVerifyRequest,
                body: SPlannedBudgetRequest,
                responses: {
                    201: 'Planned budget is created',
                    401: SError,
                    500: SError
                }
            })
    )
