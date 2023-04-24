import { onCleanup } from 'solid-js'

export default function clickOutside(el: any, accessor: any) {
  const onClick = (e: any) =>
    setTimeout(() => {
      !el.contains(e.target) && accessor()?.()
    }, 100)
  document.body.addEventListener('click', onClick, true)

  onCleanup(() => document.body.removeEventListener('click', onClick, true))
}
