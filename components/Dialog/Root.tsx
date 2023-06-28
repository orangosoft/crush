import { Dialog } from '@kobalte/core'

export default function (props: { defaultOpen?: boolean; trigger?: any; children?: any; class?: string }) {
  return (
    <Dialog.Root defaultOpen={props.defaultOpen}>
      <Dialog.Trigger class={props.class ?? ''}>{props.trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="dialog__overlay" />
        {props.children}
      </Dialog.Portal>
    </Dialog.Root>
  )
}
