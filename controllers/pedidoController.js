const AcompanhamentoModel = require("../models/AcompanhamentoModel");
const HamburguerModel = require("../models/HamburguerModel");
const PaoModel = require("../models/PaoModel");
const PedidoModel = require("../models/PedidoModel");
const QueijoModel = require("../models/QueijoModel");


class PedidoController {

    async listagemView(req, res) {
        let listaPedidos = new PedidoModel();
        listaPedidos = await listaPedidos.listarPedido();

        res.render('Pedido/listagem.ejs', {pedidos: listaPedidos});
    }

    async fazerPedidoView (req,res) {
        let paoSelect = new PaoModel();
        paoSelect = await paoSelect.listarPao();

        let hambSelect = new HamburguerModel();
        hambSelect = await hambSelect.listarHamburguer();

        let queijoSelect = new QueijoModel();
        queijoSelect = await queijoSelect.listarQueijo();

        let acompSelect = new AcompanhamentoModel();
        acompSelect = await acompSelect.listarAcompanhamento();

        res.render('Pedido/fazer.ejs', {layout: false, pao: paoSelect, hamb: hambSelect, queijo: queijoSelect, acomp: acompSelect});
    }

    async fazerPedido (req,res) {
        let ok;

        if(req.body.nome) {
            let pedido = new PedidoModel();
            pedido.nome = req.body.nome;
            pedido.endereco = req.body.endereco;
            pedido.pao = req.body.pao;
            pedido.queijo = req.body.queijo;
            pedido.hamburguer = req.body.hamburguer;
            pedido.acompanhamento = req.body.acompanhamento;
            
            let resultado = await pedido.cadastrarPedido();

            if(resultado) {
                res.send({ok: true, msg: 'Pedido realizado com sucesso!'});
            }
            else {
                res.send({ok: false, msg: 'Erro ao realizar o pedido'});
            }
        }
        else {
            res.send({ok: false, msg: 'Parametros incorretos'});
        }
    }

    async adminView (req,res) {
        let listaPedidos = new PedidoModel();
        listaPedidos = await listaPedidos.listarPedido();

        res.render('Pedido/admin.ejs', {layout: false, pedidos: listaPedidos});
    }

    async excluir (req,res) {
        let id = req.params.id;
        let pedido = new PedidoModel();
        let resultado = await pedido.excluir(id);
        let msg = '';
        if(resultado)
            msg = 'Usuário excluído com sucesso!';
        else 
            msg = 'Erro ao excluir usuário';

        res.send({ok: resultado, msg: msg});
    }
}

module.exports = PedidoController;