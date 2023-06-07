import { BsAsterisk, BsCheck } from "solid-icons/bs"
import { Show, onCleanup, onMount } from "solid-js"

import { CgSelect } from "solid-icons/cg"
import { Select } from "@kobalte/core"
import { ValidationMessage } from "@felte/reporter-solid"
import { createField } from "@felte/solid"

type Option = { label: string, value?: any, disabled?: boolean }

export default function (props: {
  name: string
  label?: string
  class?: string
  options: Option[],
  required?: boolean
  placeholder?: string
  model: any
  onChange?: (value: string) => void
}) {

  let fieldRef: any
  let cleanup: any

  const placeHolder = props.placeholder ?? 'Select an option...'
  const emptyOption = { label: '', value: '' }
  const required = props.required ?? false
  const { field, onBlur } = createField(props.name)
  const selectedOptionValue = () => props.model.data()[props.name] ?
    props.options?.find(option => (option.value ?? option.label) === props.model.data()[props.name]) :
    emptyOption

  const onChange = (selectedOption: Option) => {
    if (!selectedOption) return
    props.model.setData(props.name, selectedOption?.value ?? selectedOption.label)
    if (props.onChange) props.onChange(selectedOption?.value ?? selectedOption.label)
  }

  // onMount(() => {
  //   cleanup = field(fieldRef)
  //   onCleanup(() => {
  //     if (!cleanup.destroy) return
  //     cleanup.destroy()
  //   })
  // })

  return (
    <Select.Root
      name={props.name}
      value={selectedOptionValue()}
      class="form__field"
      classList={{
        required: props.required ?? false,
        [props.class ?? '']: true,
      }}
      options={props.options || []}
      optionValue="value"
      optionTextValue="label"
      optionDisabled="disabled"
      placeholder={placeHolder}
      onChange={onChange}
      itemComponent={props => (
        <Select.Item item={props.item} class='select__item'>
          <Select.ItemLabel>{props.item.rawValue.label}</Select.ItemLabel>
          <Select.ItemIndicator class="select__item-indicator">
            <BsCheck size={24} />
          </Select.ItemIndicator>
        </Select.Item>
      )}
    >
      <Show when={props.label}>
        <Select.Label class="select__label" classList={{
          'font-medium': props.required ?? false
        }}>
          <span>{props.label}</span>
          <Show when={required}>
            <span class="text-red-500"><BsAsterisk size={11} /></span>
          </Show>
        </Select.Label>
      </Show>
      <Select.Trigger ref={fieldRef} aria-label="Select Item" class="select__trigger w-full" onBlur={onBlur} classList={{
        'bg-sky-50': props.required ?? false
      }}>
        <Select.Value<Option> class="select__value">{state => state.selectedOption().label}</Select.Value>
        <Select.Icon class="select__icon">
          <CgSelect />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class="select__content z-50">
          <Select.Listbox class="select__listbox" />
        </Select.Content>
      </Select.Portal>
      <ValidationMessage for={props.name}>
        {(messages) => <span class='validation-message'>{messages?.[0]}</span>}
      </ValidationMessage>
    </Select.Root>
  )
}