import { Show, createSignal } from "solid-js"

import { BsAsterisk } from "solid-icons/bs"
import { Switch } from "@kobalte/core"
import { Toggle } from ".."
import { ValidationMessage } from "@felte/reporter-solid"

export default function (props: {
  name: string
  label: string
  required?: boolean
  model?: any
}) {

  const onChange = (checked: boolean) => {
    props.model.setData(props.name, checked)
  }

  return (
    <div class="form__field" classList={{
      required: props.required ?? false
    }}>
      <Switch.Root class="switch" checked={props.model.data()[props.name]} onChange={onChange}>
        <Switch.Input name={props.name} class="switch__input" />
        <Switch.Control class="switch__control">
          <Switch.Thumb class="switch__thumb" />
        </Switch.Control>
        <Switch.Label class="switch__label flex items-center gap-1">
          <span>{props.label}</span>
          <Show when={props.required}>
            <span class="text-red-500"><BsAsterisk size={9} /></span>
          </Show>
        </Switch.Label>
      </Switch.Root>
      <ValidationMessage for={props.name}>
      {(messages) => <Show when={messages?.[0]}><span class='validation-message'>{messages?.[0]}</span></Show>}
      </ValidationMessage>
    </div>
  )
}