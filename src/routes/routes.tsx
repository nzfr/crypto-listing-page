import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import { routePaths } from './urls'

const Home = lazy(() => import('../pages/home'))
const MarketDetails = lazy(() => import('../pages/market-details'))

export const routes: RouteObject[] = [
  {
    path: routePaths.MARKETS.url,
    index: true,
    element: <Home />,
  },
  {
    path: routePaths.MARKET_DETAILS.url,
    element: <MarketDetails />,
  },
]
