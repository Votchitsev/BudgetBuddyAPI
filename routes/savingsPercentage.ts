import { Elysia } from 'elysia'
import { authController } from '@controllers'
import type { Context } from 'elysia'
import {
    SVerifyRequest,
    SPutSavingsRequest,
    SPutSavingsResponse,
    SError,
    SDeleteSavingsRequest,
    SGetSavingsRequest
} from '@Schemas'
import savingsPercentageController from 'controllers/savingsPercentageController'

let userId: number

export default new Elysia({ prefix: '/savings' })
    .guard({
        async beforeHandle(context) {
            const response = await authController.verify(context as Context)

            const isValidUser = typeof response === 'object' && response && 'username' in response
            
            if (!isValidUser) {
                return (context.set.status = 'Unauthorized')
            }

            userId = response.id
        }
    },
    (app) => 
        app
            .put('', (Context: Context) => savingsPercentageController.put(Context, userId), {
                detail: {
                    tags: ['Процент сбережений'],
                    description: 'Изменение процента сбережений'
                },
                headers: SVerifyRequest,
                body: SPutSavingsRequest,
                responses: {
                    200: 'updated',
                    401: SError,
                    500: SError
                }
            })
            .get(':date', (Context: Context) => savingsPercentageController.get(Context, userId), {
                detail: {
                    tags: ['Процент сбережений'],
                    description: 'Получение процента сбережений'
                },
                headers: SVerifyRequest,
                params: SGetSavingsRequest,
                responses: {
                    200: SPutSavingsResponse,
                    401: SError,
                    500: SError
                }
            })
            .delete(':date', (Context: Context) => savingsPercentageController.delete(Context, userId), {
                detail: {
                    tags: ['Процент сбережений'],
                    description: 'Удаление процента сбережений'
                },
                headers: SVerifyRequest,
                params: SDeleteSavingsRequest,
                responses: {
                    200: Boolean,
                    401: SError,
                    500: SError
                }
            })
    )
