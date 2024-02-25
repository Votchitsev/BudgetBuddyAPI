import { Elysia } from 'elysia'
import type { Context } from 'elysia'
import { authController, incomeController } from '@controllers'
import {
    SError,
    SIncomeDeleteRequest,
    SIncomeListRequest,
    SIncomeListResponse,
    SIncomeRequest,
    SIncomeResponse,
    SIncomeUpdateRequest,
    SVerifyRequest
} from '@Schemas'

let userId: number

export default new Elysia({ prefix: '/income' })
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
            .post('', (Context: Context) => incomeController.post(Context, userId), {
                detail: {
                    tags: ['Доходы'],
                    description: 'Создание статьи дохода'
                },
                headers: SVerifyRequest,
                body: SIncomeRequest,
                responses: {
                    201: SIncomeResponse,
                    401: SError,
                    500: SError
                }
            })
            .get(':date', (Context: Context) => incomeController.get(Context, userId), {
                detail: {
                    tags: ['Доходы'],
                    description: 'Получение списка доходов'
                },
                headers: SVerifyRequest,
                params: SIncomeListRequest,
                responses: {
                    200: SIncomeListResponse,
                    401: SError,
                    500: SError
                }
            })
            .delete(':id', (Context: Context) => incomeController.delete(Context, userId), {
                detail: {
                    tags: ['Доходы'],
                    description: 'Удаление дохода'
                },
                headers: SVerifyRequest,
                params: SIncomeDeleteRequest,
                responses: {
                    200: 'Income deleted',
                    401: SError,
                    404: SError,
                    500: SError
                }
            })
            .put('', (Context: Context) => incomeController.put(Context, userId), {
                detail: {
                    tags: ['Доходы'],
                    description: 'Обновление дохода'
                },
                headers: SVerifyRequest,
                body: SIncomeUpdateRequest,
                responses: {
                    200: Boolean,
                    401: SError,
                    404: SError,
                    500: SError
                }
            })
    )
