import { useState } from "react"
import { useEffect } from "react"
import Tablecoin from "../module/Tablecoin"
import { getCoinList } from "../services/cryptoApi"
import Pagination from "../module/Pagination"
import Search from "../module/Search"


const HomePage = () => {
  const [page, setPage] = useState(1)

  const [currency, setCurrency] = useState("usd")

  //for show loading
  const [isLoading, setIsLoading] = useState(true)

  //Fetch data 
  const [coins, setCoins] = useState([])
  useEffect(() => {
    setIsLoading(true)
    const getData = async () => {
      const res = await fetch(getCoinList(page, currency))
      const json = await res.json()
      setCoins(json)
      //for loading
      setIsLoading(false)
    }
    getData()
  }, [page, currency])

  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <Tablecoin coins={coins} isLoading={isLoading} currency={currency} />
      <Pagination page={page} setPage={setPage} />
    </div>
  )
}
export default HomePage