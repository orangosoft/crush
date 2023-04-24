import { Match, Switch, createSignal } from 'solid-js'

export default function Avatar(props: {
  alt?: string
  class?: string
  label?: string
  icon?: any
  size?: 'sm' | 'md' | 'lg' | 'xl'
  src?: string
  onClick?: any
}) {
  const [showImage, setShowImage] = createSignal(props.src ? true : false)

  const onError = () => {
    setShowImage(false)
  }
  let styles = 'rounded-full overflow-hidden flex items-center justify-center font-medium'
  if (props.size === 'sm') {
    styles += ` h-8 w-8 bg-sky-600 text-white text-sm`
  } else if (props.size === 'md') {
    styles += ` h-12 w-12 bg-sky-600 text-white text-2xl`
  } else if (props.size === 'lg') {
    styles += ` h-16 w-16 bg-sky-600 text-white text-4xl`
  } else if (props.size === 'xl') {
    styles += ` h-24 w-24 bg-sky-600 text-white text-4xl`
  }

  if (props.class) {
    styles += ` ${props.class}`
  }
  return (
    <div class={styles} onClick={props.onClick}>
      <Switch>
        <Match when={props.src && showImage()}>
          <img src={props.src} alt={props.alt} class="w-full h-full" referrerpolicy="no-referrer" onError={onError} />
        </Match>
        <Match when={props.icon}>
          <props.icon class="w-full h-full p-2" />
        </Match>
        <Match when={props.label}>
          <div>{props.label}</div>
        </Match>
      </Switch>
    </div>
  )
}
