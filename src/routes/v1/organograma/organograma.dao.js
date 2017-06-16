const oracledb = require('oracledb');
const BaseDao = app_require('basedao');

module.exports = class EmpresasDao extends BaseDao {

    async buscaOrganograma(empresa, subempresa) {
        const query  = 'BEGIN :ret := U_APISIARHES.PCK_ORGANOGRAMA.BUSCA_ORGANOGRAMA(:empresa, :subempresa); END;';
        const params = { empresa: empresa, subempresa: subempresa, ret: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } };
        return await this.executeCursorFunction(query, params, 'ret');
    }

    async buscaSetor(empresa, setor) {
        const query  = 'BEGIN :ret := U_APISIARHES.PCK_ORGANOGRAMA.BUSCA_SETOR(:empresa, :setor); END;';
        const params = { empresa: empresa, setor: setor, ret: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } };
        return await this.executeCursorFunction(query, params, 'ret');
    }

    async buscaSetoresAcima(empresa, setor, subempresa) {
        const query  = 'BEGIN :ret := U_APISIARHES.PCK_ORGANOGRAMA.BUSCA_SETORES_ACIMA(:empresa, :setor, :subempresa); END;';
        const params = { empresa: empresa, setor: setor, subempresa: subempresa, ret: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } };
        return await this.executeCursorFunction(query, params, 'ret');
    }

    async buscaSetoresAbaixo(empresa, setor, subempresa) {
        const query  = 'BEGIN :ret := U_APISIARHES.PCK_ORGANOGRAMA.BUSCA_SETORES_ABAIXO(:empresa, :setor, :subempresa); END;';
        const params = { empresa: empresa, setor: setor, subempresa: subempresa, ret: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } };
        return await this.executeCursorFunction(query, params, 'ret');
    }

    async buscaServidores(empresa, setor) {
        const query  = 'BEGIN :ret := U_APISIARHES.PCK_ORGANOGRAMA.BUSCA_SERVIDORES(:empresa, :setor); END;';
        const params = { empresa: empresa, setor: setor, ret: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } };
        return await this.executeCursorFunction(query, params, 'ret');
    }

    async buscaGestorSetor(empresa, setor) {
        const query  = 'BEGIN :ret := U_APISIARHES.PCK_ORGANOGRAMA.BUSCA_GESTOR_SETOR(:empresa, :setor); END;';
        const params = { empresa: empresa, setor: setor, ret: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } };
        return await this.executeCursorFunction(query, params, 'ret');
    }

};
