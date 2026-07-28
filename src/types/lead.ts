export interface LeadRecord {
  leadId: string
  firstName: string
  lastName: string
  state: string
  age: number
  product: string
  leadSource: string
  createdDaysAgo: number
  lastContactDaysAgo: number
  callAttempts: number
  lastCallDurationSeconds: number
  answeredCall: boolean
  emailOpened: boolean
  emailClicks: number
  smsReplied: boolean
  appointmentScheduled: boolean
  quoted: boolean
  annualIncome: number
  creditRange: string
  notes: string
  score: number
  reasons: string[]
  recommendedAction: string
}
