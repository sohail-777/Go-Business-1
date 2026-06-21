
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { metrics, serviceSummary, referral, referrals } = require("./data");

const app = express();
const PORT = process.env.PORT || 5005;

const JWT_SECRET = "go-business-secret-key";

const TEST_EMAIL = "admin@example.com";
const TEST_PASSWORD = "admin123";

app.use(cors());
app.use(express.json());


app.post("/api/auth/signin", (req, res) => {
  const { email, password } = req.body || {};

  if (email === TEST_EMAIL && password === TEST_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).json({
      data: { token }
    });
  }

  return res.status(401).json({
    message: "Invalid email or password"
  });
});


function requireAuth(req, res, next) {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }
}


app.get("/api/referrals", requireAuth, (req, res) => {
  const { id, search, q, sort } = req.query;

  
  if (id !== undefined) {
    const row = referrals.find((r) => String(r.id) === String(id));
    if (!row) {
      return res.status(404).json({ message: "Referral not found" });
    }
    return res.status(200).json({
      success: true,
      data: row
    });
  }

  let result = [...referrals];

  const term = (search || q || "").trim().toLowerCase();
  if (term) {
    result = result.filter(
      (r) =>
        r.name.toLowerCase().includes(term) ||
        r.serviceName.toLowerCase().includes(term)
    );
  }

  const sortOrder = sort === "asc" ? "asc" : "desc";
  result.sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return sortOrder === "asc" ? da - db : db - da;
  });

  return res.status(200).json({
    success: true,
    data: {
      metrics,
      serviceSummary,
      referral,
      referrals: result
    }
  });
});


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Go Business backend running on http://localhost:${PORT}`);
});
