import { Show } from 'solid-js'
import clickOutside from '../../directives/click-outside'

export default function Drawer(props: {
  placement?: 'left' | 'right' | 'top' | 'bottom'
  backdrop?: boolean
  class?: string
  children: any
  persistent?: boolean
  show?: boolean
  setShow: (val: boolean) => void
}) {
  false && clickOutside
  const handleClickOutside = () => {
    if (!props.persistent) props.setShow(false)
  }
  let classes = 'fixed z-[9999] h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800'
  if (props.placement === 'left') {
    classes += ' -translate-x-full w-80 border-r'
  } else if (props.placement === 'right') {
    classes += ' translate-x-full w-80 border-l'
  } else if (props.placement === 'top') {
    classes += ' -translate-y-full w-full max-h-80 border-b'
  } else if (props.placement === 'bottom') {
    classes += ' translate-y-full max-h-80 w-full border-t'
  }
  if (props.class) {
    classes += ' ' + props.class
  }
  return (
    <>
      <div
        id="drawer-navigation"
        use:clickOutside={() => handleClickOutside()}
        class={classes}
        classList={{
          'top-0 left-0': props.placement === 'left' || props.placement === 'top',
          'top-0 right-0': props.placement === 'right',
          'bottom-0 left-0': props.placement === 'bottom',
          'translate-x-0 translate-y-0': props.show,
        }}
        tabindex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        {props.children}
      </div>
      <Show when={props.backdrop && props.show}>
        <div class="fixed inset-0 z-[9998] bg-black/40"></div>
      </Show>
    </>
  )
}
