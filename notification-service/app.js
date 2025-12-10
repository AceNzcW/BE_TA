import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

app.get("/", (req, res) => {
    res.send("Notificarion service is running 🚀");
});

app.post("/notify", async (req, res) => {
    const {doctorEmail, appointment_date} = req.body;

    if (!doctorEmail || !appointment_date) {
        return res.status(400).json({ error: "doctor email dan appointment wajib disi"});
    }

    try{
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: doctorEmail,
            subject: "Notifikasi Temu",
            text: `Anda memiliki booking baru pada tanggal ${appointment_date}`
        });
        res.json({message: "email berhasil dikirim ke dokter"});
    }catch (err) {
        console.error("email error:", err);
        res.status(500).json({error: "Gagal mengirim email"});
    }
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`notification service running on port ${PORT}`);
});