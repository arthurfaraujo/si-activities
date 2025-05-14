import type { ActivityData } from '@/components/activity/ActivityForm'
import type { CourseData } from '@/components/course/CourseForm'
import type { SubjectData } from '@/components/subject/SubjectForm'
import type { Filters } from '@/stores/filtersStore'

export function filterActivities(
  filters: Filters,
  activities: ActivityData[],
  subjects: SubjectData[],
  courses: CourseData[]
) {
  return activities.filter(
    act =>
      (String(act.isActive) == filters.isActive || filters.isActive == 'any') &&
      (act.subjectId == Number(filters.subject) || filters.subject == 'any') &&
      (subjects.find(
        subject =>
          subject.courseName ===
          courses.find(course => course.id === Number(filters.course))?.name
      ) || filters.course == 'any')
  )
}
