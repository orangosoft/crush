export default function Spinner(props: { class?: string }) {
  const className = () => 'border-4 border-t-sky-500 border-gray-100 rounded-full animate-spin ' + props.class
  return (
    <div class={className()} />
  )
}
