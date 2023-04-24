import { Show } from "solid-js"

export default function Backdrop(props: {
  show: any,
  children?: any
  class?: string,
  onClick?: () => void
}) {
  return (
    <Show when={props.show}>
      <div class={`${props.class} fixed top-0 left-0 w-full h-full flex bg-black/20 z-20`} onClick={props.onClick}>
        {props.children}
      </div>
    </Show>
  )
}