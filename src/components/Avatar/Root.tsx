import { Show, createMemo, createSignal } from 'solid-js'

export default function (props: { class?: string, children?: any, label?: string, src?: string, name?: string, onClick?: any }) {
  const [imageSrc, setImageSrc] = createSignal(props.src || '')

  return (
    <div class={props.class} onClick={props.onClick}>
      <Show when={props.label}>
        <div class="avatar__initials">{props.label}</div>
      </Show>
      <Show when={imageSrc()}>
        <img src={imageSrc()} alt={props.name} class="avatar__image" onError={() => setImageSrc('')} />
      </Show>
    </div>
  )
}