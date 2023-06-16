import { BsAsterisk } from 'solid-icons/bs'
import { Checkbox } from '@kobalte/core'
import { FiCheck } from 'solid-icons/fi'
import { Show } from 'solid-js'
import { ValidationMessage } from '@felte/reporter-solid'

export default function (props: {
  name?: string
  label: string
  required?: boolean
  model?: any
  checked?: boolean
  onChange?: (value: boolean) => void
}) {
  const checked = () => (props.name ? (props.model.data()[props.name] ? true : false) : props.checked ?? false)

  const onChange = (checked: boolean) => {
    if (props.name) props.model.setData(props.name, checked)
    if (props.onChange) props.onChange(checked)
  }

  return (
    <div
      class="form__field"
      classList={{
        required: props.required ?? false,
      }}
    >
      <Checkbox.Root class="checkbox" checked={checked()} onChange={onChange}>
        <Checkbox.Input class="checkbox__input" />
        <Checkbox.Control class="checkbox__control">
          <Checkbox.Indicator>
            <FiCheck size={18} />
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label class="checkbox__label">
          <span>{props.label}</span>
          <Show when={props.required}>
            <span class="text-red-500">
              <BsAsterisk size={9} />
            </span>
          </Show>
        </Checkbox.Label>
      </Checkbox.Root>
      <Show when={props.name}>
        <ValidationMessage for={props.name ?? ''}>
          {messages => (
            <Show when={messages?.[0]}>
              <span class="validation-message">{messages?.[0]}</span>
            </Show>
          )}
        </ValidationMessage>
      </Show>
    </div>
  )
}
