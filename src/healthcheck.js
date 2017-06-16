module.exports.install = (router, koadb) => {
    router.get('/ping', koadb.middleware(), async function(ctx, next) {
        try {
            let result = await ctx.db.execute("SELECT 'pong' AS msg FROM DUAL");
            ctx.body = result.rows[0].MSG;
        } catch (error) {
            ctx.throw(400, 'Erro na conexão com o banco de dados.');
        }
    });
};
