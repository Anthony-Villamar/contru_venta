import dotenv from 'dotenv';
dotenv.config();

export const Puerto = process.env.PORT || 3000;
export const PuertoFrontend = process.env.PORT_BACKEND || 3001;
export const PuertoSERVER2 = process.env.PORT_FRONTEND || 3002;

export const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'construccion'
};