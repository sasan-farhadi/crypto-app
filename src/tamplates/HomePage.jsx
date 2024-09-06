import { useState } from "react"
import { useEffect } from "react"
import Tablecoin from "../module/Tablecoin"
import { getCoinList } from "../services/cryptoApi"

const HomePage = () => {

  //Fetch data 
  const [coins, setCoins] = useState([])
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(getCoinList())
      const json = await res.json()
      setCoins(json)
    }
    getData()
  }, [])

  return (
    <div>
      <Tablecoin coins={coins} />
    </div>
  )
}
export default HomePage