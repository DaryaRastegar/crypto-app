import React, { useState, PureComponent } from 'react'
import styles from './Chart.module.css'
import { convertdata } from '../../helpers/converData'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function Chart({ chart, setChart }) {
  const [type, setType] = useState('prices')

  const typeHandler = (e) => {
    if (e.target.tagName === 'BUTTON') {
      const type = e.target.innerText.toLowerCase().replace(' ', '_')
      console.log(type)
      setType(type)
    }
  }
  return (
    <div className={styles.container}>
      <span className={styles.cross} onClick={() => setChart(false)}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.coin.image} />
          <p>{chart.coin.name}</p>
        </div>
        <div className={styles.graph}>
          <GraphComponent data={convertdata(chart, type)} type={type} />
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button className={type === 'prices' ? styles.selected : null}>
            Prices
          </button>
          <button className={type === 'market_caps' ? styles.selected : null}>
            Market Caps
          </button>
          <button className={type === 'total_volumes' ? styles.selected : null}>
            Total Volumes
          </button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Prices:</p>
            <span>{chart.coin.current_price}</span>
          </div>
          <div>
            <p>Ath:</p>
            <span>{chart.coin.ath}</span>
          </div>
          <div>
            <p>Market Cap: </p>
            <span> {chart.coin.market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chart

const GraphComponent = ({ data, type }) => {
  console.log({ data, type })
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#3874ff"
          strokeWidth="2px"
        />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={['auto', 'auto']} />
        <XAxis dataKey="date" hide />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}
