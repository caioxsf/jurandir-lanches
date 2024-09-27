//importando os packages instalados
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const homeRouter = require('./routes/homeRoute');
const pedidoRouter = require('./routes/pedidoRoute');

const app = express();

//configurando a nossa pasta public como o nosso repositorio de arquivos estáticos (css, js, imagens)
app.use(express.static(__dirname + "/public"))
//configuração das nossas views para utilizar a ferramenta EJS
app.set('view engine', 'ejs');

//Configuração de onde ficará nossas views
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//configuração da nossa página de layout
app.set('layout', './layout');
app.use(expressLayouts);

app.use('/', homeRouter)
app.use('/pedido', pedidoRouter);

//ponto de inicio do nosso servidor web
const server = app.listen('5000', function() {
    console.log('Servidor web iniciado');
});
