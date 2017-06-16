const FormacoesDao = app_require('routes/v1/formacoes/formacoes.dao');

module.exports.install = (router) => {
    router.get('/formacoes', getFormacoes);
};

async function getFormacoes(ctx, next) {
    ctx.validateQuery('numfunc')
        .required()
        .isNumeric();
    ctx.validateQuery('orderBy')
        .defaultTo('cursoform')
        .isIn(['cursoform', 'habilitacao']);
    ctx.validateQuery('order')
        .defaultTo('asc')
        .isIn(['asc', 'desc']);
    
    let queryParams = ctx.request.query;
    let orderBy = ctx.vals.orderBy;
    let order = ctx.vals.order;

    const dao = new FormacoesDao(ctx.db);
    ctx.body = await dao.findAll(queryParams, orderBy, order);
}
