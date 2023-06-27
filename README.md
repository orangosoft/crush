# Crush

UI components for SolidJS. These components extend [Kobalte](https://kobalte.dev/) and [Felte](https://felte.dev/docs/solid/getting-started) for form validation.

This UI toolkit is designed to be used inside of a monorepo such as [Turborepo](https://turbo.build/repo). It is not designed to be used as a standalone package at this time. Include the repository as a submodule in your project's packages directory.

The toolkit address common UI patterns such as:

- Form validation
- Modals
- Toasts
- Styling

It is opinionated and designed to be used with [TailwindCSS](https://tailwindcss.com/).

This project is in early development and is not ready for production use.

## Dependencies

- [Kobalte](https://kobalte.dev/)
- [Felte](https://felte.dev/docs/solid/getting-started)
- [SolidJS](https://www.solidjs.com/)
- [Solid Icons](https://solid-icons.vercel.app/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)

## Installation

```sh
git submodule add git@github.com:orangosoft/crush.git packages/crush
```

```ts
import clickOutside from 'packages/crush/directives/clickOutside'

declare module 'solid-js/jsx-runtime' {
  namespace JSX {
    interface Directives {
      clickOutside: typeof clickOutside
    }
  }
}
```

This project is licensed under the MIT license. See the [LICENSE](LICENSE.md) file for more info.
