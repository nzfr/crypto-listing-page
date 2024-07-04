interface IMarketsListResponse {
  count: number
  next: string | null
  previous: string | null
  results: IMarketITem[]
}

interface IMarketITem {
  id: number
  currency1: ICurrency
  currency2: ICurrency
  tradable: boolean
  coming_soon: boolean
  for_test: boolean
  otc_sell_percent: string
  otc_buy_percent: string
  otc_max_buy_amount: string
  otc_max_sell_amount: string
  order_book_info: IInfo
  internal_price_info: IInfo
  price_info: IInfo
  price: number
  title: string
  code: string
  title_fa: string
  trading_view_source: string
  trading_view_symbol: string
  otc_market: boolean
  text: string
  volume_24h: string
  market_cap: string
  circulating_supply: string
  all_time_high: string
  popularity_weight: number
  freshness_weight: number
}

interface ICurrency {
  id: number
  title: string
  title_fa: string
  code: string
  tradable: boolean
  for_test: boolean
  image: string
  decimal: number
  decimal_amount: number
  decimal_irt: number
  color: string
  high_risk: boolean
  show_high_risk: boolean
  withdraw_commission: string
  tags: ITag[]
  etf: boolean
  for_binvest: boolean
  for_loan: boolean
  for_stake: boolean
  recommend_for_deposit_weight: number
}

interface ITag {
  id: number
  name: string
  name_en: string
  has_chart: boolean
}

interface IInfo {
  created_at: number | null
  price: number
  change: number
  min: string
  max: string
  time: Date | null
  mean: null | string
  value: null | string
  amount: null | string
}
