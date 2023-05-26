import clickOutside from './src/directives/clickOutside'

declare module 'solid-js/jsx-runtime' {
  namespace JSX {
    interface Directives {
      model: [() => any, (v: any) => any]
      clickOutside: typeof clickOutside
    }
  }
}
