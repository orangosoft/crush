import { Show, createEffect, createUniqueId } from 'solid-js'

function Toggle(props: {
  name?: string
  class?: any
  size?: 'small' | 'medium' | 'large'
  checked?: any
  rtl?: any
  onChange?: (val: boolean) => void
  disabled?: any
  label?: string
}) {
  let elem: any
  const name = props.name || createUniqueId()

  const handleToggle = () => {
    props.onChange?.(elem.checked)
  }
  const getClasses = () => {
    let classes = `peer bg-gray-200 rounded-full dark:bg-gray-700 dark:border-gray-600 whitespace-nowrap
    peer-checked:after:translate-x-full peer-checked:after:border peer-checked:bg-sky-600
    after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all`
    if (props.size === 'large') classes += ' w-[52px] h-7 after:top-0.5 after:left-[2px] after:h-6 after:w-6'
    else if (props.size === 'small') classes += ' w-7 h-4 after:left-[2px] after:top-[2px] after:h-3 after:w-3'
    else classes += ' w-9 h-5 after:left-[2px] after:top-[2px] after:h-4 after:w-4'

    if (props.class) classes += ' ' + props.class
    return classes
  }
  return (
    <div class="flex items-center">
      <label
        for={name}
        class="relative inline-flex items-center cursor-pointer"
        classList={{ 'opacity-40 cursor-not-allowed': props.disabled }}
      >
        <Show when={props.rtl}>
          <span class="mr-3 text-sm font-medium text-gray-700 dark:text-white">{props.label}</span>
        </Show>
        <input
          ref={elem}
          id={name}
          name={name}
          type="checkbox"
          checked={props.checked}
          disabled={props.disabled}
          onClick={handleToggle}
          class="sr-only peer"
        />
        <div class={getClasses()}></div>
        <Show when={!props.rtl}>
          <span class="ml-3 text-sm font-medium text-gray-700 dark:text-white">{props.label}</span>
        </Show>
      </label>
    </div>
  )
}

export default Toggle
