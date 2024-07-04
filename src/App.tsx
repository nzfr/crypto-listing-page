import {useRoutes} from "react-router-dom";
import {routes} from "./routes/routes.tsx";
import {Suspense} from "react";

function App() {

    const content = useRoutes(routes)

    return (
    <div className='w-full h-screen'>
        <Suspense fallback={<div>this is loading!!</div>}>
            {content}
        </Suspense>
    </div>
  )
}

export default App
