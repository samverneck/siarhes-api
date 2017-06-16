const BaseDao = app_require('basedao');

module.exports = class PastasFuncionaisDao extends BaseDao {

    async findAll(queryParams, orderBy, order) {
        var query  = 'SELECT * FROM u_apisiarhes.pastas_funcionais_vw WHERE 1=1';
        var params = {};

        if (queryParams.numfunc) {
            query = query + ' AND numfunc = :numfunc';
            params.numfunc = queryParams.numfunc;
        }

        if (queryParams.numvinc) {
            query = query + ' AND numvinc = :numvinc';
            params.numvinc = queryParams.numvinc;
        }

        if (queryParams.pagina) {
            query = query + ' AND pagina = :pagina';
            params.pagina = queryParams.pagina;
        }

        if (queryParams.assunto) {
            query = query + ' AND assunto = :assunto';
            params.assunto = queryParams.assunto;
        }

        if (orderBy)
            query = query + ' ORDER BY ' + orderBy + ' ' + order;

        return await this.executeSelect(query, params);
    }

};
