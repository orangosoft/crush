import { BsAsterisk, BsCheck } from "solid-icons/bs"

import { CgSelect } from "solid-icons/cg"
import { Select } from "@kobalte/core"
import { Show } from "solid-js"
import { ValidationMessage } from "@felte/reporter-solid"
import { createField } from "@felte/solid"

type Option = { label: string, value: string }

export default function (props: {
  name: string
  label?: string
  class?: string
  options: Option[],
  required?: boolean
  placeholder?: string
  model: any
  onChange?: (value: string[]) => void
}) {

  let fieldRef: any

  const placeHolder = props.placeholder ?? 'Select an option...'
  // const emptyOption = { label: '', value: '' }
  const required = props.required ?? false
  const { onBlur } = createField(props.name)

  const selectedOptions = () => props.model.data()[props.name] ?
    props.options?.filter(option => (option.value ?? option.label) === props.model.data()[props.name]) :
    []
  

  // const selectedOptionValue = () => props.model.data()[props.name] ?
  //   props.options?.find(option => (option.value ?? option.label) === props.model.data()[props.name]) :
  //   emptyOption

  const onChange = (selectedOptions: Option[]) => {
    // if (!selectedOptions) return
    const values = selectedOptions.map(option => option.value)
    props.model.setData(props.name, values)
    if (props.onChange) props.onChange(values)
  }

  return (
    <Select.Root<Option>
      multiple
      name={props.name}
      value={selectedOptions()}
      class="form__field"
      classList={{
        required: props.required ?? false,
        [props.class ?? '']: true,
      }}
      options={props.options || []}
      optionValue="value"
      optionTextValue="label"
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
        <Select.Value<Option> class="select__value">{state => state.selectedOption()?.label}</Select.Value>
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