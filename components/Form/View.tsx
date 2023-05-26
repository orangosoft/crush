import { BsAsterisk } from 'solid-icons/bs'
import { Show } from "solid-js"
import { TextField } from "@kobalte/core"
import { ValidationMessage } from "@felte/reporter-solid"

export default function (props: {
  type?: string
  name: string
  label: string
  placeholder?: string
  required?: boolean
  value?: string
  class?: string
}) {

  return (
    <TextField.Root class="form__field" classList={{
      required: props.required ?? false,
      [props.class ?? '']: true
    }}>
      <TextField.Label class="select__label">
        <span>{props.label}</span>
      </TextField.Label>
      <TextField.Input tabIndex={-1} type={props.type} name={props.name} placeholder={props.placeholder} readOnly class="textfield__input w-full cursor-default"  />
    </TextField.Root>
  )
}