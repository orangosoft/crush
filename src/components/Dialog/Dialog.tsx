import { Show, createEffect, createSignal } from 'solid-js'

import { VsChromeClose } from 'solid-icons/vs'

export default function Dialog(props: {
  label?: string
  class?: string
  children?: any
  show: boolean
  modal?: boolean
  onAfterHide?: () => void
  footer?: any
}) {
  let backdrop: any
  const [show, setShow] = createSignal(props.show)
  const handleBackdropClick = (e: any) => {
    if (props.modal) return
    if (e.target === backdrop) {
      setShow(false)
    }
  }

  const windowClass = () => 'relative w-full max-w-2xl max-h-full shadow-xl ' + props.class ?? ''

  createEffect(() => {
    if (!show() && props?.onAfterHide) {
      props?.onAfterHide()
    }
  }, [show])

  createEffect(() => {
    setShow(props.show)
  }, [props.show])

  return (
    <Show when={show()}>
      <div
        ref={backdrop}
        tabindex="-1"
        class="fixed top-0 left-0 flex md:items-center justify-center w-full z-50 md:inset-0 h-full bg-black/20"
        onClick={handleBackdropClick}
      >
        <div class={windowClass()}>
          <div class="relative bg-white h-full md:h-auto md:rounded-lg dark:bg-gray-700">
            <Show when={props.label}>
              <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl text-gray-900 dark:text-white">{props.label}</h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShow(false)}
                >
                  <VsChromeClose class="w-4 h-4" />
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
            </Show>

            {props.children}

            <Show when={props.footer}>
              <div class="flex items-center p-6 border-t space-x-2 border-gray-200 rounded-b dark:border-gray-600">
                {props.footer}
              </div>
            </Show>
          </div>
        </div>
      </div>
    </Show>
  )
}
