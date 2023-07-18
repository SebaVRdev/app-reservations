import dotenv from 'dotenv';
dotenv.config();

export const development = {
    username: process.env.USERNAME_DB || 'root',
    password: process.env.PASSWORD_DB || 'seba123',
    database: process.env.DATABASE_DB || 'sebadb',
    host    : process.env.HOST_DB || 'localhost',
    dialect : process.env.DIALECT_DB || 'mysql',
};