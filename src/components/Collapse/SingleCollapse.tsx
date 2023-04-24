import { Collapse } from 'solid-collapse'
import { TbChevronDown } from 'solid-icons/tb'
import { createSignal } from 'solid-js'
import styles from './SingleCollapse.module.css'

function SingleCollapse(props: { title: any; class?: string; children?: any; initialExpanded?: boolean }) {
  const [isExpanded, setIsExpanded] = createSignal(props.initialExpanded ?? false)

  return (
    <div class={`${props.class ?? ''}`}>
      <button
        class="flex items-center justify-between w-full hover:bg-gray-200 px-4"
        onClick={() => setIsExpanded(!isExpanded())}
      >
        <div class="text-xl py-4">{props.title}</div>
        <TbChevronDown class={`transition-all duration-200 ${isExpanded() ? 'rotate-180' : ''}`} />
      </button>
      <Collapse value={isExpanded()} class={styles.SingleCollapseTransistion}>
        {props.children}
      </Collapse>
    </div>
  )
}

export default SingleCollapse
