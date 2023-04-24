import { Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import { autoUpdate, computePosition, flip, hide, inline, offset, shift } from '@floating-ui/dom'

import clickOutside from '../../directives/click-outside'

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      clickOutside: () => void
    }
  }
}


export default function Dropdown(props: {
  hoist?: boolean
  offset?: number
  placement?:
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  show?: boolean
  trigger: any
  children: any
  class?: string
}) {
  false && clickOutside // this makes it so the complier does not delete the import for the directive (solidjs docs)
  let floatingEl: any
  let referenceEl: any
  let rootRef: any
  const [show, setShow] = createSignal(props.show)
  const [cleanup, setCleanup] = createSignal<() => void>()
  const updatePosition = () => {
    computePosition(referenceEl, floatingEl, {
      middleware: [offset(props.offset || 0), inline(), shift({ padding: 5 }), flip(), hide()],
      placement: props.placement || 'bottom',
      strategy: props.hoist ? 'fixed' : 'absolute',
    }).then(({ x, y, middlewareData }) => {
      const hideData = middlewareData.hide
      Object.assign(floatingEl.style, {
        left: `${x}px`,
        top: `${y}px`,
        visibility: hideData?.referenceHidden ? 'hidden' : 'visible',
      })
    })
  }
  createEffect(() => {
    setShow(props.show)
  })

  const open = (e: any) => {
    if (!show()) setShow(true)
  }

  const close = (e: any) => {
    if (show()) setShow(false)
  }

  onMount(() => {
    setCleanup(() => autoUpdate(referenceEl, floatingEl, updatePosition))
    updatePosition()
    // rootRef.addEventListener('click', close)
  })

  onCleanup(() => {
    // rootRef.removeEventListener('click', close)
    cleanup()?.()
  })

  const onKeyDown = (e: any) => {
    if (e.key === 'Escape') {
      setShow(false)
    }
  }

  createEffect(() => {
    if (show()) {
      window.addEventListener('keydown', onKeyDown)
    } else {
      window.removeEventListener('keydown', onKeyDown)
    }
  })

  return (
    <div ref={rootRef} class={`relative group inline-block ${props.class || ''}`} use:clickOutside={() => setShow(false)}>
      <div ref={referenceEl} onClick={open}>
        {props.trigger}
      </div>
      <div
        id="dropdown"
        ref={floatingEl}
        class="z-[9999] w-max top-0 left-0 transition-all duration-100 transform origin-top-right"
        classList={{
          fixed: props.hoist,
          absolute: !props.hoist,
          'scale-0 opacity-0': !show(),
          'scale-100 opacity-100': show(),
        }}
        onClick={close}
      >
        <Show when={show()}>
          {props.children}
        </Show>
      </div>
    </div>
  )
}
