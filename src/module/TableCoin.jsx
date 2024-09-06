import { RotatingLines } from 'react-loader-spinner'

import styles from './TableCoin.module.css'

import charUp from '../../src/assets/chart-up.svg'
import charDown from '../../src/assets/chart-down.svg'
import { useState } from 'react'

const Tablecoin = ({ coins, isLoading, currency }) => {
    return (
        <div className={styles.container}>
            {/* if load data success or failed */}
            {isLoading ? <RotatingLines strokeColor='#3874ff' strokeWidth='2' /> : <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Coin</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h</th>
                        <th>Total Volume</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        coins.map(coin =>
                            <TableRow coin={coin} key={coin.id} currency={currency} />
                        )
                    }
                </tbody>
            </table>}
        </div>
    )
}

export default Tablecoin



//table row component 
const TableRow = ({ coin: { name, image, symbol, total_volume, current_price, price_change_percentage_24h: price_change }, currency }) => {
    return (
        <tr>
            <td>
                <div className={styles.symbol}>
                    <img src={image} alt={name} />
                    <span>{symbol.toUpperCase()}</span>
                </div>
            </td>
            <td>{name}</td>
            <td>{currency === "usd" ? "$ " : currency === "eur" ? "€ " : "¥ "}{current_price.toLocaleString()}</td>
            <td className={price_change > 0 ? styles.success : styles.error}>{price_change.toFixed(2)}%</td>
            <td>{total_volume.toLocaleString()}</td>
            <td>{<img src={price_change > 0 ? charUp : charDown} alt={name} />}</td>
        </tr>
    )
}