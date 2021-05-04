import { MouseEvent } from 'react'

export interface ItemData {
  id: number
  storageId: number
  label: string
  weight: number
  quantity: number
  order: number
}

export interface StorageData {
  id: number
  label: string
  verify: boolean
  order: number
  items: ItemData[]
}

export type OpenMenu = (
  event: MouseEvent<HTMLElement>,
  data: ItemData | StorageData,
  type?: 'item' | 'storage'
) => void
