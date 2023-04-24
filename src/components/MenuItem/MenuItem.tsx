export default function MenuItem(props: { class?: string; children?: any; onClick?: (e?: any) => void }) {
  const handleClick = (ev: any) => {
    ev.preventDefault()
    props.onClick?.(ev)
  }
  return (
    <button
      class={`flex items-center gap-2 px-4 py-2 w-full text-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-slate-800 ${props.class ?? ''}}`}
      onClick={handleClick}
    >
      {props.children}
    </button>
  )
}
