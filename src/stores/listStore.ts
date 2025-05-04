import type { SubjectData } from '@/components/subject/SubjectForm'
import type { CourseData } from '@/components/course/CourseForm'
import { atom } from 'nanostores'

export const isLoading = atom<boolean>(true)
export const subjects = atom<SubjectData[]>([])
export const courses = atom<CourseData[]>([])
