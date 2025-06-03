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
            res.json({ success: true, rol: user.rol, nombre: user.nombre, id: user.id });

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

router.post("/comprar", async (req, res) => {
    const { usuario_id, producto_id, cantidad, total } = req.body;

    if (!usuario_id || !producto_id || !cantidad || !total) {
        return res.status(400).json({ success: false, message: "Datos de compra incompletos" });
    }

    try {
        // Verificar stock
        const [stockCheck] = await connection.execute(
            "SELECT stock FROM productos WHERE id = ?",
            [producto_id]
        );

        const stockActual = stockCheck[0]?.stock;

        if (stockActual === undefined) {
            return res.status(404).json({ success: false, message: "Producto no encontrado" });
        }

        if (stockActual < cantidad) {
            return res.status(400).json({ success: false, message: "Stock insuficiente" });
        }

        // Registrar compra
        await connection.execute(
            "INSERT INTO compras (usuario_id, producto_id, cantidad, total) VALUES (?, ?, ?, ?)",
            [usuario_id, producto_id, cantidad, total]
        );

        // Actualizar stock
        await connection.execute(
            "UPDATE productos SET stock = stock - ? WHERE id = ?",
            [cantidad, producto_id]
        );

        res.json({ success: true, message: "Compra registrada correctamente" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});


router.get("/mis-compras/:id", async (req, res) => {
    const usuarioId = req.params.id;

    try {
        const [rows] = await connection.execute(`
            SELECT 
                p.nombre AS producto,
                SUM(c.cantidad) AS cantidad,
                SUM(c.total) AS total,
                MAX(c.fecha) AS fecha
            FROM compras c
            JOIN productos p ON c.producto_id = p.id
            WHERE c.usuario_id = ?
            GROUP BY p.nombre
            ORDER BY fecha DESC
        `, [usuarioId]);

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});



export default router;