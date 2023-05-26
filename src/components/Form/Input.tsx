import { BsAsterisk } from 'solid-icons/bs'
import { Show } from "solid-js"
import { TextField } from "@kobalte/core"
import { ValidationMessage } from "@felte/reporter-solid"

function isMaskMatch(value: string, mask: string, partialMatch = true): boolean {
  let valueIndex = 0
  let maskIndex = 0

  while (maskIndex < mask.length && valueIndex < value.length) {
    const maskChar = mask[maskIndex]
    const valueChar = value[valueIndex]

    if (maskChar === '#') {
      if (!isNumber(valueChar)) {
        return false
      }
    } else if (maskChar === 'A') {
      if (!isLetter(valueChar)) {
        return false
      }
    } else if (maskChar === 'S') {
      if (!isAlphaNumeric(valueChar)) {
        return false
      }
    } else if (maskChar === 'X') {
      // Matches any character
    } else if (maskChar === '?') {
      // Optional character
    } else {
      if (maskChar !== valueChar) {
        return false
      }
    }

    valueIndex++
    maskIndex++
  }

  if (partialMatch) {
    return true
  }

  return maskIndex === mask.length && valueIndex === value.length
}

function mask(value: string, mask: string) {
  if (!value) {
    return ''
  }

  if (!mask) {
    return value
  }

  if (isMaskMatch(value, mask, true)) {
    return value.slice(0, mask.length)
  }

  value = value.replace(/[^\dA-Za-z]/g, '')
  const maskChars = mask.split('')

  let maskedValue = ''
  let valueIndex = 0

  for (const maskChar of maskChars) {
    const valueChar = value[valueIndex]

    if (valueChar === undefined) {
      break
    }

    if (maskChar === '#') {
      if (isNumber(valueChar)) {
        maskedValue += valueChar
        valueIndex++
      } else {
        break
      }
    } else if (maskChar === 'A') {
      if (isLetter(valueChar)) {
        maskedValue += valueChar
        valueIndex++
      } else {
        break
      }
    } else if (maskChar === 'S') {
      if (isAlphaNumeric(valueChar)) {
        maskedValue += valueChar
        valueIndex++
      } else {
        break
      }
    } else if (maskChar === 'X') {
      maskedValue += valueChar
      valueIndex++
    } else if (maskChar === '?') {
      if (valueChar) {
        maskedValue += valueChar
        valueIndex++
      } else {
        break
      }
    } else {
      maskedValue += maskChar
    }
  }

  return maskedValue
}

function isNumber(char: string): boolean {
  return /^\d$/.test(char)
}

function isLetter(char: string): boolean {
  return /^[a-zA-Z]$/.test(char)
}

function isAlphaNumeric(char: string): boolean {
  return /^[a-zA-Z0-9]$/.test(char)
}

export default function (props: {
  type?: string
  name: string
  label?: string
  placeholder?: string
  required?: boolean,
  mask?: string,
  class?: string
  onBlur?: (val: any) => void
  onChange?: (val: any) => void
}) {

  const handleInput = (e: Event) => {
    if (!props.mask) return
    const target = e.target as HTMLInputElement
    target.value = mask(target.value, props.mask)
    if (props.onChange) props.onChange(target.value)
  }

  const maxLength = props.mask?.length ?? undefined

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
      <TextField.Input type={props.type} name={props.name} placeholder={props.placeholder} class="textfield__input w-full" maxLength={maxLength} onInput={handleInput} onBlur={props.onBlur} />
      <ValidationMessage for={props.name}>
        {(messages) => <span class='validation-message'>{messages?.[0]}</span>}
      </ValidationMessage>
    </TextField.Root>
  )
}