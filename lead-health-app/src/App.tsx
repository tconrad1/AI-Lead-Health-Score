import { useEffect, useMemo, useState } from 'react'
import { LeadDetail } from './components/LeadDetail'
import { LeadTable } from './components/LeadTable'
import { fetchLeads } from './services/leadApi'
import type { LeadRecord } from './types/lead'
import './App.css'

function App() {
  const [leads, setLeads] = useState<LeadRecord[]>([])
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    fetchLeads()
      .then((data) => {
        if (isMounted) {
          setLeads(data)
          setSelectedLeadId(data[0]?.leadId ?? null)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'A problem occurred while loading leads.')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const selectedLead = useMemo(
    () => leads.find((lead) => lead.leadId === selectedLeadId) ?? null,
    [leads, selectedLeadId],
  )

  return (
    <main className="app-shell">
      <header className="hero-card">
        <div>
          <p className="eyebrow">AI Lead Health Score</p>
          <h1>Turn lead activity into a clear next-best action.</h1>
          <p className="hero-copy">
            Review the leads in the queue, inspect their health score, and understand why each one is moving or stalling.
          </p>
        </div>
      </header>

      {error ? (
        <section className="panel error-panel">
          <h2>Unable to load lead data</h2>
          <p>{error}</p>
        </section>
      ) : (
        <div className="content-grid">
          <LeadTable
            leads={leads}
            selectedLeadId={selectedLeadId}
            onSelectLead={setSelectedLeadId}
          />

          {selectedLead ? <LeadDetail lead={selectedLead} /> : null}
        </div>
      )}
    </main>
  )
}

export default App
