const BaseDao = app_require('basedao');

module.exports = class PublicacoesDao extends BaseDao{

    async findAll(pontpubl) {
        var query  = 'SELECT * FROM u_apisiarhes.publicacoes_vw WHERE pont = :pont ORDER BY datapubl DESC';
        var params = { pont: pontpubl };

        return await this.executeSelect(query, params);
    }

};
