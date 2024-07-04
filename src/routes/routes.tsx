import {RouteObject} from "react-router-dom";
import {routePaths} from "./urls.ts";


export const routes: RouteObject[] = [
    {
        path: routePaths.MARKETS.url,
        index: true,
        element: (
            <div>
                this is markets
            </div>
        ),
    },
    {
        path: routePaths.MARKET_DETAILS.url,
        element: (
            <div>
                this is market details
            </div>
        ),
    },
]
