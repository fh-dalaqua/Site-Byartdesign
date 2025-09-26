// test-db.js
import pool from './byartdesign-cadeiras/assets/js/db.js';

async function testarConexao() {
    try {
        console.log('🧪 Iniciando teste de conexão...\n');
        
        // 1. Teste básico de conexão
        const connection = await pool.getConnection();
        console.log('✅ Conexão estabelecida com sucesso!');
        connection.release();

        // 2. Teste de query SQL
        console.log('📊 Executando query de teste...');
        const [result] = await pool.query('SELECT 1 + 1 AS resultado');
        console.log('✅ Query executada. Resultado:', result[0].resultado);

        // 3. Teste de data/hora do servidor
        const [timeResult] = await pool.query('SELECT NOW() AS data_hora');
        console.log('⏰ Data/hora do servidor:', timeResult[0].data_hora);

        // 4. Listar tabelas (se existirem)
        console.log('📋 Verificando tabelas...');
        const [tables] = await pool.query('SHOW TABLES');
        console.log('✅ Tabelas encontradas:', tables.length);
        
        if (tables.length > 0) {
            tables.forEach((table, index) => {
                console.log(`   ${index + 1}. ${Object.values(table)[0]}`);
            });
        }

        console.log('\n🎉 TODOS OS TESTES PASSARAM! Conexão funcionando perfeitamente!');
        return true;

    } catch (error) {
        console.error('\n❌ ERRO NA CONEXÃO:');
        console.error('Mensagem:', error.message);
        console.error('Código:', error.code);
        console.error('Stack:', error.stack);
        return false;
    } finally {
        // Fecha o pool (opcional para teste)
        await pool.end();
    }
}

// Executar o teste
testarConexao().then(success => {
    if (success) {
        console.log('\n✨ Banco de dados pronto para uso!!!');
    } else {
        console.log('\n💥 Verifique suas configurações no arquivo .env');
    }
});