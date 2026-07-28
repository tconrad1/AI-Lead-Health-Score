# AI Lead Health Score MVP

This MVP presents a simple lead prioritization experience for the exercise. It loads the sample lead data from the server, scores each lead using a lightweight rule-based approach, and shows the reasoning plus a tailored next action for the selected lead. Built with node and vite.

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
1. Ensure you are in the project folder
   cd lead-health-app
2. Install dependencies:
   npm install
2. Start the API server:
   node server
3. Start the frontend (in a different terminal):
   npm run dev

The app will use the sample CSV in server/data/sample_leads.csv and expose lead scoring at /api/leads. 


