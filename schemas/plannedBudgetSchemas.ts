import { t } from 'elysia'

export const SPlannedBudgetRequest = t.Object({
    name: t.String(),
    amount: t.Number(),
    date: t.RegExp(/^[0-9]{4}-[0-9]{2}$/),
})

export const SPlannedBudgetResponse = t.Object({
    id: t.Number(),
    name: t.String(),
    amount: t.Number(),
    date: t.Date(),
})

export const SPlannedBudgetListRequest = t.Object({
    date: t.RegExp(/^[0-9]{4}-[0-9]{2}$/),
})

export const SPlannedBudgetListResponse = t.Object({
    date: t.String(),
    total: t.Number(),
    plannedBudgetList: t.Array(SPlannedBudgetResponse),
})

export const SPlannedBudgetDeleteRequest = t.Object({
    id: t.String(),
})

export const SPlannedBudgetUpdateRequest = t.Object({
    id: t.Number(),
    name: t.String(),
    amount: t.Number(),
    date: t.RegExp(/^[0-9]{4}-[0-9]{2}$/),
})