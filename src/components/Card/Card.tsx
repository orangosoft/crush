import { Show } from 'solid-js'

export default function Card(props: {
  children: any
  class?: string
  header?: any
  footer?: any
  image?: string
  imageAlt?: string
}) {
  let classes = 'border rounded-md drop-shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100'
  if (props.class) classes += ' ' + props.class
  const onError = () => {
    console.log('error')
  }
  return (
    <div class={classes}>
      <Show when={props.image}>
        <img
          src={props.image}
          alt={props.imageAlt ?? 'Card Image'}
          class="w-full"
          referrerpolicy="no-referrer"
          onError={onError}
        />
      </Show>
      <Show when={props.header}>
        <div class="flex items-center justify-between p-4 drop">{props.header}</div>
        <hr />
      </Show>
      <div class="p-4">{props.children}</div>

      <Show when={props.footer}>
        <hr />
        <div class="flex items-center justify-between p-4">{props.footer}</div>
      </Show>
    </div>
  )
}
