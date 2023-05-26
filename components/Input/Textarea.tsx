import './Textarea.css'

import { createEffect, onMount } from "solid-js"

export default function (props: {
  value?: string
  class?: string
  autofocus?: boolean
  onFocus?: () => void
  onBlur?: () => void
  onChange: (value: string) => void
  [key: string]: any
}) {

  let containerRef: any
  let textRef: any

  const { class: _, onChange, ...rest } = props

  const onInput = (e: any) => {
    containerRef.dataset.replicatedValue = textRef.value
    props.onChange(e.target.value)
  }

  createEffect(() => {
    if (textRef.value === props.value) return
    containerRef.dataset.replicatedValue = props.value
    textRef.value = props.value
  })

  onMount(() => {
    if (props.autofocus) {
      textRef.focus()
    }
  })

  return (
    <div ref={containerRef} class='relative grow-wrap overflow-scroll' classList={{
      [props.class ?? '']: true
    }}>
      <textarea ref={textRef}
        rows={1}
        class='w-full resize-none border-none focus:outline-none'
        value={props.value}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onInput={onInput}
        {...rest}
      ></textarea>
    </div>
  )
}