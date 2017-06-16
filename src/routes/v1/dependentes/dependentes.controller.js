const DependentesDao = app_require('routes/v1/dependentes/dependentes.dao');

module.exports.install = (router) => {
    router.get('/dependentes', getDependentes);
};

async function getDependentes(ctx, next) {
    ctx.validateQuery('numfunc')
        .required()
        .isNumeric();
    ctx.validateQuery('numdep')
        .optional()
        .isNumeric();
    ctx.validateQuery('orderBy')
        .defaultTo('numero')
        .isIn(['numero']);
    ctx.validateQuery('order')
        .defaultTo('asc')
        .isIn(['asc', 'desc']);

    let queryParams = ctx.request.query;
    let orderBy = ctx.vals.orderBy;
    let order = ctx.vals.order;

    const dao = new DependentesDao(ctx.db);
    ctx.body = await dao.findAll(queryParams, orderBy, order);
}
