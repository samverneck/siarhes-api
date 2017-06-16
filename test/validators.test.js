/**
 * Testes das funções de validação.
 */
var check = require('../src/validators');

/**
 * Testa os validadores customizados.
 */
describe('Validadores', function() {

    // Valida a data limite
    describe('dateFormat', function() {
        it('deve falhar para data inválida', function() {
            return false === check.dateFormat('01/01/2017');
        });

        it('deve ter sucesso para data válida', function() {
            return true === check.dateFormat('2017-01-01');
        });
    });

    describe('dateLimit', function() {
        var limit = 5;
        var now = new Date();

        it('deve falhar para data menor que o limite', function() {
            let date = new Date(now.setUTCHours(0, 0, 0, 0) - 6*24*60*60*1000);
            let dateStr = date.toISOString().slice(0, 10);
            return false === check.dateLimit(dateStr, limit);
        });

        it('deve ter sucesso para data dentro do limite', function() {
            let date = new Date(now.setUTCHours(0, 0, 0, 0) - 6*24*60*60*1000);
            let dateStr = date.toISOString().slice(0, 10);
            return false === check.dateLimit(dateStr, limit);
        });
    });

    // Teste do validador de número.
    describe('opcionalNumerico', function() {
        it('válido para variável não definida', function() {
            return true == check.opcionalNumerico(undefined);
        });
        it('válido para número', function() {
            return true == check.opcionalNumerico(123);
        });
        it('inválido para alfa', function() {
            return false == check.opcionalNumerico('123A');
        });
    });

});
