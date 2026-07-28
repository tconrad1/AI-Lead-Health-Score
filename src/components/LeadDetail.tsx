import type { LeadRecord } from '../types/lead'

interface LeadDetailProps {
  lead: LeadRecord
}

export function LeadDetail({ lead }: LeadDetailProps) {
  return (
    <section className="panel detail-panel">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Selected lead</p>
          <h2>{lead.firstName} {lead.lastName}</h2>
          <p className="muted">{lead.product} • {lead.leadSource}</p>
        </div>
        <div className="score-pill large">{lead.score}/100</div>
      </div>

      <div className="detail-grid">
        <div>
          <h3>Why this score</h3>
          <ul className="reason-list">
            {lead.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Recommended next action</h3>
          <p className="action-copy">{lead.recommendedAction}</p>
        </div>
      </div>

      <dl className="meta-list">
        <div>
          <dt>State</dt>
          <dd>{lead.state}</dd>
        </div>
        <div>
          <dt>Annual income</dt>
          <dd>${lead.annualIncome.toLocaleString()}</dd>
        </div>
        <div>
          <dt>Credit range</dt>
          <dd>{lead.creditRange}</dd>
        </div>
        <div>
          <dt>Notes</dt>
          <dd>{lead.notes}</dd>
        </div>
      </dl>
    </section>
  )
}
