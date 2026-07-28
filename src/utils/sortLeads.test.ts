import { describe, expect, it } from 'vitest'
import type { LeadRecord } from '../types/lead'
import { sortAndFilterLeads } from './sortLeads'

const leads: LeadRecord[] = [
  {
    leadId: 'lead-1',
    firstName: 'Maya',
    lastName: 'Nguyen',
    state: 'CA',
    age: 31,
    product: 'Home Insurance',
    leadSource: 'Website',
    createdDaysAgo: 2,
    lastContactDaysAgo: 1,
    callAttempts: 3,
    lastCallDurationSeconds: 180,
    answeredCall: true,
    emailOpened: true,
    emailClicks: 2,
    smsReplied: false,
    appointmentScheduled: false,
    quoted: false,
    annualIncome: 98000,
    creditRange: 'Excellent',
    notes: 'Interested in policy',
    score: 82,
    reasons: ['High engagement'],
    recommendedAction: 'Follow up',
  },
  {
    leadId: 'lead-2',
    firstName: 'Alex',
    lastName: 'Chen',
    state: 'TX',
    age: 29,
    product: 'Auto Insurance',
    leadSource: 'Referral',
    createdDaysAgo: 4,
    lastContactDaysAgo: 2,
    callAttempts: 2,
    lastCallDurationSeconds: 120,
    answeredCall: false,
    emailOpened: true,
    emailClicks: 1,
    smsReplied: true,
    appointmentScheduled: true,
    quoted: true,
    annualIncome: 112000,
    creditRange: 'Good',
    notes: 'Needs service',
    score: 91,
    reasons: ['Strong intent'],
    recommendedAction: 'Book meeting',
  },
  {
    leadId: 'lead-3',
    firstName: 'Jordan',
    lastName: 'Patel',
    state: 'WA',
    age: 36,
    product: 'Life Insurance',
    leadSource: 'Email',
    createdDaysAgo: 5,
    lastContactDaysAgo: 3,
    callAttempts: 4,
    lastCallDurationSeconds: 240,
    answeredCall: true,
    emailOpened: false,
    emailClicks: 0,
    smsReplied: false,
    appointmentScheduled: false,
    quoted: false,
    annualIncome: 76000,
    creditRange: 'Fair',
    notes: 'Looking for coverage',
    score: 88,
    reasons: ['Clear need'],
    recommendedAction: 'Send quote',
  },
]

describe('sortAndFilterLeads', () => {
  it('filters by search and sorts by score descending', () => {
    const result = sortAndFilterLeads(leads, 'e', 'score')

    expect(result.map((lead) => lead.leadId)).toEqual(['lead-2', 'lead-3', 'lead-1'])
  })

  it('sorts alphabetically by full name', () => {
    const result = sortAndFilterLeads(leads, '', 'alphabet')

    expect(result.map((lead) => `${lead.firstName} ${lead.lastName}`)).toEqual([
      'Alex Chen',
      'Jordan Patel',
      'Maya Nguyen',
    ])
  })
})
