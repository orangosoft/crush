import { BsAsterisk } from 'solid-icons/bs'
import { Show } from 'solid-js'
import { Switch } from '@kobalte/core'
import { ValidationMessage } from '@felte/reporter-solid'

export default function (props: {
  name: string
  label: string
  required?: boolean
  model?: any
  trueValue?: any
  falseValue?: any
  class?: string
  onChange?: (value: boolean) => void
}) {
  const onChange = (checked: boolean) => {
    props.model.setData(props.name, checked ? props.trueValue ?? true : props.falseValue ?? false)
    if (props.onChange) props.onChange(checked ? props.trueValue ?? true : props.falseValue ?? false)
  }

  return (
    <div
      class="form__field"
      classList={{
        required: props.required ?? false,
      }}
    >
      <Switch.Root
        class="switch"
        classList={{
          [props.class ?? '']: true,
        }}
        checked={props.model.data()[props.name]}
        onChange={onChange}
      >
        <Switch.Input name={props.name} class="switch__input" />
        <Switch.Control class="switch__control">
          <Switch.Thumb class="switch__thumb" />
        </Switch.Control>
        <Switch.Label class="switch__label flex items-center gap-1">
          <span>{props.label}</span>
          <Show when={props.required}>
            <span class="text-red-500">
              <BsAsterisk size={9} />
            </span>
          </Show>
        </Switch.Label>
      </Switch.Root>
      <ValidationMessage for={props.name}>
        {messages => (
          <Show when={messages?.[0]}>
            <span class="validation-message">{messages?.[0]}</span>
          </Show>
        )}
      </ValidationMessage>
    </div>
  )
}
