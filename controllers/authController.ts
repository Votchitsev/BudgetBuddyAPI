import type { Context } from 'elysia'
import axios from 'axios'
import type { AxiosError } from 'axios'
import type { ISignUpRequest, ISignInRequest } from '@types'

const host = process.env.AUTH_MS_HOST

export default {
    signup: async (Context: Context) => {
        const params = Context.body as ISignUpRequest

        try {
            const body = {
                ...params,
                applicationToken: process.env.AUTH_API_TOKEN,
            }

            const response = await axios.post(`${host}/user/signup`, body)
            const { data } = response
            
            if (response.status === 201) {
                return data
            }
        } catch (error) {
            const errorResponse = error as AxiosError

            if (errorResponse.response) {
                const { status, data } = errorResponse.response
                Context.set.status = status ?? 500
                return data
            }

            return error
        }
    },
    login: async (Context: Context) => {
        const params = Context.body as ISignInRequest

        try {
            const body = {
                ...params,
                applicationToken: process.env.AUTH_API_TOKEN,
            }

            const response = await axios.post(`${host}/user/signin`, body)
            
            if (response.status === 200) {
                const { data } = response
                return data
            }
        } catch (error) {
            const errorResponse = error as AxiosError
            if (errorResponse.response) {
                const { status, data } = errorResponse.response
                Context.set.status = status ?? 500
                return data
            }

            return error
        }
    },
    logout: () => 'Post auth',
    delete: () => 'Post auth',
}
