import type { SubjectData } from '@/components/Activity/ActivityList'
import { atom } from 'nanostores'

export const isLoading = atom<boolean>(true)
export const subjects = atom<SubjectData[]>([])
