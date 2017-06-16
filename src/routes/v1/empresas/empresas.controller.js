const EmpresasDao = app_require('routes/v1/empresas/empresas.dao');

module.exports.install = (router) => {
    router.get('/empresas', getEmpresas);
};

async function getEmpresas(ctx, next) {
    ctx.validateQuery('codigo')
        .optional()
        .isNumeric();
    ctx.validateQuery('nome')
        .optional()
        .isString();
    ctx.validateQuery('fantasia')
        .optional()
        .isString();
    ctx.validateQuery('orderBy')
        .defaultTo('nome')
        .isIn(['codigo', 'nome']);
    ctx.validateQuery('order')
        .defaultTo('asc')
        .isIn(['asc', 'desc']);

    let queryParams = ctx.request.query;
    let orderBy = ctx.vals.orderBy;
    let order = ctx.vals.order;

    const dao = new EmpresasDao(ctx.db);
    ctx.body = await dao.findAll(queryParams, orderBy, order);
}
