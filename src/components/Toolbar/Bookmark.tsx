import styles from './Bookmark.module.css'

export default function Bookmark(props: any) {
  const onBookmarkClick = () => {
    // console.log('onBookmarkClick', props)
    // return only title, url, and pinned from props
    props?.onClick({ title: props.title, url: props.url, pinned: props.pinned })
  }

  const onBookmarkPinClick = (evt: any) => {
    evt.stopPropagation()
    // console.log('onBookmarkPinClick', props)
    if (props?.onPinClick) props.onPinClick({ title: props.title, url: props.url, pinned: props.pinned })
    else console.warn('Bookmark.jsx: onPinClick is not defined')
  }

  return (
    <div class={styles.Bookmark} onClick={onBookmarkClick}>
      {props.title}
      {/* <Tooltip class={styles.Tooltip} content="Unpin" placement="bottom">
        <div
          class="rounded-full hover:bg-neutral-800 flex items-center justify-center w-5 h-5"
          onClick={onBookmarkPinClick}
        >
          <sl-icon name="pin"></sl-icon>
        </div>
      </Tooltip> */}
    </div>
  )
}
