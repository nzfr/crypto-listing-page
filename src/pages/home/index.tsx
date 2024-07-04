import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGetMarketsList } from '../../rest/api/home'

const Home = () => {
  const { data } = useGetMarketsList()
  const navigator = useNavigate()
  const [selectedTab, setSelectedTab] = useState<'IRT' | 'USDT'>('IRT')
  const dataToShow = useMemo(() => {
    if (!data) return []
    if (selectedTab === 'IRT') return data.results.filter((item) => item.currency2.code === 'IRT')
    if (selectedTab === 'USDT') return data.results.filter((item) => item.currency2.code === 'USDT')
  }, [data, selectedTab])

  return (
    <div className='overflow-y-hidden w-full h-full py-16 px-72 bg-gray-100 flex flex-col justify-start items-start gap-4 bg-bg-color'>
      <div className='border-b border-b-black w-full h-16 flex flex-row justify-start items-start gap-2  p-4 bg-gray-200'>
        <div
          onClick={() => setSelectedTab('IRT')}
          className={`${
            selectedTab === 'IRT'
              ? 'bg-gray-400 font-bold'
              : 'bg-gray-300 text-disabled font-normal'
          } h-full flex flex-row justify-center items-center cursor-pointer px-2`}
        >
          پایه تومان
        </div>
        <div
          onClick={() => setSelectedTab('USDT')}
          className={`${
            selectedTab === 'USDT'
              ? 'bg-gray-400 font-bold'
              : 'bg-gray-300 text-disabled font-normal'
          }  h-full flex flex-row justify-center items-center cursor-pointer px-2`}
        >
          پایه تتر
        </div>
      </div>
      <div className='overflow-y-scroll w-full flex flex-col gap-2 bg-gray-200 rounded-md p-4 mb-16'>
        {dataToShow?.map((market) => {
          return (
            <div
              onClick={() => navigator(`markets/${market.id}`)}
              className='cursor-pointer w-full flex flex-row py-4 gap-32'
              key={market.id}
            >
              <div className='w-1/6 flex flex-row gap-2'>
                <img className='w-12 h-12' src={market.currency1.image} alt={market.title_fa} />
                <div className='flex flex-col justify-start items-start gap-1'>
                  <span className='text-md font-semibold'>{market.currency1.title_fa}</span>
                  <span className='text-sm'>{market.title}</span>
                </div>
              </div>
              <div className='w-1/6 flex flex-col justify-start items-start gap-1'>
                <span className='text-md font-semibold text-end'>
                  {market.price.toLocaleString()}
                </span>
                <span className='text-sm'>تومان</span>
              </div>
              <div className='w-1/6 flex flex-col justify-start items-start gap-1'>
                <span className='text-md font-semibold text-end'>%{market.price_info.change}</span>
              </div>
              <div className='w-full flex flex-row justify-end'>مشاهده جزییات</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Home
