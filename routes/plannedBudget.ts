import { Elysia } from 'elysia'
import type { Context } from 'elysia'
import {
    SError,
    SPlannedBudgetDeleteRequest,
    SPlannedBudgetListRequest,
    SPlannedBudgetListResponse,
    SPlannedBudgetRequest,
    SPlannedBudgetResponse,
    SPlannedBudgetUpdateRequest,
    SVerifyRequest
} from '@Schemas'
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
                    201: SPlannedBudgetResponse,
                    401: SError,
                    500: SError
                }
            })
            .get(':date', (Context: Context) => plannedBudgetController.get(Context, userId), {
                detail: {
                    tags: ['Планируемые расходы'],
                    description: 'Получение списка планируемых расходов'
                },
                headers: SVerifyRequest,
                params: SPlannedBudgetListRequest,
                responses: {
                    200: SPlannedBudgetListResponse,
                    401: SError,
                    500: SError
                }
            })
            .delete(':id', (Context: Context) => plannedBudgetController.delete(Context, userId), {
                detail: {
                    tags: ['Планируемые расходы'],
                    description: 'Удаление планируемого расхода'
                },
                headers: SVerifyRequest,
                params: SPlannedBudgetDeleteRequest,
                responses: {
                    200: 'Planned budget is deleted',
                    401: SError,
                    404: SError,
                    500: SError
                }
            })
            .put('', (Context: Context) => plannedBudgetController.put(Context, userId), {
                detail: {
                    tags: ['Планируемые расходы'],
                    description: 'Обновление планируемого расхода'
                },
                headers: SVerifyRequest,
                body: SPlannedBudgetUpdateRequest,
                responses: {
                    200: Boolean,
                    401: SError,
                    404: SError,
                    500: SError
                }
            })
    )
