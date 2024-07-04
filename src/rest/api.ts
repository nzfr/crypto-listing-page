import axios, { AxiosResponse } from 'axios'
import {
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from 'react-query'

export interface ApiErrorResponse {
  [name: string]: string[] | undefined

  non_field_errors?: string[]
  message?: string[]
}

export interface FieldErrors {
  [name: string]: string[] | undefined
}

export type ApiErrorCodes = number | 'NOT_IMPLEMENTED_ERROR' | 'UNREACHABLE_ERROR' | 'UNKNOWN_ERROR'

export const exponentialBackOff = (attempt: number) =>
  Math.min(attempt > 1 ? 2 ** attempt * 250 : 100, 10 * 1000)

export class ApiError extends Error {
  constructor(
    public message: string,
    public code: ApiErrorCodes,
    public fieldErrors: FieldErrors,
    public non_field_errors: string[] | undefined,
    public originalError?: unknown,
  ) {
    super(message)
  }
}

function convertApiError(err: unknown): ApiError {
  if (err instanceof ApiError) return err
  if (axios.isAxiosError(err)) {
    const response: ApiErrorResponse = err.response?.data
    const errorMessage = response.message?.join(' ,')
    return new ApiError(
      errorMessage ?? 'لطفا مجدد تلاش کنید.',
      err.request.status,
      {
        ...response,
      },
      response.non_field_errors,
      err,
    )
  } else {
    return new ApiError('لطفا مجدد تلاش کنید.', 'UNKNOWN_ERROR', {}, undefined)
  }
}

/**
 * Convert unknown error to strongly typed error and
 * log bad errors (which are likely to be bugs) so they can
 * be picked up by sentry.io.
 */
export function handleApiError(err: unknown): ApiError {
  // no need to double logging, so if it already was converted, we just return it
  if (err instanceof ApiError) return err
  const apiError = convertApiError(err)
  if (apiError.code === 'UNKNOWN_ERROR') {
    console.error('Unknown api error:', apiError.message, apiError.code, apiError.originalError)
  }
  return apiError
}

/**
 * @throws {ApiError}
 */
export async function handleApiResult<T = unknown>(promise: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const response = await promise
    if (isRequestSucceded(response.status)) {
      if (response.data === undefined) return { message: 'با موفقیت انجام شد.' } as T
      return response.data as T
    } else {
      throw response
    }
  } catch (err: unknown) {
    throw handleApiError(err)
  }
}

const isRequestSucceded = (status: number) => {
  return status >= 200 && status < 300
}

export type ApiQueryOptions<Result, SelectResult = Result> = Omit<
  UseQueryOptions<Result, ApiError, SelectResult>,
  'queryFn' // queryFn is omitted because it is set at query hook creation
>

type ApiQueryHook<Params, Result> = <SelectResult = Result>(
  params: Params,
  options?: ApiQueryOptions<Result, SelectResult>,
) => UseQueryResult<SelectResult, ApiError>

export const buildApiQueryHook = <Params, Result>(
  cacheKey: string | ((params: Params) => QueryKey),
  fetch: (params: Params) => Promise<AxiosResponse>,
): ApiQueryHook<Params, Result> => {
  return <SelectResult = Result>(
    params: Params,
    options?: ApiQueryOptions<Result, SelectResult>,
  ) => {
    return useQuery<Result, ApiError, SelectResult>(
      options?.queryKey || (typeof cacheKey === 'string' ? [cacheKey, params] : cacheKey(params)),
      () => handleApiResult<Result>(fetch(params)),
      {
        retry: 3,
        retryDelay: exponentialBackOff,
        refetchOnWindowFocus: false,
        ...options,
        onError(error: ApiError) {
          if (options?.onError) options.onError(error)
          else console.log(error.message)
        },
      },
    )
  }
}

type ApiQueryNoParamsHook<Result> = <SelectResult = Result>(
  options?: ApiQueryOptions<Result, SelectResult>,
) => UseQueryResult<SelectResult, ApiError>

export const buildApiQueryNoParamsHook = <Result>(
  cacheKey: string,
  fetch: () => Promise<AxiosResponse<Result>>,
): ApiQueryNoParamsHook<Result> => {
  return <SelectResult = Result>(options?: ApiQueryOptions<Result, SelectResult>) => {
    return useQuery<Result, ApiError, SelectResult>(
      options?.queryKey || cacheKey,
      () => handleApiResult<Result>(fetch()),
      {
        retry: 10,
        refetchOnWindowFocus: false,
        retryDelay: exponentialBackOff,
        ...options,
        onError(error: ApiError) {
          if (options?.onError) options.onError(error)
          else console.log(error.message)
        },
      },
    )
  }
}

export type ApiMutationOptions<Result, Params> = Omit<
  UseMutationOptions<Result, ApiError, Params>,
  'mutationFn'
>

export const buildApiMutationHook = <Params = void, Result = void>(
  fetch: (params: Params) => Promise<AxiosResponse>,
  mapOptions: (
    options?: ApiMutationOptions<Result, Params>,
  ) => undefined | ApiMutationOptions<Result, Params> = (x) => x,
): ((
  options?: ApiMutationOptions<Result, Params>,
) => UseMutationResult<Result, ApiError, Params>) => {
  return (options?: ApiMutationOptions<Result, Params>) => {
    options = mapOptions(options)
    return useMutation<Result, ApiError, Params>(
      (params: Params) => handleApiResult<Result>(fetch(params)),
      {
        retry: 1,
        retryDelay: exponentialBackOff,
        ...options,
        onError(error, ...rest) {
          if (options?.onError) options.onError(error, ...rest)
          else {
            if (!error.fieldErrors || error.code !== 401) {
              console.log(error.message)
            }
          }
        },
      },
    )
  }
}
