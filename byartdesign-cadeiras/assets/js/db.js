// db.js
import mysql from 'mysql2/promise';
import 'dotenv/config'; // Forma mais moderna do dotenv

const connectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Criar pool de conexões 
const pool = mysql.createPool(connectionConfig);

// Função para testar a conexão
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexão com o banco estabelecida com sucesso!');
        connection.release(); // Libera a conexão de volta para o pool
        return true;
    } catch (error) {
        console.error('❌ Erro na conexão com o banco:', error.message);
        return false;
    }
}

// Testar a conexão automaticamente ao carregar o arquivo
testConnection();

export default pool;