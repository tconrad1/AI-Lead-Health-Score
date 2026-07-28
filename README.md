# AI Lead Health Score

This MVP presents a simple lead-prioritization app. It loads the provided lead data from a CSV file, scores each lead using a lightweight rule-based model, and displays the reasoning behind the score along with a recommended next action for the sales representative.

I chose a rule-based approach because the dataset consists primarily of structured, mostly binary engagement signals with relatively uniform fields. This makes the scoring process transparent, easy to explain, and straightforward to extend with additional signals in the future.

## Prerequisites

- Node.js 20+
- npm

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
1. Ensure you are in the project folder (the folder this ReadMEis contained in)
   ```cd lead-health-app```
2. Install dependencies:
   ```npm install```
2. Start the API server:
   ```node server```
3. Start the frontend (in a different terminal):
   ```npm run dev```

The app will use the sample CSV in server/data/sample_leads.csv and expose lead scoring at /api/leads. 


