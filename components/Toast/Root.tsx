import { Match, Switch } from 'solid-js/web'
import { Toast, toaster } from '@kobalte/core'

import { JSX } from 'solid-js/jsx-runtime'
import { VsChromeClose } from 'solid-icons/vs'

function show(payload: {
  id?: number
  title: string
  desc?: string
}) {
  return toaster.show(props => (
    <Toast.Root toastId={payload?.id ?? props.toastId} class="toast">
      <div class="toast__content">
        <div>
          <Toast.Title class="toast__title">{payload.title}</Toast.Title>
          <Toast.Description class="toast__description">{payload.desc}</Toast.Description>
        </div>
        <Toast.CloseButton class="toast__close-button">
          <VsChromeClose />
        </Toast.CloseButton>
        <Toast.ProgressTrack class="toast__progress-track">
          <Toast.ProgressFill class="toast__progress-fill" />
        </Toast.ProgressTrack>
      </div>
    </Toast.Root>
  ))
}

function success(message: string) {
  return toaster.show(props => (
    <Toast.Root toastId={props.toastId} class="toast toast--success">
      {message}
    </Toast.Root>
  ))
}

function error(message: string) {
  return toaster.show(props => (
    <Toast.Root toastId={props.toastId} class="toast toast--error">
      {message}
    </Toast.Root>
  ))
}

function promise<T, U>(
  promise: Promise<T> | (() => Promise<T>),
  options: {
    loading?: JSX.Element
    success?: (data: T) => JSX.Element
    error?: (error: U) => JSX.Element
  }
) {
  return toaster.promise(promise, (props: any) => (
    <Toast.Root
      toastId={props.toastId}
      classList={{
        toast: true,
        'toast-loading': props.state === 'pending',
        'toast-success': props.state === 'fulfilled',
        'toast-error': props.state === 'rejected',
      }}
    >
      <Switch>
        <Match when={props.state === 'pending'}>{options.loading}</Match>
        <Match when={props.state === 'fulfilled'}>{options.success?.(props.data)}</Match>
        <Match when={props.state === 'rejected'}>{options.error?.(props.error)}</Match>
      </Switch>
    </Toast.Root>
  ))
}

function custom(jsx: () => JSX.Element) {
  return toaster.show(props => <Toast.Root toastId={props.toastId}>{jsx()}</Toast.Root>)
}

function dismiss(id: number) {
  return toaster.dismiss(id)
}

export const toast = {
  show,
  success,
  error,
  promise,
  custom,
  dismiss,
}
