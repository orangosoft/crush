import { Button, TextField } from "@kobalte/core"

import { Show } from "solid-js"
import { TbSearch } from "solid-icons/tb"
import { VsChromeClose } from "solid-icons/vs"

export default function (props: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <TextField.Root class='textfield' value={props.value} onChange={props.onChange}>
      <TextField.Input class="textfield__input w-full px-8" placeholder="Search" />
      <div class='absolute v-center left-3'>
        <TbSearch />
      </div>
      <Show when={props.value.length > 0}>
        <Button.Root class='button__plain button-small absolute v-center right-2' onClick={() => props.onChange('')}>
          <VsChromeClose size={18} />
        </Button.Root>
      </Show>
    </TextField.Root>
  )
}