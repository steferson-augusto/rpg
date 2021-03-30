import { Assert as JapaAssert } from 'japa/build/src/Assert'

declare module 'japa/build/src/Assert' {
  export interface Assert extends JapaAssert {
    containSubset: (supertset: any, subset: any) => void
  }
}
