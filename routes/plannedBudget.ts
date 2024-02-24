import { Elysia } from 'elysia'

export default new Elysia({ prefix: '/plan' })
    .post('', () => 'Post plan')
