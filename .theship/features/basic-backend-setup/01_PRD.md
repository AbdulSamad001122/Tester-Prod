# Basic Backend Setup PRD

## 1. Problem Statement
We need a lightweight Node.js/Express service that
1. Exposes a **GET `/health`** endpoint returning a minimal JSON response.
2. Starts on the port specified by `process.env.PORT` (defaulting to **5000**).
3. Establishes a connection to **MongoDB** using `process.env.MONGODB_URI`. No schema definition or route logic for the database is required at this stage.

The health‑check must _not_ verify the database connection; it should simply return a static payload.

---

## 2. Goals
- Register a **GET** route at **`/health`** that returns the JSON `{"status":"Ok"}`.
- Ensure the route responds with **HTTP status 200** and header `Content-Type: application/json`.
- Configure the server to listen on `process.env.PORT` with a fallback to **5000**.
- Initiate a MongoDB client connection using `process.env.MONGODB_URI` (no schema, no verification logic).
- The `/health` route must **not** have any middleware attached.

---

## 3. Non‑Goals
- Versioned routing or API namespaces.
- Any form of authentication, rate limiting, or compression.
- Logging or monitoring beyond a simple console message.
- Performing a health check against the MongoDB connection.
- Robust error handling for database downtime, timeouts, or missing environment variables.
- Unit or integration tests for the health endpoint.

---

## 4. User Stories
- **Developer**: I want a **GET `/health`** that immediately tells me the service is alive.
- **DevOps Engineer**: I need the service to listen on the correct port from `.env` without extra configuration.
- **Backend Engineer**: I want a MongoDB connection to be established at startup so later endpoints can use it.

---

## 5. Acceptance Criteria
| Condition | Expected Result |
|-----------|-----------------|
| **GET `/health`** | `200 OK`, JSON body `{"status":"Ok"}`, header `Content-Type: application/json` |
| **Non‑GET to `/health`** | `405 Method Not Allowed`, body `Method Not Allowed` |
| Server start | Listens on `PORT` env var or `5000` if unset |
| MongoDB client | Initialized with `MONGODB_URI` (error logged if unavailable) |
| `/health` route | No Express middleware applied |

---

## 6. Edge Cases
- **Missing `PORT`:** Server falls back to `5000`.
- **Missing `MONGODB_URI` or connection failure:** Log an error; start the HTTP server regardless.
- **Unknown HTTP method (OPTIONS, HEAD, etc.) to `/health`:** Respond with `405 Method Not Allowed`.
- **Body or query parameters on `/health`:** Ignored; response remains `{"status":"Ok"}`.

---

## 7. Success Metrics
- **Response time:** <100 ms for 99 % of `/health` calls under normal load.
- **Reachability:** `curl http://localhost:<port>/health` returns `200 OK` and the expected JSON.
- **Port visibility:** Service logs confirm the listening port on startup.
- **MongoDB connection:** Console logs indicate a successful connection when the URI is provided.

---

## 8. Implementation Sketch
```js
// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Health endpoint ---------------------------------------------------
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Ok' });
});

// Handle non‑GET methods to /health
app.all('/health', (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }
});

// --- MongoDB connection -------------------------------------------------
const mongoUri = process.env.MONGODB_URI;
if (mongoUri) {
  mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.warn('MONGODB_URI is not set; proceeding without DB connection');
}

// --- Start server -------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

---

## 9. Dependencies
- `express` – minimal web framework.
- `mongoose` – MongoDB ODM (required for the database connection).
- `dotenv` – to load environment variables.

---

## 10. Deliverables
- `server.js` (or `index.js`) with the code above.
- `.env.example` containing placeholders for `PORT` and `MONGODB_URI`.
- Basic `package.json` scripts: `npm run dev` to start with nodemon (optional).

---

## 11. Checklist
- [ ] Server starts on `PORT` or 5000.
- [ ] `/health` GET returns correct JSON.
- [ ] Non‑GET methods to `/health` return 405.
- [ ] MongoDB client attempts to connect with `MONGODB_URI`.
- [ ] No middleware attached to `/health`.
- [ ] README updated with quick instructions.

---

**End of PRD**