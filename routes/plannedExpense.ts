import { Elysia } from 'elysia'
import type { Context } from 'elysia'
import { authController, plannedExpenseController } from '@controllers'
import { SVerifyRequest, SPlannedExpenseRequest, SError } from '@Schemas'

let userId: number

export default new Elysia({ prefix: 'plan-expense' })
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
            .post('', (Context: Context) => plannedExpenseController.post(Context, userId), {
                detail: {
                    tags: ['Фактический запланированный расход'],
                    description: 'Создание фактического запланированного фактического расхода'
                },
                headers: SVerifyRequest,
                body: SPlannedExpenseRequest,
                responses: {
                    200: SPlannedExpenseRequest,
                    401: SError,
                    500: SError
                }
            })
    
    )