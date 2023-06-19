import { Dialog } from '@kobalte/core'

export default function (props: { trigger?: any; children?: any }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{props.trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="dialog__overlay" />
        {props.children}
      </Dialog.Portal>
    </Dialog.Root>
  )
}
