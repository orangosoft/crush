import { Accessor, For } from 'solid-js'
const arr = ['Profile', 'Settings', 'Messages']
export default function ButtonGroup(props: {
  size?: 'small' | 'large'
  variant?: 'primary' | 'neutral'
  secondary?: boolean
  buttons: { active: boolean; label: string; onClick: () => void }[]
}) {
  return (
    <div class="inline-flex rounded-md shadow-sm" role="group">
      <For each={props.buttons}>
        {(button: { active: boolean; label: string; onClick: () => void }, index: Accessor<number>) => (
          <button
            type="button"
            class="font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700"
            classList={{
              'rounded-l-lg border': index() === 0,
              'border-y': index() === 1,
              'border rounded-r-md': index() === arr.length - 1,
              'text-xs py-2 px-3': props.size === 'small',
              'py-3 px-4 text-lg': props.size === 'large',
              'py-3 px-4 text-sm': !props.size,
              'bg-sky-600 hover:bg-sky-700 hover:text-white dark:bg-sky-600 dark:hover:bg-sky-700':
                props.variant === 'primary',
              'text-sky-600 bg-white border border-sky-600 hover:bg-sky-100 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600':
                props.variant === 'neutral',
              'text-gray-600 bg-white border-gray-600 hover:bg-gray-100 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600':
                !props.variant,
              '!bg-sky-600 hover:!bg-sky-700 text-white dark:bg-sky-600 dark:hover:bg-sky-700': button.active,
            }}
            onClick={() => button.onClick?.()}
          >
            {button.label}
          </button>
        )}
      </For>
    </div>
  )
}
