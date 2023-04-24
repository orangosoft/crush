import { Motion, Presence } from "@motionone/solid"

import { Show } from "solid-js"

export default function Reveal(props: { children: any, when?: any, start?: any, end?: any, exit?: boolean, transition?: any }) {

  const start = () => props.start || { opacity: 0, y: 10 }
  const none = () => { }
  const end = () => props.end || { opacity: 1, y: 0 }
  const transition = () => Object.assign({ duration: 0.15, easing: "ease-out" }, props.transition || {})
  const exit = () => props.exit === false ? none() : start()

  return (
    <Presence exitBeforeEnter>
      <Show when={props.when}>
        <Motion.div
          initial={start()}
          animate={end()}
          exit={exit()}
          transition={transition()}
        >
          {props.children}
        </Motion.div>
      </Show>
    </Presence>
  )
}