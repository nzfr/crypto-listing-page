export const routePaths : Record<string, IRoutePathItem> = {
    MARKETS: {
        url: '/',
        path: '/',
        title: 'بازارها',
        hasDynamicAppBarName: false
    },
    MARKET_DETAILS: {
        url: '/markets/:marketId',
        path: '/markets/:marketId',
        title: 'جزییات بازار',
        hasDynamicAppBarName: true
    }
}