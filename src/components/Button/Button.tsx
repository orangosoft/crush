import { Show } from 'solid-js'
import Spinner from '../Spinner/Spinner'
import { TbChevronDown } from 'solid-icons/tb'

export default function Button(props: {
  class?: string
  variant?: 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'custom'
  pill?: boolean
  outline?: boolean
  text?: boolean
  disabled?: boolean
  size?: 'small' | 'large'
  children?: any
  caret?: boolean
  circle?: boolean
  loading?: boolean
  [key: string]: any
}) {
  const { style, variant, class: className, size, children, ...rest } = props

  // const isDisabled = () => !!props.disabled

  const getClasses = () => {
    let classes = 'flex items-center justify-center font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:outline-none focus:outline-sky-500 focus:outline-offset-2 transition'
    // normal classes
    const primaryBackground = 'bg-sky-600 hover:bg-sky-700 disabled:hover:bg-sky-600'
    const successBackground = 'bg-green-600 hover:bg-green-700 disabled:hover:bg-green-600'
    const neutralBackground =
      'bg-neutral-100 hover:bg-neutral-200 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:hover:bg-neutral-100 disabled:dark:hover:bg-slate-700'
    const warningBackground = 'bg-yellow-600 hover:bg-yellow-700 disabled:hover:bg-yellow-600'
    const dangerBackground = 'bg-red-500 hover:bg-red-600 disabled:hover:bg-red-500'
    // outline classes
    const primaryBorders = 'border-sky-600 hover:border-sky-700 disabled:hover:border-sky-600'
    const successBorders = 'border-green-600 hover:border-green-700 disabled:hover:border-green-600'
    const neutralBorders =
      'neutral-100 hover:border-neutral-200 dark:border-slate-600 dark:hover:border-slate-700 disabled:hover:border-slate-600 disabled:dark:hover:border-slate-600'
    const warningBorders = 'border-yellow-600 hover:border-yellow-700 disabled:hover:border-yellow-600'
    const dangerBorders = 'border-red-600 hover:border-red-700 disabled:hover:border-red-600'
    // text classes
    const primaryText =
      'text-sky-600 hover:text-sky-700 hover:bg-sky-50 dark:hover:bg-sky-700 dark:hover:text-white disabled:hover:text-sky-600 dark:disabled:hover:bg-transparent dark:disabled:hover:text-sky-600'
    const successText =
      'text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-700 dark:hover:text-white disabled:hover:text-green-600 dark:disabled:hover:bg-transparent dark:disabled:hover:text-green-600'
    const neutralText =
      'text-slate-600 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-neutral-400 disabled:hover:text-slate-400 disabled:dark:hover:bg-transparent disabled:dark:hover:text-slate-600'
    const warningText =
      'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-700 dark:hover:text-white disabled:hover:text-yellow-600 dark:disabled:hover:bg-transparent dark:disabled:hover:text-yellow-600'
    const dangerText =
      'text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-700 dark:hover:text-white disabled:hover:text-red-600 dark:disabled:hover:bg-transparent dark:disabled:hover:text-red-600'

    if (props.variant === 'primary') {
      if (props.outline || props.pill) {
        classes += ` ${primaryBorders} border`
        if (!props.outline) classes += ` ${primaryBackground} text-white`
        else classes += ` ${primaryText}`
      } else if (props.text) {
        classes += ` ${primaryText}`
      } else {
        classes += ` ${primaryBackground} ${primaryBorders} text-white`
      }
    } else if (props.variant === 'success') {
      if (props.outline || props.pill) {
        classes += ` ${successBorders} border`
        if (!props.outline) classes += ` ${successBackground} text-white`
        else classes += ` ${successText}`
      } else if (props.text) {
        classes += ` ${successText}`
      } else {
        classes += ` ${successBackground} ${successBorders} text-white`
      }
    } else if (props.variant === 'neutral') {
      if (props.outline || props.pill) {
        classes += ` ${neutralBorders} border`
        if (!props.outline) classes += ` ${neutralBackground} text-neutral-600`
        else classes += ` ${neutralText}`
      } else if (props.text) {
        classes += ` ${neutralText}`
      } else {
        classes += ` ${neutralBackground} ${neutralBorders} text-neutral-600`
      }
    } else if (props.variant === 'warning') {
      if (props.outline || props.pill) {
        classes += ` ${warningBorders} border`
        if (!props.outline) classes += ` ${warningBackground} text-white`
        else classes += ` ${warningText}`
      } else if (props.text) {
        classes += ` ${warningText}`
      } else {
        classes += ` ${warningBackground} ${warningBorders} text-white`
      }
    } else if (props.variant === 'danger') {
      if (props.outline || props.pill) {
        classes += ` ${dangerBorders} border`
        if (!props.outline) classes += ` ${dangerBackground} text-white`
        else classes += ` ${dangerText}`
      } else if (props.text) {
        classes += ` ${dangerText}`
      } else {
        classes += ` ${dangerBackground} ${dangerBorders} text-white`
      }
    }
    // add rounded classes
    classes += props.pill || props.circle ? ' rounded-full' : ' rounded-md'
    if (props.circle) classes += ' aspect-square'
    if (props.class) classes += ' ' + props.class
    return classes
  }
  return (
    <button
      type='button'
      {...rest}
      class={getClasses()}
      classList={{
        'text-xs py-2 px-4': props.size === 'small',
        'py-3 px-4 text-lg': props.size === 'large',
        'py-3 px-4 text-sm': !props.size,
        '!bg-transparent': props.text,
        ...props.classList ?? {},
      }}
      tabIndex={props.disabled ? -1 : 0}
      disabled={props.disabled}
      onClick={(ev: any) => props.onClick?.(ev)}
    >
      <Show when={props.loading}>
        <Spinner class="text-lg mr-2" />
      </Show>
      {props.children}
      <Show when={props.caret}>
        <TbChevronDown class="ml-2" />
      </Show>
    </button>
  )
}
