# AI Lead Health Score MVP

This MVP presents a simple lead prioritization experience for the exercise brief. It loads sample lead data from the server, scores each lead using a lightweight rule-based approach, and shows the reasoning plus a tailored next action for the selected lead.

## Structure

- Frontend: src/
  - App.tsx: main dashboard shell
  - components/: reusable UI panels
  - services/: API client
  - types/: shared lead data types
- Server: server/
  - index.js: Express API entry point
  - routes/: lead endpoints
  - services/: CSV parsing and scoring logic
  - data/: sample CSV input

## Run locally

1. Install dependencies:
   npm install
2. Start the API server:
   node server/index.js
3. Start the frontend:
   npm run dev

The app will use the sample CSV in server/data/sample_leads.csv and expose lead scoring at /api/leads.

