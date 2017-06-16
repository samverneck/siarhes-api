const check = app_require('validators');
const HistDepenDao = app_require('routes/v1/hist_depen/hist_depen.dao');

module.exports.install = (router) => {
    router.get('/hist_depen', getHistDepen);
};

async function getHistDepen(ctx, next) {
    ctx.validateQuery('numfunc')
        .required()
        .isNumeric();
    ctx.validateQuery('numdep')
        .required()
        .isNumeric();
    ctx.validateQuery('dtini_igual')
        .optional()
        .checkPred(v => check.dateFormat(v), 'Formato de data inválido.');
    ctx.validateQuery('dtini_maior')
        .optional()
        .checkPred(v => check.dateFormat(v), 'Formato de data inválido.');
    ctx.validateQuery('orderBy')
        .defaultTo('dtini')
        .isIn(['dtini']);
    ctx.validateQuery('order')
        .defaultTo('desc')
        .isIn(['asc', 'desc']);

    let queryParams = ctx.request.query;
    let orderBy = ctx.vals.orderBy;
    let order = ctx.vals.order;

    const dao = new HistDepenDao(ctx.db);
    ctx.body = await dao.findAll(queryParams, orderBy, order);
}
