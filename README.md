# Crush

UI components


```ts
import clickOutside from 'packages/crush/directives/clickOutside'

declare module 'solid-js/jsx-runtime' {
  namespace JSX {
    interface Directives {
      model: [() => any, (v: any) => any]
      clickOutside: typeof clickOutside
    }
  }
}
```