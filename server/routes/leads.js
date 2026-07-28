import express from 'express'
import { getScoredLeads } from '../services/leadScoring.js'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json(getScoredLeads())
})

export default router
