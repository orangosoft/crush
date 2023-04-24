import { Show, createSignal } from 'solid-js'

import { VsChromeClose } from 'solid-icons/vs'

export const [showAlert, setShowAlert] = createSignal(false)

export default function Alert(props: {
  children: any
  icon?: any
  class?: string
  style?: 'primary' | 'warning' | 'danger' | 'success'
  onClose?: () => void
}) {
  let classes = 'flex gap-2 text-sm p-4 rounded-md dark:bg-gray-800'
  if (props.style === 'primary') {
    classes += ' bg-sky-500 text-white dark:text-sky-500'
  } else if (props.style === 'warning') {
    classes += ' bg-yellow-500 text-white dark:text-yellow-500'
  } else if (props.style === 'danger') {
    classes += ' bg-red-600 text-white dark:text-red-600'
  } else if (props.style === 'success') {
    classes += ' bg-green-600 text-white dark:text-green-600'
  } else {
    classes += ' bg-slate-800 text-slate-200'
  }

  return (
    <div class={classes} role="alert">
      {props.icon ? <props.icon class="text-xl" /> : null} <div>{props.children}</div>
      <div class="flex-grow"></div>
      <Show when={props.onClose}>
        <div>
          <button onClick={props.onClose}>
            <VsChromeClose />
          </button>
        </div>
      </Show>
    </div>
  )
}
