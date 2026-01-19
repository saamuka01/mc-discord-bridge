import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const WEBHOOK = process.env.WEBHOOK;

app.post("/chat", async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) return res.sendStatus(400);

  await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: name,
      content: message
    })
  });

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor online");
});
