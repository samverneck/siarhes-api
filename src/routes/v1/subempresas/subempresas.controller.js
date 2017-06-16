const SubempresaDao = app_require('routes/v1/subempresas/subempresas.dao');

module.exports.install = (router) => {
    router.get('/subempresas', getSubempresas);
};

async function getSubempresas(ctx, next) {
    ctx.validateQuery('empresa')
        .optional()
        .isNumeric();
    ctx.validateQuery('codigo')
        .optional()
        .isNumeric()
        .check(ctx.vals.empresa !== undefined, 'Favor informar também a empresa.');
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

    const dao = new SubempresaDao(ctx.db);
    ctx.body = await dao.findAll(queryParams, orderBy, order);
}
