import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  closestCenter,
  createSortable,
  useDragDropContext,
} from '@thisbeyond/solid-dnd'
import { For, Show, createSignal } from 'solid-js'

import { FiPlus } from 'solid-icons/fi'
import { IoClose } from 'solid-icons/io'
import Ring from '../../shared/Ring/Ring'
import styles from './Tabs.module.css'

export const Tabs = props => {
  const [items, setItems] = createSignal(props.items() || [])
  const [activeItem, setActiveItem] = createSignal(null)
  const [dragStyle, setDragStyle] = createSignal(null)
  const ids = () => items().map(item => item.id)

  const transformer = {
    id: 'constrain-y-axis',
    order: 100,
    callback: transform => ({ ...transform, y: 0 }),
  }

  const removeItem = item => {
    const newItems = items().filter(i => i.id !== item.id)
    setItems(newItems)
    props.onChange?.({ type: 'remove', items: newItems, item })
    if (item.active) {
      // if there is a next item, select it
      // if there is no next item, select the previous item
      // if there is no previous item, select the first item
      const index = newItems.findIndex(i => i.id === item.id)
      const nextItem = newItems[index + 1]
      const prevItem = newItems[index - 1]
      const firstItem = newItems[0]
      setActiveTab(nextItem?.id || prevItem?.id || firstItem?.id)
    }
  }

  const onDragStart = ({ draggable }) => {
    setActiveItem(items().find(item => item.id === draggable.id))
  }

  const onDragEnd = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const currentItems = ids()
      const fromIndex = currentItems.indexOf(draggable.id)
      const toIndex = currentItems.indexOf(droppable.id)
      if (fromIndex !== toIndex) {
        const updatedItems = items().slice()
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1))
        setItems(updatedItems)
        props.onChange?.({ type: 'sort', items: updatedItems, fromIndex, toIndex })
      }
    }
    setActiveItem(null)
  }

  const setActiveTab = id => {
    setItems(items().map(item => ({ ...item, active: item.id === id })))
    props.onChange?.({ type: 'select', item: items().find(item => item.id === id) })
  }

  const ConstrainDragAxis = () => {
    const [, { onDragStart, onDragEnd, addTransformer, removeTransformer }] = useDragDropContext()

    const transformer = {
      id: 'constrain-y-axis',
      order: 100,
      callback: transform => ({ ...transform, y: 0 }),
    }

    onDragStart(({ draggable }) => {
      // get the element that is being dragged
      // get the width of the element
      const width = draggable.node.offsetWidth
      setDragStyle({ width: `${width}px`, maxWidth: `${width}px` })
      addTransformer('draggables', draggable.id, transformer)
    })

    onDragEnd(({ draggable }) => {
      removeTransformer('draggables', draggable.id, transformer.id)
    })

    return <></>
  }

  const addItem = () => {
    const newItems = items().slice()
    const id = Math.random().toString(36).substr(2, 9)
    newItems.push({ id, name: `Tab ${newItems.length + 1}`, active: false })
    setItems(newItems)
    props.onChange?.({ type: 'add', items: newItems, item: newItems[newItems.length - 1] })
    setActiveTab(id)
  }

  const getFavIcon = url =>
    `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=128`

  const Tab = props => {
    const sortable = createSortable(props.item.id)

    return (
      <>
        <div
          use:sortable
          class={styles.Tab}
          classList={{ invisible: sortable.isActiveDraggable, [styles.TabActive]: props.item.active }}
          onMouseDown={() => setActiveTab(props.item.id)}
        >
          {/* Icon */}
          <div class={styles.TabIcon}>
            <img
              src={getFavIcon(props.item.url)}
              alt=""
            />
          </div>

          {/* Label */}
          <div class={styles.TabLabel}>{props.item.name}</div>

          {/* Close button */}
          <div class={styles.CloseButton}>
            <button
              class="flex items-center justify-center w-4 h-4 text-lg rounded-full hover:bg-white/10"
              onMouseDown={evt => evt.stopPropagation()}
              onClick={() => removeItem(props.item)}
            >
              <IoClose />
            </button>
          </div>
        </div>

        {/* Borderline */}
        <div class="flex items-center -mx-[1px]">
          <div class="mt-2 h-[18px] border-r border-neutral-700"></div>
        </div>
      </>
    )
  }

  return (
    <DragDropProvider onDragStart={onDragStart} onDragEnd={onDragEnd} collisionDetector={closestCenter}>
      <DragDropSensors />
      <ConstrainDragAxis />
      <div class={`flex items-end w-full h-full ${activeItem() ? styles.Dragging : ''}`}>
        <SortableProvider ids={ids()}>
          <For each={items()}>{item => <Tab item={item} />}</For>
          <div class="relative flex items-center justify-center px-2 pt-2 h-9">
            <button
              class="flex items-center justify-center w-6 h-6 duration-300 rounded-full hover:bg-neutral-700"
              onClick={addItem}
            >
              <FiPlus />
            </button>
          </div>
          {/* <div class={styles.DragBar}></div> */}
        </SortableProvider>
      </div>
      <DragOverlay>
        <div class={styles.DragTab} style={dragStyle()}>
          {/* Label */}
          <Show when={activeItem()}>
            {/* Icon */}
            <div class={styles.TabIcon}>
              <img
                src={getFavIcon(activeItem().url)}
                alt=""
              />
            </div>

            {/* Label */}
            <div class={styles.TabLabel}>{activeItem().name}</div>
          </Show>

          {/* Close button */}
          <div class={styles.CloseButton}>
            <button
              class="flex items-center justify-center w-4 h-4 text-lg rounded-full"
              onMouseDown={evt => evt.stopPropagation()}
              onMouseUp={() => removeItem(props.item)}
            >
              <IoClose />
            </button>
          </div>
        </div>
      </DragOverlay>
    </DragDropProvider>
  )
}

export default Tabs
