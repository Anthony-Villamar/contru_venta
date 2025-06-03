import mysql from "mysql2/promise";
import { dbConfig } from "./config.js";

export const connection = await mysql.createConnection(dbConfig);
console.log("Conexion exitosa a la base de datos");