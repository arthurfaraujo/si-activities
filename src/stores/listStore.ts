import type { SubjectData } from '@/components/Subject/SubjectForm'
import type { CourseData } from '@/components/Course/CourseForm'
import { atom } from 'nanostores'

export const isLoading = atom<boolean>(true)
export const subjects = atom<SubjectData[]>([])
export const courses = atom<CourseData[]>([])
