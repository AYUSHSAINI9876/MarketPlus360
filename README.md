# MarketPlus360
MarketPlus360 is a comprehensive full‑stack market analytics platform. It provides users with real‑time market data, visual dashboards, and an intuitive web interface to gain insights and make data‑driven decisions.
Tech Stack:

*Frontend->

1)Likely built with React (or Vue/Angular)
2)State management (Redux/Vuex or Context API)
3)HTTP client (Axios / Fetch)

*Backend->

1)Node.js + Express.js
2)RESTful API endpoints
3)Database (MongoDB, PostgreSQL, or MySQL)

*Dashboard->
1)Possibly embedded in frontend with admin role routing
2)Data visualization libs (Chart.js, D3.js, Recharts)

Running the Project->

Backend->
cd backend
npm run dev
npm start

Frontend->
cd frontend
npm run dev

Dashboard->
cd dashboard
npm run dev

#Running Tests->
cd backend && npm test
cd frontend && npm test
cd dashboard && npm test

#Deployment->
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm","start"]

