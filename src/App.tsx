import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import Appbar from './components/global/appbar/Appbar'
import { routes } from './routes/routes'

function App() {
  const content = useRoutes(routes)

  return (
    <div className='w-full h-screen'>
      <Suspense fallback={<div>this is loading!!</div>}>
        <Appbar />
        {content}
      </Suspense>
    </div>
  )
}

export default App
