import { For, Show, onCleanup, onMount } from "solid-js"

import { BsAsterisk } from "solid-icons/bs"
import { RadioGroup } from "@kobalte/core"
import { ValidationMessage } from "@felte/reporter-solid"

type Option = { label: string, value?: any, disabled?: boolean }

export default function (props: {
  name: string
  label: string
  options: Option[],
  required?: boolean
  model: any
  class?: string
}) {
  const required = props.required ?? false

  const onChange = (val: string) => {
    props.model.setData(props.name, val)
  }

  return (
    <RadioGroup.Root
      name={props.name}
      value={props.model.data()[props.name]}
      class="form__field"
      classList={{ 
        required: props.required ?? false,
        [props.class ?? '']: true,
      }}
      onChange={onChange}>
      <RadioGroup.Label class="radio-group__label flex gap-1 items-center" classList={{
        'font-medium': props.required ?? false
      }}>
        <span>{props.label}</span>
        <Show when={required}>
          <span class="text-red-500"><BsAsterisk size={11} /></span>
        </Show>
      </RadioGroup.Label>
      <div class="radio-group__items rounded-lg p-2 py-3 form__item" classList={{
        'bg-sky-50': props.required ?? false,
      }}>
        <For each={props.options}>
          {option => (
            <RadioGroup.Item value={option.value} class="radio">
              <RadioGroup.ItemInput class="radio__input" />
              <RadioGroup.ItemControl class="radio__control">
                <RadioGroup.ItemIndicator class="radio__indicator" />
              </RadioGroup.ItemControl>
              <RadioGroup.ItemLabel class="radio__label">{option.label}</RadioGroup.ItemLabel>
            </RadioGroup.Item>
          )}
        </For>
      </div>
      <ValidationMessage for={props.name}>
        {(messages) => <Show when={messages?.[0]}><span class='validation-message'>{messages?.[0]}</span></Show>}
      </ValidationMessage>
    </RadioGroup.Root>
  )
}