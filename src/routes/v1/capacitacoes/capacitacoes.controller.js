const CapacitacoesDao = app_require('routes/v1/capacitacoes/capacitacoes.dao');

module.exports.install = (router) => {
    router.get('/capacitacoes', getCapacitacoes);
};

async function getCapacitacoes(ctx, next) {
    ctx.validateQuery('numfunc')
        .required()
        .isNumeric();
    ctx.validateQuery('orderBy')
        .defaultTo('curso')
        .isIn(['curso']);
    ctx.validateQuery('order')
        .defaultTo('asc')
        .isIn(['asc', 'desc']);

    let queryParams = ctx.request.query;
    let orderBy = ctx.vals.orderBy;
    let order = ctx.vals.order;

    const dao = new CapacitacoesDao(ctx.db);
    ctx.body = await dao.findAll(queryParams, orderBy, order);
}
