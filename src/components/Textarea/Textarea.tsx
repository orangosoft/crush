import { Match, Show, Switch } from 'solid-js'

import { VsChromeClose } from 'solid-icons/vs'

export default function Input(props: {
  append?: any
  clearabel?: boolean
  disabled?: boolean
  error?: string
  label?: string
  hint?: string
  placeholder?: string
  prepend?: any
  size?: 'small' | 'large'
  rows?: number
  value?: string
  onInput?: (val: string | number) => void
  [key: string]: any
}) {
  // I am always scared to use the values after spread but I need to do it here to access ...rest
  const { append, disabled, label, hint, placeholder, prepend, size, type, value, onInput, ...rest } = props
  const handleInput = (ev: any) => {
    let val = ev.target.value
    if (props.type === 'number') {
      val = parseInt(val)
    }
    props.onInput?.(val)
  }
  return (
    <div
      class="py-1"
      classList={{
        'opacity-50': props.disabled,
      }}
    >
      <Show when={props.label}>
        <label for={props.id} class="block text-sm font-medium text-gray-700 dark:text-white">
          {props.label}
        </label>
      </Show>
      <div
        class="relative flex items-center gap-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        classList={{
          'py-1 px-1.5 text-sm': props.size === 'small',
          'py-3 px-2': props.size === 'large',
          'py-2 px-1.5': !props.size,
        }}
      >
        <Show when={props.prepend}>
          <div>{props.prepend}</div>
        </Show>

        <textarea
          class="outline-none flex-grow bg-transparent dark:bg-gray-700 resize-none"
          classList={{ 'cursor-not-allowed': props.disabled }}
          placeholder={props.placeholder}
          disabled={props.disabled}
          value={props.value}
          onInput={handleInput}
          onChange={handleInput}
          {...rest}
        />
        <Show when={props.clearable}>
          <button type="button" class="rounded-full text-gray-700 p-1" onClick={() => props.onInput?.('')}>
            <VsChromeClose />
          </button>
        </Show>
        <Show when={props.append}>
          <div>{props.append}</div>
        </Show>
      </div>
      <Switch>
        <Match when={props.error}>
          <p class="pl-3 pt-1 text-sm font-medium text-red-500">{props.error}</p>
        </Match>
        <Match when={props.hint}>
          <p class="pl-3 pt-1 text-xs text-neutral-500">{props.hint}</p>
        </Match>
      </Switch>
    </div>
  )
}
