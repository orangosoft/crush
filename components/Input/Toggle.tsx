import { Show } from 'solid-js'
import { Switch } from '@kobalte/core'

export default function (props: { rtl?:boolean, children?: any, checked?: boolean; onChange?: (checked: boolean) => void }) {
  return (
    <Switch.Root class="switch" checked={props.checked} onChange={props.onChange}>
      <Show when={props.rtl}><Switch.Label class="switch__label">{props.children}</Switch.Label></Show>
      <Switch.Input class="switch__input" />
      <Switch.Control class="switch__control">
        <Switch.Thumb class="switch__thumb" />
      </Switch.Control>
      <Show when={!props.rtl}><Switch.Label class="switch__label">{props.children}</Switch.Label></Show>
    </Switch.Root>
  )
}
