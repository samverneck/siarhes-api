const check = app_require('validators');
const FeriasDao = app_require('routes/v1/ferias/ferias.dao');

module.exports.install = (router) => {
    router.get('/ferias', getFerias);
};

async function getFerias(ctx, next) {
    ctx.validateQuery('numfunc')
        .required()
        .isNumeric();
    ctx.validateQuery('numvinc')
        .required()
        .isNumeric();
    ctx.validateQuery('dtini_igual')
        .optional()
        .checkPred(v => check.dateFormat(v), 'Formato de data inválido.');
    ctx.validateQuery('dtini_maior')
        .optional()
        .checkPred(v => check.dateFormat(v), 'Formato de data inválido.');
    ctx.validateQuery('orderBy')
        .defaultTo('dtini').isIn(['dtini']);
    ctx.validateQuery('order')
        .defaultTo('desc').isIn(['asc', 'desc']);

    let queryParams = ctx.request.query;
    let orderBy = ctx.vals.orderBy;
    let order = ctx.vals.order;

    const dao = new FeriasDao(ctx.db);
    ctx.body = await dao.findAll(queryParams, orderBy, order);
}
