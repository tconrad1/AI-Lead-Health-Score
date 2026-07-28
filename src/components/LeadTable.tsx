import type { LeadRecord } from '../types/lead'
import type { LeadSortOption } from '../utils/sortLeads'

interface LeadTableProps {
  leads: LeadRecord[]
  selectedLeadId: string | null
  onSelectLead: (leadId: string) => void
  search: string
  sortBy: LeadSortOption
  onSearchChange: (value: string) => void
  onSortChange: (value: LeadSortOption) => void
}

export function LeadTable({
  leads,
  selectedLeadId,
  onSelectLead,
  search,
  sortBy,
  onSearchChange,
  onSortChange,
}: LeadTableProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Lead queue</p>
          <h2>Prioritize outreach</h2>
        </div>
        <span className="badge">{leads.length} leads</span>
      </div>

      <div className="toolbar">
        <label className="toolbar-field">
          <span className="toolbar-label">Search</span>
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search leads"
          />
        </label>

        <label className="toolbar-field">
          <span className="toolbar-label">Sort by</span>
          <select value={sortBy} onChange={(event) => onSortChange(event.target.value as LeadSortOption)}>
            <option value="score">Score</option>
            <option value="alphabet">Alphabet</option>
            <option value="search">Search relevance</option>
          </select>
        </label>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Lead</th>
              <th>Product</th>
              <th>Score</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.leadId}
                className={selectedLeadId === lead.leadId ? 'selected' : ''}
                onClick={() => onSelectLead(lead.leadId)}
              >
                <td>
                  <strong>{lead.firstName} {lead.lastName}</strong>
                  <div className="muted">{lead.state} • {lead.age} yrs</div>
                </td>
                <td>{lead.product}</td>
                <td>
                  <span className="score-pill">{lead.score}</span>
                </td>
                <td>{lead.leadSource}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
