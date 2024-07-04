export interface IActiveOrdersResponse {
  orders: IActiveOrderItem[]
  volume: string
}

export interface IActiveOrderItem {
  amount: string
  remain: string
  price: string
  value: string
}

export interface IActiveOrdersParams {
  type: 'sell' | 'buy'
  marketId: string
}
