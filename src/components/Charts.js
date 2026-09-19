import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  Chart,
  LineController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Legend,
  Tooltip,
} from 'chart.js'

Chart.register(
  LineController,
  DoughnutController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Legend,
  Tooltip,
)

function useChart(type, dataRef, optionsRef) {
  const canvas = ref(null)
  let chart
  onMounted(() => {
    chart = new Chart(canvas.value, {
      type,
      data: dataRef.value,
      options: optionsRef.value,
    })
  })
  watch([dataRef, optionsRef], () => {
    if (!chart) return
    chart.data = dataRef.value
    chart.options = optionsRef.value
    chart.update()
  }, { deep: true })
  onBeforeUnmount(() => chart?.destroy())
  return canvas
}

const baseOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: { ticks: { font: { family: 'Onest', size: 10 } }, grid: { color: 'rgba(0,0,0,0.04)' } },
    y: { ticks: { font: { family: 'Onest', size: 10 } }, grid: { color: 'rgba(0,0,0,0.06)' } },
  },
}

export const LineChart = defineComponent({
  name: 'LineChart',
  props: {
    labels: Array,
    datasets: Array,
    suggestedMax: Number,
    suggestedMin: Number,
  },
  setup(props) {
    const data = computed(() => ({ labels: props.labels, datasets: props.datasets }))
    const options = computed(() => ({
      ...baseOpts,
      scales: {
        ...baseOpts.scales,
        y: {
          ...baseOpts.scales.y,
          suggestedMax: props.suggestedMax,
          suggestedMin: props.suggestedMin,
          beginAtZero: props.suggestedMin == null,
        },
      },
    }))
    const canvas = useChart('line', data, options)
    return () => h('canvas', { ref: canvas })
  },
})

export const DoughnutChart = defineComponent({
  name: 'DoughnutChart',
  props: {
    labels: Array,
    values: Array,
    colors: Array,
  },
  setup(props) {
    const data = computed(() => ({
      labels: props.labels,
      datasets: [{
        data: props.values,
        backgroundColor: props.colors,
        borderWidth: 0,
      }],
    }))
    const options = computed(() => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 10, font: { family: 'Outfit', size: 11 } } },
      },
    }))
    const canvas = useChart('doughnut', data, options)
    return () => h('canvas', { ref: canvas })
  },
})
