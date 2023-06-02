import { splitProps } from "solid-js"

export default function (props: any) {
  let [local, rest] = splitProps(props, ['class', 'classList', 'contentClass', 'children'])
  const contentStyles = () => `flex flex-col flex-grow h-0 overflow-auto  ${local.contentClass ?? ''}`

  return (
    <div class={`flex flex-col overflow-hidden ${local.class}`} classList={local.classList} {...rest}>
      <div class={contentStyles()}>{local.children}</div>
    </div>
  )
}
