import { TbArrowLeft, TbArrowRight, TbStar } from 'solid-icons/tb'

import { BiRegularHomeAlt2 } from 'solid-icons/bi'
import { BsLayoutSplit } from 'solid-icons/bs'
// import { FaSolidBookmark } from 'solid-icons/fa'
import { FiCopy } from 'solid-icons/fi'
import { IoReloadOutline } from 'solid-icons/io'
import Tooltip from 'ui/components/Tooltip/Tooltip'
import styles from './NavigationBar.module.css'

export default function NavigationBar(props: any) {
  const { title, url, onClick, children, ...rest } = props

  const emit = (type: string) => {
    if (onClick) onClick({ type, url })
  }

  return (
    <div class={styles.NavigationBar} {...rest}>
      <Tooltip class={styles.Tooltip} content="Navigate Back" placement="bottom">
        <button class={styles.NavigationButton} style="font-size: 24px;" onClick={() => emit('back')}>
          <TbArrowLeft />
        </button>
      </Tooltip>

      <Tooltip class={styles.Tooltip} content="Navigate Forward" placement="bottom">
        <button class={styles.NavigationButton} style="font-size: 24px;" onClick={() => emit('forward')}>
          <TbArrowRight />
        </button>
      </Tooltip>

      <Tooltip class={styles.Tooltip} content="Reload Page" placement="bottom">
        <button class={styles.NavigationButton} style="font-size: 18px;" onClick={() => emit('reload')}>
          <IoReloadOutline />
        </button>
      </Tooltip>

      <Tooltip class={styles.Tooltip} content="Home" placement="bottom">
        <button class={styles.NavigationButton} style="font-size: 18px;" onClick={() => emit('home')}>
          <BiRegularHomeAlt2 />
        </button>
      </Tooltip>

      <div class={styles.AddressBar}>
        <Tooltip class={styles.Tooltip} content="Copy Address" placement="bottom">
          <button class={styles.AddressBarButton} style="font-size: 14px;" onClick={() => emit('copy')}>
            <FiCopy />
          </button>
        </Tooltip>

        {/* URL */}
        <div class={styles.Url} onClick={() => emit('open')}>
          {/* <Tooltip class={styles.Tooltip} content="Open In Browser" placement="bottom"> */}
          <div class="overflow-hidden text-ellipsis">{url}</div>
          {/* </Tooltip> */}
        </div>

        <Tooltip class={styles.Tooltip} content="Bookmark" placement="bottom">
          <button class={styles.AddressBarButton} style="font-size: 14px;" onClick={() => emit('bookmark')}>
            <TbStar />
          </button>
        </Tooltip>
      </div>

      <Tooltip class={styles.Tooltip} content="Home" placement="bottom">
        <button class={styles.NavigationButton} style="font-size: 18px;" onClick={() => emit('splitview')}>
          <BsLayoutSplit />
        </button>
      </Tooltip>
    </div>
  )
}
