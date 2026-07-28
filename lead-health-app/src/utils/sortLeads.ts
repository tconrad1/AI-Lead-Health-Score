import type { LeadRecord } from '../types/lead'

export type LeadSortOption = 'score' | 'alphabet' | 'search'

function getSearchRelevance(lead: LeadRecord, search: string): number {
  if (!search) return 0

  const normalizedSearch = search.trim().toLowerCase()
  const haystack = [
    lead.firstName,
    lead.lastName,
    lead.product,
    lead.leadSource,
    lead.state,
    lead.recommendedAction,
    lead.notes,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  if (!haystack.includes(normalizedSearch)) {
    return -1
  }

  return haystack.split(normalizedSearch).length - 1
}

export function sortAndFilterLeads(
  leads: LeadRecord[],
  search: string,
  sortBy: LeadSortOption,
): LeadRecord[] {
  const normalizedSearch = search.trim().toLowerCase()

  const filtered = leads.filter((lead) => {
    if (!normalizedSearch) return true

    return getSearchRelevance(lead, normalizedSearch) >= 0
  })

  const sorted = [...filtered]

  if (sortBy === 'alphabet') {
    sorted.sort((a, b) => {
      const fullNameA = `${a.firstName} ${a.lastName}`.toLowerCase()
      const fullNameB = `${b.firstName} ${b.lastName}`.toLowerCase()
      return fullNameA.localeCompare(fullNameB)
    })
  } else if (sortBy === 'score') {
    sorted.sort((a, b) => b.score - a.score)
  } else {
    sorted.sort((a, b) => {
      const relevanceDelta = getSearchRelevance(b, normalizedSearch) - getSearchRelevance(a, normalizedSearch)

      if (relevanceDelta !== 0) {
        return relevanceDelta
      }

      const scoreDelta = b.score - a.score

      if (scoreDelta !== 0) {
        return scoreDelta
      }

      return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
    })
  }

  return sorted
}
