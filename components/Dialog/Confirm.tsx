import { Dialog } from '@kobalte/core'
import { VsChromeClose } from 'solid-icons/vs'

export default function (props: { title?: any; children?: any }) {
  return (
    <div class="dialog__positioner">
      <Dialog.Content class="dialog__content">
        <div class="dialog__header">
          <Dialog.Title class="dialog__title">{props.title}</Dialog.Title>
          <Dialog.CloseButton class="dialog__close-button">
            <VsChromeClose />
          </Dialog.CloseButton>
        </div>
        <Dialog.Description class="dialog__description">
          {props.children}
        </Dialog.Description>
      </Dialog.Content>
    </div>
  )
}
