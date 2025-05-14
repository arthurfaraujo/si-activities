import { atom } from 'nanostores'

export interface Filters {
  isActive: string
  subject: string
  course: string
}

export type FilterOption = "isActive" | "subject" | "course"

export const filters = atom<Filters>({isActive: "any", subject: "any", course: "any"})
