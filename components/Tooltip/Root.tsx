import { Tooltip } from "@kobalte/core"

export default function (props: {
  children: any,
  text: string
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        {props.children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content class="tooltip__content">
          <Tooltip.Arrow />
          <p>{props.text}</p>
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}