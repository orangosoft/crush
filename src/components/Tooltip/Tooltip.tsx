import { autoUpdate, computePosition, flip, inline, offset, shift } from '@floating-ui/dom'
import { createSignal, onCleanup, onMount } from 'solid-js'

import clickOutside from '../../directives/click-outside'
import styles from './Tooltip.module.css'

export default function Tooltip(props: {
  content?: any
  hoist?: boolean
  class?: string
  delay?: number
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
  children: any
}) {
  false && clickOutside
  let floatingEl: any
  let referenceEl: any
  const [cleanupUpdate, setCleanupUpdate] = createSignal<() => void>()
  const [delay, setDelay] = createSignal<any>()

  const getTooltipStyles = () => {
    if (props.hoist) return styles.TooltipFixed
    else return styles.TooltipAbsolute
  }
  const hideToolTip = (ev: any) => {
    // hide until next hover
    if (delay()) clearTimeout(delay())
    Object.assign(floatingEl.style, {
      visibility: 'hidden',
    })
  }
  const showToolTip = (ev: any) => {
    // show until next hover
    updatePosition()
    if (delay()) clearTimeout(delay())
    if (props.content) {
      setDelay(
        setTimeout(() => {
          Object.assign(floatingEl.style, {
            visibility: 'visible',
          })
        }, (props.delay || 0.5) * 1000)
      )
    }
  }
  const updatePosition = () => {
    computePosition(referenceEl, floatingEl, {
      middleware: [offset(6), inline(), shift({ padding: 5 }), flip()],
      placement: props.placement || 'top',
      strategy: props.hoist ? 'fixed' : 'absolute',
    }).then(({ x, y }) => {
      Object.assign(floatingEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      })
    })
  }
  onMount(() => {
    // set location after a little time has passed, I have seen some weird behavior without this on some tooltip locations
    setTimeout(() => {
      setCleanupUpdate(() => autoUpdate(referenceEl, floatingEl, updatePosition))
      Object.assign(floatingEl.style, {
        visibility: 'hidden',
      })
    }, 500)
  })
  onCleanup(() => {
    cleanupUpdate()?.()
    if (delay()) clearTimeout(delay())
  })
  return (
    <div class={styles.Tootip} onmouseenter={ev => showToolTip(ev)} onmouseleave={ev => hideToolTip(ev)}>
      <div ref={referenceEl} aria-describeby="tooltip">
        {props.children}
      </div>
      <div
        ref={floatingEl}
        use:clickOutside={(ev: any) => hideToolTip(ev)}
        class={getTooltipStyles()}
        role="tooltip"
        style="visibility:hidden;"
      >
        {props.content}
      </div>
    </div>
  )
}
