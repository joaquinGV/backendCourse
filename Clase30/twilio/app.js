import express from "express";
import twilio from "twilio";

const app = express();

const TWILIO_ACCOUNT_SID = "AC3940e625da50fc33cb5312f7acfb5eef";
const TWILIO_AUTH_TOKEN = "22f97d00feef91b6a96c639363d12082";
const TWILIO_PHONE_NUMBER = "+16086996865";

const client = twilio(
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER
);

app.get("/sms", async (req, res) => {
  await client.messages.create({
    from: TWILIO_PHONE_NUMBER,
    to: "+529612300605",
    body: "Este es un mensaje de prueba de SMS clase 55575",
  });

  res.send("SMS enviado");
});
app.get("/sms-custom", async (req, res) => {
  const { nombre, product } = req.query;

  await client.messages.create({
    from: TWILIO_PHONE_NUMBER,
    to: "+529612300605",
    body: `Gracias, ${nombre}, tu solicitud del producto ${product} ha sido aprobado`,
  });

  res.send("SMS enviado");
});

app.get("/whatsapp", async (req, res) => {
  const { nombre, product } = req.query;

  await client.messages.create({
    from: "whatsapp:+14155238886",
    to: "whatsapp:+529612300605",
    body: `Gracias, ${nombre}, tu solicitud del producto ${product} ha sido aprobado`,
  });

  res.send("Whatsapp enviado");
});

app.listen(8080);
