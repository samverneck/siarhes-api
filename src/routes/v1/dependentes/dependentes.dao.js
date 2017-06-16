const BaseDao = app_require('basedao');

module.exports = class DependentesDao extends BaseDao {

    async findAll(queryParams, orderBy, order) {
        var query  = 'SELECT * FROM u_apisiarhes.dependentes_vw WHERE 1=1';
        var params = {};

        if (queryParams.numfunc) {
            query = query + ' AND numfunc = :numfunc';
            params.numfunc = queryParams.numfunc;
        }

        if (queryParams.numdep) {
            query = query + ' AND numero = :numdep';
            params.numdep = queryParams.numdep;
        }

        if (orderBy)
            query = query + ' ORDER BY ' + orderBy + ' ' + order;

        return await this.executeSelect(query, params);
    }

};
