import type { SubjectData } from '@/components/Activity/ActivityList'
import { atom } from 'nanostores'
import { API_URL } from '@/const'

export const isLoading = atom<boolean>(true)
export const subjects = atom<SubjectData[]>(await (await fetch(API_URL + '/subjects')).json())
