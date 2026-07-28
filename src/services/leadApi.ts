import type { LeadRecord } from '../types/lead'

export async function fetchLeads(): Promise<LeadRecord[]> {
  const response = await fetch('/api/leads')

  if (!response.ok) {
    throw new Error('Unable to load lead data right now.')
  }

  return response.json()
}
