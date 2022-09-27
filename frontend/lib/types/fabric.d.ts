import type { fabric } from 'fabric'

declare module 'fabric' {
    namespace fabric {
        export interface Object {
            id: string
            typeIndex: number
        }
    }
}
