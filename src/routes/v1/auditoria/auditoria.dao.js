const BaseDao = app_require('basedao');

module.exports = class AuditoriaDao extends BaseDao {

    async findAll(tabela, data) {
        let query  = `
            SELECT datahora, numfunc, numvinc, operacao
              FROM u_apisiarhes.auditoria_vw
             WHERE tabela = :tabela AND datahora >= TO_DATE(:dtref, 'yyyy-mm-dd')
             ORDER BY datahora DESC
        `;
        let params = { tabela: tabela, dtref: data };

        return await this.executeSelect(query, params);
    }

};
