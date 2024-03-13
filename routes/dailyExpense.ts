import { Elysia } from 'elysia'
import type { Context } from 'elysia'
import { authController, dailyExpenseController } from '@controllers'
import {
    SVerifyRequest,
    SDailyExpenseRequest,
    SDailyExpenseResponse,
    SError,
    SGetDailyExpenseRequest,
    SGetDailyExpenseResponse,
    SDeleteDailyExpenseRequest
} from '@Schemas'

let userId: number

export default new Elysia({ prefix: '/daily' })
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
            .post('', (Context: Context) => dailyExpenseController.post(Context, userId), {
                detail: {
                    tags: ['Ежедневные расходы'],
                    description: 'Добавление ежедневного расхода'
                },
                headers: SVerifyRequest,
                body: SDailyExpenseRequest,
                responses: {
                    201: SDailyExpenseResponse,
                    401: SError,
                    500: SError
                }
            })
            .get(':date', (Context: Context) => dailyExpenseController.get(Context, userId), {
                detail: {
                    tags: ['Ежедневные расходы'],
                    description: 'Получение списка ежедневных расходов'
                },
                headers: SVerifyRequest,
                params: SGetDailyExpenseRequest,
                responses: {
                    200: SGetDailyExpenseResponse,
                    401: SError,
                    500: SError
                }
            })
            .delete(':date', (Context: Context) => dailyExpenseController.delete(Context, userId), {
                detail: {
                    tags: ['Ежедневные расходы'],
                    description: 'Удаление ежедневного расхода'
                },
                headers: SVerifyRequest,
                params: SDeleteDailyExpenseRequest,
                responses: {
                    200: Boolean,
                    401: SError,
                    500: SError
                }
            })
    )