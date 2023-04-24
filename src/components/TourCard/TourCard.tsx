import { Show, createSignal, onMount } from 'solid-js'
import { arrow, autoUpdate, computePosition, flip, hide, inline, offset, shift } from '@floating-ui/dom'

import styles from './TourCard.module.css'

type Props = {
  attachId?: string
  title?: string
  children?: any
  actions?: any
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
}

export default function TourCard(props: Props) {
  let arrowEl: any
  let floatingEl: any
  const [attachEl, setAttachEl] = createSignal<HTMLElement>()

  const updatePosition = () => {
    const arrowLen = arrowEl.offsetWidth
    const floatingOffset = Math.sqrt(2 * arrowLen ** 2) / 2

    computePosition(attachEl()!, floatingEl, {
      middleware: [
        offset(floatingOffset + 4),
        flip(),
        inline(),
        shift(),
        hide(),
        arrow({
          element: arrowEl,
          padding: 10,
        }),
      ],
      placement: props.placement || 'left',
      strategy: 'absolute',
    }).then(({ x, y, middlewareData, placement }) => {
      const { referenceHidden } = middlewareData.hide as any

      Object.assign(floatingEl.style, {
        visibility: referenceHidden ? 'hidden' : 'visible',
        left: `${x}px`,
        top: `${y}px`,
      })
      const side = placement.split('-')[0]

      const staticSide: string =
        {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[side] || ''

      if (middlewareData.arrow) {
        const arrowData = middlewareData.arrow
        Object.assign(arrowEl.style, {
          right: '',
          bottom: '',
          top: '',
          left: x != null ? `${arrowData.x}px` : '',
          // Ensure the static side gets unset when
          // flipping to other placements' axes.
          [staticSide]: `${-arrowLen / 2}px`,
          transform: 'rotate(45deg)',
        })
      }
    })
  }

  onMount(() => {
    const attach = document.getElementById(props.attachId || '')
    if (!attach) return
    setAttachEl(attach)
    // set location after a little time has passed, I have seen some weird behavior without this
    setTimeout(() => {
      if (!attachEl()) return
      autoUpdate(attachEl()!, floatingEl, updatePosition)
      Object.assign(floatingEl.style, {
        visibility: 'visible',
      })
    })
  })

  return (
    <div ref={floatingEl} class={styles.TourContainer}>
      <div class={styles.TourContent}>
        <Show when={props?.title}>
          <h3 class={styles.TourTitle}>{props?.title}</h3>
        </Show>
        <Show when={props?.children}>{props?.children}</Show>

        <Show when={props?.actions}>{props?.actions}</Show>
      </div>
      <div ref={arrowEl} class={styles.TourArrow}></div>
    </div>
  )
}
