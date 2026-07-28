import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { fetchLeads } from './services/leads'
import type { Lead } from './types/lead'

function App() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [query, setQuery] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    void fetchLeads().then(setLeads).catch(() => setLeads([]))
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const filteredLeads = useMemo(() => {
    const search = query.trim().toLowerCase()

    return leads.filter((lead) => {
      if (!search) return true
      return [lead.name, lead.company, lead.title, lead.source, lead.reason]
        .join(' ')
        .toLowerCase()
        .includes(search)
    })
  }, [leads, query])

  const selectedLead = filteredLeads.find((lead) => lead.id === selectedId) ?? filteredLeads[0] ?? null

  useEffect(() => {
    if (!selectedLead && filteredLeads.length > 0) {
      setSelectedId(filteredLeads[0].id)
    }
  }, [filteredLeads, selectedLead])

  return (
    <main className="app-shell">
      <section className="header-bar">
        <div>
          <p className="eyebrow">AI Lead Health Score</p>
          <h1>Prioritize high-fit leads</h1>
        </div>
        <button type="button" className="theme-toggle" onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </section>

      <section className="toolbar">
        <input
          aria-label="Search leads"
          placeholder="Search by name, company, title, or source"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </section>

      <section className="content-grid">
        <aside className="lead-list">
          {filteredLeads.map((lead) => (
            <button
              key={lead.id}
              type="button"
              className={`lead-card ${selectedLead?.id === lead.id ? 'selected' : ''}`}
              onClick={() => setSelectedId(lead.id)}
            >
              <div className="lead-card__top">
                <strong>{lead.name}</strong>
                <span className="score-pill">{lead.score}</span>
              </div>
              <p>{lead.company}</p>
              <small>{lead.title}</small>
            </button>
          ))}
        </aside>

        <article className="lead-detail">
          {selectedLead ? (
            <>
              <p className="eyebrow">Selected lead</p>
              <h2>{selectedLead.name}</h2>
              <p>{selectedLead.company} • {selectedLead.title}</p>
              <div className="metric-row">
                <div>
                  <span className="metric-label">Score</span>
                  <strong>{selectedLead.score}</strong>
                </div>
                <div>
                  <span className="metric-label">Source</span>
                  <strong>{selectedLead.source}</strong>
                </div>
              </div>
              <div className="detail-card">
                <h3>Why this lead matters</h3>
                <p>{selectedLead.reason}</p>
              </div>
              <div className="detail-card">
                <h3>Recommended next action</h3>
                <p>{selectedLead.nextAction}</p>
              </div>
            </>
          ) : (
            <p>No matching leads found.</p>
          )}
        </article>
      </section>
    </main>
  )
}

export default App
