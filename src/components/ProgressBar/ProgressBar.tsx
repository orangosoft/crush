import { createEffect, onMount } from 'solid-js'
// indeterminate needs the tailwindcss animation in the tailwind config of style-guide
export default function ProgressBar(props: {
  value?: number
  class?: string
  indeterminate?: boolean
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'neutral' | 'custom'
}) {
  let progress: any
  let background: any
  const getClasses = () => {
    let classes = 'absolute inset-y-0 h-2 h-full'
    if (props.indeterminate) {
      classes += ' animate-indeterminate w-1/2'
    } else {
      classes += ' transition-all duration-200'
    }
    if (props.variant === 'primary') {
      classes += ' bg-sky-600'
    } else if (props.variant === 'success') {
      classes += ' bg-green-600'
    } else if (props.variant === 'danger') {
      classes += ' bg-red-600'
    } else if (props.variant === 'warning') {
      classes += ' bg-yellow-600'
    } else if (props.variant === 'neutral') {
      classes += ' bg-gray-600'
    } else if (props.variant === 'custom') {
      classes += ' bg-custom-600'
    } else {
      classes += ' bg-sky-600'
    }
    return classes
  }
  createEffect(() => {
    if (progress && !props.indeterminate) {
      progress.style.width = `${props.value || 0}%`
    }
  })
  return (
    <div class={`relative w-full rounded-full overflow-hidden ${props.class || ''}`}>
      <div ref={background} class="bg-slate-50 rounded-full h-full"></div>
      <div ref={progress} class={getClasses()}></div>
    </div>
  )
}
