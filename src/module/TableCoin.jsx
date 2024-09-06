import charUp from '../../src/assets/chart-up.svg'
import charDown from '../../src/assets/chart-down.svg'

const Tablecoin = ({ coins }) => {
    console.log(coins)
    return (
        <div>
            <table>
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
                            <TableRow coin={coin} key={coin.id} />
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Tablecoin



//table row component 
const TableRow = ({ coin: { name, image, symbol, total_volume, current_price, price_change_percentage_24h: price_change } }) => {
    return (
        <tr>
            <td>
                <div>
                    <img src={image} alt={name} />
                    <span>{symbol.toUpperCase()}</span>
                </div>
            </td>
            <td>{name}</td>
            <td>${current_price.toLocaleString()}</td>
            <td>{price_change.toFixed(2)}%</td>
            <td>{total_volume.toLocaleString()}</td>
            <td>{<img src={price_change > 0 ? charUp : charDown} alt={name} />}</td>
        </tr>
    )
}