export default function (props: any) {
  let { class: className, contentClass, children, ...rest } = props
  className = `flex flex-col overflow-hidden ${className}`
  const contentStyles = `flex flex-col flex-grow h-0 overflow-auto  ${contentClass ?? ''}`

  return (
    <div class={className} {...rest}>
      <div class={contentStyles}>{children}</div>
    </div>
  )
}

