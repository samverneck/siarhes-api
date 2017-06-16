const OrganogramaDAO = app_require('routes/v1/organograma/organograma.dao');

module.exports.install = (router) => {
    router.get('/organograma'                 , getOrganograma);
    router.get('/organograma/setores'         , getSetores);
    router.get('/organograma/setor/servidores', getServidores);
    router.get('/organograma/setor/gestor'    , getGestorSetor);
};

/**
 * Retorna toda a estrutura organizacional de uma subempresa.
 */
async function getOrganograma(ctx, next) {
    ctx.validateQuery('empresa')
        .optional()
        .isNumeric();
    ctx.validateQuery('subempresa')
        .optional()
        .isNumeric();

    if (!ctx.vals.empresa)
        ctx.vals.empresa = 0;

    if (!ctx.vals.subempresa)
        ctx.vals.subempresa = 0;

    const dao = new OrganogramaDAO(ctx.db);
    ctx.body = await dao.buscaOrganograma(ctx.vals.empresa, ctx.vals.subempresa);
}

/**
 * Retorna o próprio setor, ou os setores acima ou abaixo dele.
 */
async function getSetores(ctx, next) {
    ctx.validateQuery('empresa')
        .required()
        .isNumeric();
    ctx.validateQuery('setor')
        .required()
        .isString();
    ctx.validateQuery('subempresa')
        .optional()
        .isNumeric();
    ctx.validateQuery('nivel')
        .optional()
        .isString()
        .isIn(['acima', 'abaixo']);
    
    if (!ctx.vals.subempresa)
        ctx.vals.subempresa = 0;

    const dao = new OrganogramaDAO(ctx.db);
    if (!ctx.vals.nivel) {
        ctx.body = await dao.buscaSetor(ctx.vals.empresa, ctx.vals.setor);
    } else if (ctx.vals.nivel === 'abaixo') {
        ctx.body = await dao.buscaSetoresAbaixo(ctx.vals.empresa, ctx.vals.setor, ctx.vals.subempresa);
    } else {
        ctx.body = await dao.buscaSetoresAcima(ctx.vals.empresa, ctx.vals.setor, ctx.vals.subempresa);
    }
}

/**
 * Retorna os servidores lotados em um setor.
 */
async function getServidores(ctx, next) {
    ctx.validateQuery('empresa')
        .required()
        .isNumeric();
    ctx.validateQuery('setor')
        .required()
        .isString();
    
    const dao = new OrganogramaDAO(ctx.db);
    ctx.body = await dao.buscaServidores(ctx.vals.empresa, ctx.vals.setor);
}

/**
 * Retorna o gestor de um determinado setor.
 */
async function getGestorSetor(ctx, next) {
    ctx.validateQuery('empresa')
        .required()
        .isNumeric();
    ctx.validateQuery('setor')
        .required()
        .isString();
    
    const dao = new OrganogramaDAO(ctx.db);
    ctx.body = await dao.buscaGestorSetor(ctx.vals.empresa, ctx.vals.setor);
}
