import { useState } from "react"
import { useEffect } from "react"
import { getCoinList } from "../services/cryptoApi"

import Tablecoin from "../module/Tablecoin"
import Pagination from "../module/Pagination"
import Search from "../module/Search"
import Chart from "../module/Chart"


const HomePage = () => {
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState("usd")
  const [chart, setChart] = useState(null)

  //for show loading
  const [isLoading, setIsLoading] = useState(true)

  //Fetch data 
  const [coins, setCoins] = useState([])

  useEffect(() => {
    setIsLoading(true)
    const getData = async () => {
      try {
        const res = await fetch(getCoinList(page, currency))
        const json = await res.json()
        setCoins(json)
        //for loading
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [page, currency])

  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <Tablecoin coins={coins} isLoading={isLoading} currency={currency} setChart={setChart} />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  )
}
export default HomePage