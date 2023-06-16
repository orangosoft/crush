import { Show, splitProps } from "solid-js"

import { BsAsterisk } from 'solid-icons/bs'
import { TextField } from "@kobalte/core"
import { ValidationMessage } from "@felte/reporter-solid"

export default function (props: {
  type?: string
  name: string
  label?: string
  placeholder?: string
  required?: boolean,
  class?: string
  inputClass?: string
  children?: any
  onBlur?: (val: any) => void
  onChange?: (val: any) => void
  [key: string]: any
}) {

  // use solidjs splitProps
  const [_local, rest] = splitProps(props, ['type', 'name', 'label', 'placeholder', 'required', 'class', 'inputClass', 'children', 'onBlur', 'onChange'])

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (props.onChange) props.onChange(target.value)
  }
  return (
    <TextField.Root class="form__field" classList={{
      required: props.required ?? false,
      [props.class ?? '']: true
    }} onChange={props.onChange}>
      <Show when={props.label}>
        <TextField.Label class="textfield__label">
          <span>{props.label}</span>
          <Show when={props.required}>
            <span class="text-red-500"><BsAsterisk size={9} /></span>
          </Show>
        </TextField.Label>
      </Show>
      <TextField.TextArea name={props.name} placeholder={props.placeholder} class="textfield__textarea w-full" classList={{
        [props.inputClass ?? '']: true,
      }} onInput={handleInput} onBlur={props.onBlur} {...rest} />
      {props?.children}
      <ValidationMessage for={props.name}>
        {(messages) => <span class='validation-message'>{messages?.[0]}</span>}
      </ValidationMessage>
    </TextField.Root>
  )
}