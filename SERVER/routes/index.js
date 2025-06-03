import { Router } from "express";
import { connection } from "../db.js";

const router = Router();

router.post("/register", async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ success: false, message: "Campos incompletos" });
    }

    try {
        const [exist] = await connection.execute("SELECT * FROM usuarios WHERE email = ?", [email]);

        if (exist.length > 0) {
            return res.status(409).json({ success: false, message: "El correo ya está registrado" });
        }

        await connection.execute(
            "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, 'cliente')",
            [nombre, email, password]
        );

        res.json({ success: true, message: "Usuario registrado correctamente" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email y contraseña requeridos" });
    }

    try {
        const [rows] = await connection.execute(
            "SELECT * FROM usuarios WHERE email = ? AND password = ?",
            [email, password]
        );

        if (rows.length > 0) {
            const user = rows[0];
            res.json({ success: true, rol: user.rol, nombre: user.nombre });
        } else {
            res.status(401).json({ success: false, message: "Credenciales incorrectas" });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get("/productos", async (req, res) => {
    try {
        const [rows] = await connection.execute("SELECT * FROM productos");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;