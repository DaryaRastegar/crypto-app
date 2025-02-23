import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
import Styles from './TableCoins.module.css'
import chartUp from '../../assets/chart-up.svg'
import chartDown from '../../assets/chart-down.svg'
import { marketChart } from '../../services/cryptoApiees'

function TableCoins({ coins, isLoading, setChart }) {
  return (
    <div className={Styles.container}>
      {isLoading ? (
        <RotatingLines strokeColor="#3874FF" strokeWidth="2" />
      ) : (
        <table className={Styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24H</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow key={coin.id} coin={coin} setChart={setChart} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TableCoins

const TableRow = ({ coin, setChart }) => {
  const {
    id,
    image,
    symbol,
    name,
    current_price,
    total_volume,
    price_change_percentage_24h: price_change,
  } = coin
  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id))
      const json = await res.json()
      setChart({ ...json, coin: coin })
    } catch (error) {
      setChart(null)
    }
  }

  return (
    <tr>
      <td>
        <div className={Styles.symbol} onClick={showHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td> ${current_price.toLocaleString()}</td>
      <td className={price_change > 0 ? 'success' : 'error'}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt={name} />
      </td>
    </tr>
  )
}
