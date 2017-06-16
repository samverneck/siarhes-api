const VinculosDao = app_require('routes/v1/vinculos/vinculos.dao');

module.exports.install = (router) => {
    router.get('/vinculos', getVinculos);
};

async function getVinculos(ctx, next) {
    ctx.validateQuery('situacao')
        .optional()
        .isIn(['ATIVO', 'INATIVO', 'FALECIDO', 'DESLIGADO', 'PENSIONISTA'], `Situação inválida: ${ctx.vals.situacao}`);    
    ctx.validateQuery('numfunc')
        .optional()
        .isNumeric();
    ctx.validateQuery('numvinc')
        .optional()
        .isNumeric();
    ctx.validateQuery('orderBy')
        .defaultTo('numfunc')
        .isIn(['numfunc', 'numero', 'dtexerc']);    
    ctx.validateQuery('order')
        .defaultTo('asc')
        .isIn(['asc', 'desc']);

    let queryParams = ctx.request.query;
    let orderBy = ctx.vals.orderBy;
    let order = ctx.vals.order;

    if (ctx.token.scope.includes('siarhes_admin')) {
        if (!queryParams.numfunc && (!queryParams.empresa || !queryParams.subempresa))
            ctx.throw(400, 'Somente possível acessar vínculos usando numfunc, numfunc/numvinc ou empresa/subempresa.');
    }

    const dao = new VinculosDao(ctx.db);
    ctx.body = await dao.findAll(queryParams, orderBy, order);
}
