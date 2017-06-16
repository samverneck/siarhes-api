const BaseDao = app_require('basedao');

module.exports = class FormacoesDao extends BaseDao {

    async findAll(queryParams, orderBy, order) {
        var query  = 'SELECT * FROM u_apisiarhes.formacoes_vw WHERE 1=1';
        var params = {};

        if (queryParams.numfunc) {
            query = query + ' AND numfunc = :numfunc';
            params.numfunc = queryParams.numfunc;
        }

        if (queryParams.curso) {
            query = query + ' AND cursoform = :curso';
            params.curso = queryParams.curso;
        }

        if (queryParams.modalidade) {
            query = query + ' AND habilitacao = :modalidade';
            params.modalidade = queryParams.modalidade;
        }

        if (orderBy)
            query = query + ' ORDER BY ' + orderBy + ' ' + order;

        return await this.executeSelect(query, params);
    }

};
