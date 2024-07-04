import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGetActiveOrders } from '../../rest/api/details'

const MarketDetails = () => {
  const params = useParams()
  const marketId = params.marketId
  const [selectedTab, setSelectedTab] = useState<'BUY' | 'SELL' | 'TRADE'>('BUY')
  const [requestedAmount, setRequestedAmount] = useState<number | undefined>()

  const { data: activeOrders } = useGetActiveOrders(
    {
      type: selectedTab === 'BUY' ? 'buy' : 'sell',
      marketId: marketId ?? '',
    },
    {
      enabled: !!marketId && selectedTab !== 'TRADE',
      refetchInterval: 3000,
    },
  )

  const totalRemainingOrders = useMemo(() => {
    if (!activeOrders) return 0
    return activeOrders.orders.slice(0, 10).reduce((total, order) => {
      console.log(order.remain)
      return total + parseFloat(order.remain)
    }, 0)
  }, [activeOrders])

  const totalOrdersValue = useMemo(() => {
    if (!activeOrders) return 0
    return activeOrders.orders.slice(0, 10).reduce((total, order) => {
      console.log(order.remain)
      return total + parseFloat(order.value)
    }, 0)
  }, [activeOrders])

  const weightedAverage = useMemo(() => {
    if (!activeOrders) return 0
    const sumProduct = activeOrders.orders.slice(0, 10).reduce((total, order) => {
      return total + Number(order.remain) * Number(order.price)
    }, 0)

    return sumProduct / totalRemainingOrders
  }, [activeOrders, totalRemainingOrders])

  const averagePrice = useMemo(() => {
    if (!activeOrders) return 0
    return (
      activeOrders.orders.slice(0, 10).reduce((total, order) => {
        return total + Number(order.price)
      }, 0) / 10
    )
  }, [activeOrders])

  return (
    <div className='overflow-y-hidden w-full  p-16 bg-gray-100 flex flex-col justify-start items-start gap-4'>
      <div className='w-full h-16 flex flex-row justify-between items-start gap-2  p-4 rounded-md bg-gray-200'>
        <div
          onClick={() => setSelectedTab('BUY')}
          className={`${
            selectedTab === 'BUY' ? 'bg-gray-400' : 'bg-gray-300'
          } w-full h-full flex flex-row justify-center items-center cursor-pointer rounded-md p-2`}
        >
          خرید
        </div>
        <div
          onClick={() => setSelectedTab('SELL')}
          className={`${
            selectedTab === 'SELL' ? 'bg-gray-400' : 'bg-gray-300'
          } w-full h-full flex flex-row justify-center items-center cursor-pointer rounded-md p-2`}
        >
          فروش
        </div>
        <div
          onClick={() => setSelectedTab('TRADE')}
          className={`${
            selectedTab === 'TRADE' ? 'bg-gray-400' : 'bg-gray-300'
          } w-full h-full flex flex-row justify-center items-center cursor-pointer rounded-md p-2`}
        >
          معاملات
        </div>
      </div>
      {selectedTab !== 'TRADE' && (
        <div className='w-full flex flex-row gap-4 h-full'>
          <div className='h-full overflow-y-scroll w-2/3 grid grid-cols-3 justify-start items-start bg-gray-200 rounded-md p-4 gap-4 mb-8'>
            {activeOrders?.orders.slice(0, 10).map((item, index) => {
              return (
                <div
                  className='border border-gray-700 flex flex-col gap-2 w-full p-2 rounded-md font-normal text-sm'
                  key={`active-${selectedTab}-${index}-${item.price}`}
                >
                  <div className='flex flex-row justify-start gap-4'>
                    <span>باقیمانده: </span>
                    <span>{item.remain}</span>
                  </div>
                  <div className='flex flex-row justify-start gap-4'>
                    <span>قیمت: </span>
                    <span>{item.price}</span>
                  </div>
                  <div className='flex flex-row justify-start gap-4'>
                    <span>مقدار: </span>
                    <span>{item.value}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='bg-gray-200 p-4 gap-4 flex flex-col w-1/3'>
            <div className='border border-gray-700 flex flex-col gap-2 w-full p-2 rounded-md'>
              <div className='flex flex-row justify-start gap-4'>
                <span>باقیمانده: </span>
                <span>{totalRemainingOrders}</span>
              </div>
              <div className='flex flex-row justify-start gap-4'>
                <span> میانگین وزن دار قیمت: </span>
                <span>{weightedAverage}</span>
              </div>
              <div className='flex flex-row justify-start gap-4'>
                <span>مقدار: </span>
                <span>{totalOrdersValue.toLocaleString()}</span>
              </div>
            </div>
            <div className='border border-gray-700 flex flex-col gap-2 w-full p-2 rounded-md'>
              <div className='flex flex-col justify-start gap-4'>
                <label>مقدار درخواستی (درصد)</label>
                <input
                  value={requestedAmount}
                  onChange={(e) => {
                    if (isNaN(Number(e.target.value))) return
                    if (Number(e.target.value) > 100) return
                    setRequestedAmount(Number(e.target.value))
                  }}
                  id='remaining-precent'
                />
              </div>
              {requestedAmount !== undefined && (
                <div className='flex flex-row justify-start gap-4'>
                  <span>مقدار: </span>
                  <span>{(totalRemainingOrders * requestedAmount) / 100}</span>
                </div>
              )}
              <div className='flex flex-row justify-start gap-4'>
                <span>میانگین قیمت: </span>
                <span>{averagePrice}</span>
              </div>
              {requestedAmount !== undefined && (
                <div className='flex flex-row justify-start gap-4'>
                  <span>مبلغ: </span>
                  <span>{averagePrice * ((totalRemainingOrders * requestedAmount) / 100)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default MarketDetails
