const BaseDao = app_require('basedao');

module.exports = class DesignacoesDao extends BaseDao {

    async findAll(queryParams, orderBy, order) {
        var query  = 'SELECT * FROM u_apisiarhes.designacoes_vw WHERE 1=1';
        var params = {};

        if (queryParams.numfunc) {
            query = query + ' AND numfunc = :numfunc';
            params.numfunc = queryParams.numfunc;
        }

        if (queryParams.numvinc) {
            query = query + ' AND numvinc = :numvinc';
            params.numvinc = queryParams.numvinc;
        }

        if (queryParams.dtini_igual) {
            query = query + " AND dtini = TO_DATE(:dtini_igual, 'yyyy-mm-dd')";
            params.dtini_igual = queryParams.dtini_igual;
        }

        if (queryParams.dtini_maior) {
            query = query + " AND dtini >= TO_DATE(:dtini_maior, 'yyyy-mm-dd')";
            params.dtini_maior = queryParams.dtini_maior;
        }

        if (orderBy)
            query = query + ' ORDER BY ' + orderBy + ' ' + order;

        return await this.executeSelect(query, params);
    }

};
