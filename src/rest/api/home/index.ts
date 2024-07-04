import { buildApiQueryNoParamsHook } from '../../api'
import { apiClient } from '../../base.api'

export const useGetMarketsList = buildApiQueryNoParamsHook('all-markets-list', () =>
  apiClient.get<IMarketsListResponse>('v1/mkt/markets/'),
)
