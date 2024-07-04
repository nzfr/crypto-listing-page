import { buildApiQueryHook } from '../../api'
import { apiClient } from '../../base.api'
import { IActiveOrdersParams, IActiveOrdersResponse } from './market-orders.dto'

export const useGetActiveOrders = buildApiQueryHook<IActiveOrdersParams, IActiveOrdersResponse>(
  (params) => `active-${params.marketId}-${params.type}-orders`,
  (params) =>
    apiClient.get(`v2/mth/actives/${params.marketId}/`, {
      params: {
        type: params.type,
      },
    }),
)
