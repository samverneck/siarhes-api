const BaseDao = app_require('basedao');

module.exports = class VinculosDao extends BaseDao {

    async findAll(queryParams, orderBy, order) {
        var query  = 'SELECT * FROM u_apisiarhes.vinculos_vw WHERE 1=1';
        var params = {};

        if (queryParams.situacao) {
            query = query + ' AND situacao = :situacao';
            params.situacao = queryParams.situacao;
        }

        if (queryParams.numfunc) {
            query = query + ' AND numfunc = :numfunc';
            params.numfunc = queryParams.numfunc;
        }

        if (queryParams.numvinc) {
            query = query + ' AND numero = :numvinc';
            params.numvinc = queryParams.numvinc;
        }

        if (orderBy)
            query = query + ' ORDER BY ' + orderBy + ' ' + order;

        return await this.executeSelect(query, params);
    }

};
