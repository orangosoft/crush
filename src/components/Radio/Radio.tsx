export default function Radio(props: {
  name?: string
  label?: string
  value?: string
  checked?: boolean
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'neutral' | 'custom'
  class?: string
  onChange?: (value: string) => void
}) {
  const getClasses = () => {
    let classes = 'form-radio'
    if (props.size === 'small') {
      classes += ' h-3 w-3 text-sm'
    } else if (props.size === 'large') {
      classes += ' h-6 w-6 text-lg'
    } else {
      classes += ' h-4 w-4'
    }
    if (props.variant === 'primary') {
      classes += ' accent-sky-600'
    } else if (props.variant === 'success') {
      classes += ' accent-green-600'
    } else if (props.variant === 'danger') {
      classes += ' accent-red-600'
    } else if (props.variant === 'warning') {
      classes += ' accent-yellow-600'
    } else if (props.variant === 'neutral') {
      classes += ' accent-gray-600'
    } else if (props.variant === 'custom') {
      classes += ' accent-custom-600'
    } else {
      classes += ' accent-sky-600'
    }
    if (props.class) classes += ' ' + props.class
    return classes
  }
  const onRadioChange = (evt: any) => {
    props.onChange?.(evt.target.value)
  }

  return (
    <div class="flex items-center">
      <input
        name={props.name}
        type="radio"
        class={getClasses()}
        value={props.value}
        checked={props.checked}
        disabled={props.disabled}
        onChange={onRadioChange}
      />
      <label class="ml-2" classList={{ 'text-sm': props.size === 'small', 'text-lg': props.size === 'large' }}>
        {props.label}
      </label>
    </div>
  )
}
