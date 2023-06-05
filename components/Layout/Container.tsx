import { createEffect, onCleanup, onMount, splitProps } from "solid-js"

export default function (props: {
  autoScroll?: Function,
  class?: string,
  classList?: any,
  contentClass?: string,
  children?: any,
  disabled?: boolean,
  [key: string]: any
}) {
  let contentRef: any
  let [local, rest] = splitProps(props, ['autoScroll', 'class', 'classList', 'contentClass', 'children', 'disabled'])
  const contentStyles = () => `flex flex-col flex-grow h-0 overflow-auto  ${local.contentClass ?? ''}`

  if (local.autoScroll) {
    onMount(() => {
      const handleUrlChange = () => {
        contentRef.scrollTo(0, 0)
      }

      window.addEventListener('pushstate', handleUrlChange)
      window.addEventListener('popstate', handleUrlChange)

      onCleanup(() => {
        window.removeEventListener('pushstate', handleUrlChange)
        window.removeEventListener('popstate', handleUrlChange)
      })
    })

    local.autoScroll(() => {
      contentRef.scrollTo(0, 0)
    })
  }

  createEffect(() => {
    if (local.disabled) {
      contentRef.setAttribute('inert', '')
    } else {
      contentRef.removeAttribute('inert')
    }
  })

  return (
    <div class={`flex flex-col overflow-hidden ${local.class}`} classList={local.classList} {...rest}>
      <div ref={contentRef} class={contentStyles()}>{local.children}</div>
    </div>
  )
}
