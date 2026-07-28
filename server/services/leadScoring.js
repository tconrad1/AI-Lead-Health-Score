import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const csvPath = path.join(__dirname, '..', 'data', 'sample_leads.csv')

function toBoolean(value) {
  return String(value).trim().toUpperCase() === 'TRUE'
}

function toNumber(value) {
  return Number(value)
}

function parseCsv(content) {
  const rows = content.trim().split(/\r?\n/)
  const headers = rows[0].split(',')

  return rows.slice(1).filter(Boolean).map((row) => {
    const values = row.split(',')
    const record = {}

    headers.forEach((header, index) => {
      const value = values[index] ?? ''
      if (['age', 'createdDaysAgo', 'lastContactDaysAgo', 'callAttempts', 'lastCallDurationSeconds', 'emailClicks', 'annualIncome'].includes(header)) {
        record[header] = toNumber(value)
      } else if (['answeredCall', 'emailOpened', 'smsReplied', 'appointmentScheduled', 'quoted'].includes(header)) {
        record[header] = toBoolean(value)
      } else {
        record[header] = value.trim()
      }
    })

    return record
  })
}

function getActionForScore(score, lead) {
  if (score >= 80) {
    return 'Schedule a closing conversation and send a tailored proposal this week.'
  }

  if (score >= 65) {
    return 'Send a focused follow-up and confirm the next meeting while momentum is strong.'
  }

  if (score >= 45) {
    return 'Re-engage with a personalized outreach sequence and validate the prospect’s goals.'
  }

  if (lead.appointmentScheduled) {
    return 'Nurture the lead with a value-based follow-up before the appointment is missed.'
  }

  return 'Refresh the outreach approach and try a new channel to re-open the conversation.'
}

function scoreLead(lead) {
  let score = 50
  const positives = []
  const negatives = []

  if (lead.createdDaysAgo <= 3) {
    score += 12
    positives.push('The lead was created recently, which usually indicates fresh intent.')
  } else if (lead.createdDaysAgo > 21) {
    score -= 10
    negatives.push('The lead has been sitting for a while without fresh momentum.')
  }

  if (lead.lastContactDaysAgo <= 2) {
    score += 10
    positives.push('The rep had a recent touchpoint, so the prospect is still warm.')
  } else if (lead.lastContactDaysAgo > 14) {
    score -= 12
    negatives.push('The lead has gone quiet for more than two weeks.')
  }

  if (lead.lastCallDurationSeconds >= 300) {
    score += 8
    positives.push('Longer calls usually indicate stronger engagement and intent.')
  }

  if (lead.callAttempts >= 6) {
    score -= 8
    negatives.push('Repeated unsuccessful calls can signal fatigue or low urgency.')
  }

  if (lead.answeredCall) {
    score += 4
    positives.push('The prospect answered calls, which is a positive signal of receptivity.')
  }

  if (lead.emailOpened || lead.emailClicks > 0 || lead.smsReplied) {
    score += 7
    positives.push('Email and text engagement suggests the lead is actively paying attention.')
  } else if (lead.lastContactDaysAgo > 7) {
    score -= 8
    negatives.push('There is little evidence of digital engagement from the prospect.')
  }

  if (lead.appointmentScheduled) {
    score += 10
    positives.push('An appointment is already on the calendar, which improves conversion odds.')
  }

  if (lead.quoted) {
    score += 8
    positives.push('A quote has already been shared, showing the lead is progressing.')
  }

  if (lead.leadSource.toLowerCase() === 'referral') {
    score += 6
    positives.push('The lead came from a referral, which is typically a higher trust source.')
  }

  score = Math.max(0, Math.min(100, score))

  const reasons = []
  for (const item of positives) {
    if (reasons.length < 3) {
      reasons.push(item)
    }
  }

  for (const item of negatives) {
    if (reasons.length < 3) {
      reasons.push(item)
    }
  }

  if (reasons.length < 2) {
    reasons.push('This lead needs a personalized follow-up to build momentum.')
  }

  return {
    score,
    reasons: reasons.slice(0, 3),
    recommendedAction: getActionForScore(score, lead),
  }
}

export function getScoredLeads() {
  const content = fs.readFileSync(csvPath, 'utf8')
  return parseCsv(content).map((lead) => ({
    ...lead,
    ...scoreLead(lead),
  }))
}
