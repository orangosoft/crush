export default function Menu(props: { children?: any; class?: string }) {
  return (
    <div class={`bg-white dark:bg-slate-800 border rounded-md drop-shadow-md ${props.class || ''}`}>
      {props.children}
    </div>
  )
}
