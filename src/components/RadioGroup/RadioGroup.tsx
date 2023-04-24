import Radio from '../Radio/Radio'
import { createSignal } from 'solid-js'

export default function RadioGroup(props: {
  align?: 'col' | 'row'
  name: string
  value: string
  onChange: (value: string) => void
  children: any
  size?: 'small' | 'medium' | 'large'
  class?: string
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'neutral' | 'custom'
}) {
  const [value, setValue] = createSignal(props.value)
  const onRadioChange = (value: any) => {
    props.onChange(value)
    setValue(value)
  }
  return (
    <div
      class={`flex flex-col gap-2 ${props.class || ''}`}
      classList={{ 'flex-col': props.align === 'col', 'flex-row': props.align === 'row' }}
    >
      {props.children.map((child: any) => {
        const input = child().querySelector('input')
        const label = child().querySelector('label')
        return (
          <Radio
            name={props.name}
            size={props.size}
            variant={props.variant}
            label={label.innerText}
            value={input.value}
            checked={input.value === value}
            disabled={input.disabled}
            onChange={onRadioChange}
          />
        )
      })}
    </div>
  )
}
