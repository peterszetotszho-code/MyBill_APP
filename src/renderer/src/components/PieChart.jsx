import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { PieChart as EChartPie } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([EChartPie, TooltipComponent, LegendComponent, CanvasRenderer])

// data: [{ name: '餐饮美食', value: 123.45 }, ...]
function PieChart({ data }) {
  const ref = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    chartRef.current = echarts.init(ref.current)
    const onResize = () => chartRef.current && chartRef.current.resize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (chartRef.current) {
        chartRef.current.dispose()
        chartRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!chartRef.current) return
    chartRef.current.setOption({
      tooltip: {
        trigger: 'item',
        formatter: (p) => `${p.name}: HK$${Number(p.value).toFixed(2)}（${p.percent}%）`
      },
      legend: { bottom: 0, type: 'scroll' },
      series: [
        {
          name: '消费占比',
          type: 'pie',
          radius: ['38%', '68%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
          itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
          label: { show: true, formatter: '{b}\n{d}%' },
          data
        }
      ]
    })
  }, [data])

  return <div ref={ref} style={{ width: '100%', height: 360 }} />
}

export default PieChart
