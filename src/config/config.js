import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'puerto del servidor', 8080)
    .option('--mode <mode>', 'modo de ejecucion', 'development')
program.parse();

console.log("Execution mode: ", program.opts().mode);


const environment = program.opts().mode;

dotenv.config({
    path: environment ==="production"?"../src/config/.env.production":"../src/config/.env.development"
});

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
};