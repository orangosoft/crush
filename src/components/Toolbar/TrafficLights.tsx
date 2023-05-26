import styles from './TrafficLights.module.css'

export function TrafficLights(props) {
  const { enabled, onClick } = props
  
  const closeButtonClass = `${styles.Button} ${enabled ? 'bg-red-400' : 'bg-neutral-800'}`
  const minButtonClass = `${styles.Button} ${enabled ? 'bg-yellow-400' : 'bg-neutral-800'}`
  const maxButtonClass = `${styles.Button} ${enabled ? 'bg-green-400' : 'bg-neutral-800'}`

  return (
    <div class="flex items-center gap-2 group">
      <button id="close-btn" class={closeButtonClass} onClick={() => onClick('close')}></button>
      <button id="min-btn" class={minButtonClass} onClick={() => onClick('minimize')}></button>
      <button id="max-btn" class={maxButtonClass} onClick={() => onClick('maximize')}></button>
    </div>
  )
}
