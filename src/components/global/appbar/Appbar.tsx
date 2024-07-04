import { matchPath, useLocation } from 'react-router-dom'

import { routePaths } from '../../../routes/urls'

const Appbar = () => {
  const location = useLocation()
  const { pathname } = location

  const currentPath = Object.values(routePaths).find(
    (item) => item.url === pathname || matchPath(item.path, pathname),
  )
  const title = currentPath?.title

  return (
    <div className='w-full bg-bg-color z-10 flex flex-row justify-start h-16 sticky p-8 shadow-2xl gap-4 items-center'>
      {title}
    </div>
  )
}
export default Appbar
