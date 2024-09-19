import type { ActivityData } from "@/components/Activity/ActivityList";
import type { Filters } from "@/stores/filtersStore";

export function filterActivities(filters: Filters, activities: ActivityData[]) {
  return activities.filter((act) => (
    (String(act.isActive) == filters.isActive || filters.isActive == "any") && (act.subject == filters.subject || filters.subject == "any")
  ))
}