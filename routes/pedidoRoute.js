const express = require('express');
const PedidoController = require('../controllers/pedidoController');

const router = express.Router();

let ctrl = new PedidoController();
router.get('/fazer', ctrl.fazerPedidoView);
router.post('/fazer', ctrl.fazerPedido);
router.get('/listar', ctrl.listagemView);
router.get('/admin', ctrl.adminView);
router.get('/excluir/:id', ctrl.excluir);

module.exports = router;