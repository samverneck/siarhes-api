const check = app_require('validators');
const AuditoriaDao = app_require('routes/v1/auditoria/auditoria.dao');

// Retorna as alterações verificadas na auditoria, a partir de uma data.
module.exports.install = (router) => {
    router.get('/auditoria/funcionarios'     , getMiddleware('FUNCIONARIOS'));
    router.get('/auditoria/vinculos'         , getMiddleware('VINCULOS'));
    router.get('/auditoria/provimentos'      , getMiddleware('PROVIMENTOS_EV'));
    router.get('/auditoria/designacoes'      , getMiddleware('DESIGNACOES'));
    router.get('/auditoria/dependentes'      , getMiddleware('DEPENDENTES'));
    router.get('/auditoria/hist_depen'       , getMiddleware('HIST_DEPEN'));
    router.get('/auditoria/pastas_funcionais', getMiddleware('PASTAS_FUNCIONAIS'));
    router.get('/auditoria/formacoes'        , getMiddleware('FORMACOES'));
    router.get('/auditoria/capacitacoes'     , getMiddleware('CAPACITACOES'));
    router.get('/auditoria/lic_afast'        , getMiddleware('LIC_AFAST'));
    router.get('/auditoria/frequencias'      , getMiddleware('FREQUENCIAS'));
    router.get('/auditoria/ferias'           , getMiddleware('FERIAS'));
};

/**
 * Retorna o middleware que verifica a auditoria, de acordo com a tabela do parâmetro.
 */
function getMiddleware(tabela) {
    return async (ctx, next) => {
        ctx.validateQuery('data')
            .required('O parâmetro data é obrigatório.')
            .checkPred(v => check.dateFormat(v), 'Formato de data inválido.')
            .checkPred(v => check.dateLimit(v, 30), 'A data não pode ser inferior à 30 dias.');

        let queryParams = ctx.request.query;

        const dao = new AuditoriaDao(ctx.db);
        ctx.body = await dao.findAll(tabela, queryParams.data);
    };
}
