const Database = require('../utils/database');

const db = new Database();

class PedidoModel{
    #id
    #nome
    #endereco
    #pao
    #hamburguer
    #queijo
    #acompanhamento

    constructor(id, nome, endereco, pao, hamburguer, queijo, acompanhamento) {
        this.#id = id;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#pao = pao;
        this.#hamburguer = hamburguer;
        this.#queijo = queijo;
        this.#acompanhamento = acompanhamento;
    }
    get id() {
        return this.#id;
    }
    set id(id) {
        this.#id = id
    }
    get nome() {
        return this.#nome;
    }
    set nome(nome) {
        this.#nome = nome;
    }
    get endereco() {
        return this.#endereco;
    }
    set endereco(endereco) {
        this.#endereco = endereco;
    }
    get pao() {
        return this.#pao;
    }
    set pao(pao) {
        this.#pao = pao;
    }
    get hamburguer() {
        return this.#hamburguer;
    }
    set hamburguer(hamburguer) {
        this.#hamburguer = hamburguer;
    }
    get queijo() {
        return this.#queijo;
    }
    set queijo(queijo) {
        this.#queijo = queijo;
    }
    get acompanhamento() {
        return this.#acompanhamento;
    }
    set acompanhamento(acompanhamento) {
        this.#acompanhamento = acompanhamento;
    }

    async listarPedido () {
        let sql = `select * from tb_pedido p
        inner join tb_pao pao on p.pao_id = pao.pao_id
        inner join tb_hamburguer ham on p.ham_id = ham.ham_id
        inner join tb_queijo que on p.que_id = que.que_id
        inner join tb_acompanhamento aco on p.aco_id = aco.aco_id`;

        let resultado = await db.ExecutaComando(sql);
        let listaPedido = [];
        for(let registro of resultado) {
            listaPedido.push(new PedidoModel(
                registro['ped_id'],
                registro['ped_nome'],
                registro['ped_endereco'],
                registro['pao_descricao'],
                registro['ham_descricao'],
                registro['que_descricao'],
                registro['aco_descricao']
            ));
        }
        return listaPedido;
    }

    async cadastrarPedido () {
        let sql = `insert into tb_pedido (ped_nome, ped_endereco, pao_id, ham_id, que_id, aco_id) values (?,?,?,?,?,?)`;
        let valores = [this.#nome, this.#endereco, this.#pao, this.#hamburguer, this.#queijo, this.#acompanhamento];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async obter (id) {
        let sql = `select * from tb_pedido where ped_id = ?`;
        let valores = [id];

        let row = await db.ExecutaComando(sql,valores);

        if(row.length > 0) {
            return new PedidoModel(    row[0]['ped_id'],
                                        row[0]['ped_nome'],
                                        row[0]['ped_endereco'],
                                        row[0]['pao_id'],
                                        row[0]['que_id'],
                                        row[0]['ham_id'],
                                        row[0]['aco_id']
        
            )
        }
        return null;
    }

    async excluir (id) {
        let sql = `delete from tb_pedido where ped_id = ?`;
        let valores = [id];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

}   

module.exports = PedidoModel;