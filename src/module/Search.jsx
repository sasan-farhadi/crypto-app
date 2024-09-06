import { useEffect } from "react"
import { useState } from "react"
import { searchCoin } from "../services/cryptoApi"
import { RotatingLines } from "react-loader-spinner"
import styles from './Search.module.css'

const Search = ({ currency, setCurrency }) => {
    const [text, setText] = useState("")
    const [coins, setCoins] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        setCoins([])
        if (!text) {
            setIsLoading(false)
            return
        }

        const search = async () => {
            try {
                const res = await fetch(searchCoin(text), { signal: controller.signal })
                const json = await res.json()
                if (json.coins) {
                    setCoins(json.coins)
                    setIsLoading(false)
                } else {
                    console.log(json.status.error_message)
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.log(error.message)
                }
            }
        }
        setIsLoading(true)
        search()
        return () => controller.abort
    }, [text])

    return (
        <div className={styles.searchBox}>
            <input type="text" placeholder="Search"
                value={text} onChange={e => setText(e.target.value)} />
            <select name="" id="" value={currency}
                onChange={e => setCurrency(e.target.value)}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="jpy">JPY</option>
            </select>
            {(!!coins.length || isLoading) && (<div className={styles.searchResult}>
                {isLoading && <RotatingLines width="50px" height="50px" strokeWidth="2" strokeColor="#3874ff" />}
                <ul>
                    {coins.map(x => (
                        <li key={x.id}><img src={x.thumb} alt={x.name} />
                            <p>{x.name}</p>
                        </li>
                    ))}
                </ul>
            </div>)}
        </div>
    )
}

export default Search
