const FuncionariosDao = app_require('routes/v1/funcionarios/funcionarios.dao');

module.exports.install = (router) => {
    router.get('/funcionarios', getFuncionarios);
};

async function getFuncionarios(ctx, next) {
    ctx.validateQuery('numfunc')
        .optional()
        .isNumeric();
    ctx.validateQuery('cpf')
        .optional()
        .isNumeric();
    ctx.validateQuery('nome')
        .optional()
        .isAlpha();
    ctx.validateQuery('orderBy')
        .defaultTo('numero')
        .isIn(['numero', 'cpf', 'nome']);
    ctx.validateQuery('order')
        .defaultTo('asc')
        .isIn(['asc', 'desc']);

    const reqParams = ctx.request.query;

    if (!reqParams.numfunc && !reqParams.cpf && !reqParams.nome) {
        ctx.throw(400, 'Favor consultar com o numfunc, cpf ou nome.');
    }

    let queryParams = reqParams;
    let orderBy = ctx.vals.orderBy;
    let order = ctx.vals.order;

    const dao = new FuncionariosDao(ctx.db);
    ctx.body = await dao.findAll(queryParams, orderBy, order);
}
