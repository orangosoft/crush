import { BsAsterisk } from 'solid-icons/bs'
import { Show } from "solid-js"
import { TextField } from "@kobalte/core"
import { ValidationMessage } from "@felte/reporter-solid"

export default function (props: {
  type?: string
  name: string
  label?: string
  placeholder?: string
  required?: boolean,
  class?: string
  onBlur?: (val: any) => void
  onChange?: (val: any) => void
}) {

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
        <TextField.Label class="select__label">
          <span>{props.label}</span>
          <Show when={props.required}>
            <span class="text-red-500"><BsAsterisk size={9} /></span>
          </Show>
        </TextField.Label>
      </Show>
      <TextField.TextArea name={props.name} placeholder={props.placeholder} class="textfield__textarea w-full" onInput={handleInput} onBlur={props.onBlur} />
      <ValidationMessage for={props.name}>
        {(messages) => <span class='validation-message'>{messages?.[0]}</span>}
      </ValidationMessage>
    </TextField.Root>
  )
}