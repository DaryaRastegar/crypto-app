import { useEffect } from 'react'
import { useState } from 'react'
import Pagination from '../modules/Pagination'
import TableCoins from '../modules/TableCoins'
import { getCoinList } from '../../services/cryptoApiees'
import Search from '../modules/Search'
import Chart from '../modules/Chart'

function HomePage() {
  const [coins, setCoins] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [currency, setCurrency] = useState('usd')
  const [chart, setChart] = useState(null)

  useEffect(() => {
    setIsLoading(true)

    const getData = async () => {
      try {
        const res = await fetch(getCoinList(page, currency))
        const json = await res.json()
        setCoins(json)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [page, currency])

  return (
    <>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoins
        coins={coins}
        setCoins={setCoins}
        isLoading={isLoading}
        setChart={setChart}
      />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </>
  )
}

export default HomePage
