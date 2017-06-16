const BaseDao = app_require('basedao');

module.exports = class EmpresasDao extends BaseDao {

    async findAll(queryParams, orderBy, order) {
        var query  = 'SELECT * FROM u_apisiarhes.empresas_vw WHERE 1=1';
        var params = {};

        if (queryParams.codigo) {
            query = query + ' AND codigo = :codigo';
            params.codigo = queryParams.codigo;
        }

        if (queryParams.nome) {
            query = query + ' AND nome LIKE UPPER(:nome)';
            params.nome = '%' + queryParams.nome.replace(/[ ]+/, '%') + '%';
        }

        if (queryParams.fantasia) {
            query = query + ' AND fantasia LIKE UPPER(:fantasia)';
            params.fantasia = '%' + queryParams.fantasia.replace(/[ ]+/, '%') + '%';
        }

        if (orderBy)
            query = query + ' ORDER BY ' + orderBy + ' ' + order;

        return await this.executeSelect(query, params);
    }

};
