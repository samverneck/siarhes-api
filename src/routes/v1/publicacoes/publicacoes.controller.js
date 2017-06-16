const PublicacoesDao = app_require('routes/v1/publicacoes/publicacoes.dao');

module.exports.install = (router) => {
    router.get('/publicacoes', getPublicacoes);
};

async function getPublicacoes(ctx, next) {
    ctx.validateQuery('pontpubl')
        .required()
        .isNumeric();
    
    const dao = new PublicacoesDao(ctx.db);
    ctx.body = await dao.findAll(ctx.request.query.pontpubl);
}
