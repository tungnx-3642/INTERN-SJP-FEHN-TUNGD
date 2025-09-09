require("dotenv").config();
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.db = router.db;

app.use(middlewares);

app.use(auth);

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

app.post("/send-mail", async (req, res) => {
  const { to } = req.body;

  try {
    const token = jwt.sign({ email: to }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const activationLink = `http://localhost:3000/activate?token=${token}`;


    await transporter.sendMail({
      from: '"Wine horse" <no-reply@myapp.com>',
      to,
      subject: "Activate your account",
      text: `Click to activate: ${activationLink}`,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/activate", async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = app.db.get("users").find({ email: decoded.email }).value();
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    app.db.get("users")
      .find({ email: decoded.email })
      .assign({ isActive: true })
      .write();

    res.json({ success: true, message: "Account activated!" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
});

app.use(router);

app.listen(3001, () => {
  console.log("JSON Server with mail running at http://localhost:3001");
});
