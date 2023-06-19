import { Dialog } from '@kobalte/core'

export default function (props: { children?: any; class?: string, onClick?: any }) {
  return <Dialog.CloseButton class={props.class} onClick={props.onClick}>{props.children}</Dialog.CloseButton>
}
