import styles from './Container.module.css'

const Container = (props: any) => {
  let { class: className, contentClass, children } = props
  className = `flex flex-col overflow-hidden ${className}`
  const contentStyles = `flex flex-col flex-grow h-0 overflow-auto  ${contentClass ?? ''}`

  return (
    <div class={className}>
      <div class={contentStyles}>{children}</div>
    </div>
  )
}

export default Container
