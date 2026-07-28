import express from 'express'
import cors from 'cors'
import leadsRouter from './routes/leads.js'

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use('/api/leads', leadsRouter)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`Lead health API running on http://localhost:${port}`)
})
