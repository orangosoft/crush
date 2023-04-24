import styles from './Badge.module.css'
export default function Badge(props: {
  children: any
  variant: 'primary' | 'neutral' | 'success' | 'danger' | 'warning'
  pill?: boolean
  pulse?: boolean
  class?: string
}) {
  const primaryBackground = 'bg-sky-400'
  const successBackground = 'bg-green-400'
  const neutralBackground = 'bg-slate-400'
  const warningBackground = 'bg-yellow-400'
  const dangerBackground = 'bg-red-400'

  const getClasses = () => {
    let classes = 'relative inline flex items-center justify-center p-1 px-2 text-xs min-h-[20px] min-w-[24px]'
    if (props.variant === 'primary') {
      classes += ` ${primaryBackground}`
    } else if (props.variant === 'success') {
      classes += ` ${successBackground}`
    } else if (props.variant === 'neutral') {
      classes += ` ${neutralBackground}`
    } else if (props.variant === 'warning') {
      classes += ` ${warningBackground}`
    } else if (props.variant === 'danger') {
      classes += ` ${dangerBackground}`
    }
    if (props.pill) classes += ' rounded-full'
    else classes += ' rounded-sm'
    if (props.pulse) {
      if (props.variant === 'primary') classes += ` ${styles.PulsePrimary}`
      else if (props.variant === 'success') classes += ` ${styles.PulseSuccess}`
      else if (props.variant === 'neutral') classes += ` ${styles.PulseNeutral}`
      else if (props.variant === 'warning') classes += ` ${styles.PulseWarning}`
      else if (props.variant === 'danger') classes += ` ${styles.PulseDanger}`
    }
    if (props.class) classes += ` ${props.class}`
    return classes
  }

  return <div class={getClasses()}>{props.children}</div>
}
