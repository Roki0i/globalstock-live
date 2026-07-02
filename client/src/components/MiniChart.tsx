import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from 'recharts'

type MiniChartProps = {
  data: number[]
  positive: boolean
}

const MiniChart = ({ data, positive }: MiniChartProps) => {
  const chartData = data.map((value, index) => ({ index, value }))
  const stroke = positive ? '#22c55e' : '#ef4444'

  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 8, right: 4, bottom: 2, left: 4 }}>
          <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
          <Tooltip
            cursor={false}
            contentStyle={{
              background: '#07111f',
              border: '1px solid rgba(148, 163, 184, 0.25)',
              borderRadius: 8,
              color: '#e5eefb',
            }}
            formatter={(value) => [`${Number(value).toFixed(2)}`, 'Price']}
            labelFormatter={() => ''}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MiniChart
