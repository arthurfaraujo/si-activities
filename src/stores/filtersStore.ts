import { atom } from 'nanostores'

export interface Filters {
  isActive: string
  subject: string
}

export const filters = atom<Filters>({isActive: "any", subject: "any"})  
