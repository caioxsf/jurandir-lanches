const Database = require('../utils/database');
const db = new Database();

class AcompanhamentoModel {

    #id
    #desc

    constructor(id,desc) {
        this.#id = id;
        this.#desc = desc;
    }

    get id () {
        return this.#id;
    }
    set id (value) {
        this.#id = value;
    }

    get desc () {
        return this.#desc;
    }
    set desc (value) {
        this.#desc = value;
    }
    
    async listarAcompanhamento () {
        let sql = `select * from tb_acompanhamento`;
        let lista = [];
        let colunas = await db.ExecutaComando(sql);
        for(let i=0;i<colunas.length;i++) {
            let coluna = colunas[i];
            lista.push(new AcompanhamentoModel(coluna['aco_id'],coluna['aco_descricao']));
        }
        return lista;
    }
}

module.exports = AcompanhamentoModel; 