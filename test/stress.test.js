/**
 * Testes de stress contra a API.
 */
var agent = require('supertest');
var app = require('../src/app');

describe('Stress', function() {

    var server;
    var requests = 5000; // Nº de requisições para teste.

    // Usa o client como se fosse acesso cidadão para testar.
    app.context.token = {
        scope: ['siarhes_admin']
    };

    before(function(done) {
        let port = 3001;
        server = app.listen(port, () => {
            console.log('Testes iniciados na porta %s.', port);
            done();
        });
    });

    after(function() {
        server.close();
    });

    // Só gera os testes se tiver a env setada.
    if ((process.env.STRESS_TEST || '0') !== '1') {
        console.log('Env STRESS_TEST != 1, ignorando teste de stress.');
        return;
    }

    for (let i = 0; i < requests; i++) {
        it('stress contra /ac/servidor #' + i, function(done) {
            agent(server)
                .get('/ac/servidor')
                .query({ cpf: 96985771734 })
                .expect(200, done);
        });
    }

    for (let i = 0; i < requests; i++) {
        it('stress contra /v1/vinculos #' + i, function(done) {
            agent(server)
                .get('/v1/vinculos')
                .query({ numfunc: 273720, numvinc: 2 })
                .expect(200, done);
        });
    }

});
