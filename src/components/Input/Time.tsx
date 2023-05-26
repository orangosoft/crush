import { BiSolidTimeFive } from 'solid-icons/bi'

export default function(props: { onChange: (value: number) => void }) {

  const onInput = (e: InputEvent) => {
    props?.onChange(Number((e.target as HTMLInputElement).value || 0))
  }

  return (
    <div class='relative flex-grow flex-shrink-0'>
      <input type="number" placeholder="Minutes reviewed" maxlength='3'
        class="textfield__input w-full pl-8" onInput={onInput} />
      <div class='absolute left-3 v-center'>
      <BiSolidTimeFive color='#666' />
      </div>
    </div>
  )
}