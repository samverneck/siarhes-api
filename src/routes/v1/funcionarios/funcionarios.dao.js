const BaseDao = app_require('basedao');

module.exports = class FuncionariosDao extends BaseDao {

    async findAll(queryParams, orderBy, order) {
        var query  = 'SELECT * FROM u_apisiarhes.funcionarios_vw WHERE 1=1';
        var params = {};

        if (queryParams.numfunc) {
            query = query + ' AND numero = :numfunc';
            params.numfunc = queryParams.numfunc;
        }

        if (queryParams.cpf) {
            query = query + ' AND cpf = :cpf';
            params.cpf = queryParams.cpf;
        }

        if (queryParams.nome) {
            query = query + ' AND nome LIKE UPPER(:nome)';
            params.nome = '%' + queryParams.nome.replace(/[ ]+/, '%') + '%';
        }

        if (orderBy)
            query = query + ' ORDER BY ' + orderBy + ' ' + order;

        return await this.executeSelect(query, params);
    }

};
