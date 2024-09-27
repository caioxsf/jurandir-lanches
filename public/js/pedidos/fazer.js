document.addEventListener("DOMContentLoaded", function() {
    
    let btnPedido = document.querySelector('.btnPedido');

    btnPedido.addEventListener('click', cadastrar);

    function limparValidacao() {
        document.getElementById("nome").style["border-color"] = "#ced4da";
        document.getElementById("endereco").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();
        let nome = document.getElementById("nome")
        let endereco = document.getElementById("endereco")
        let pao = document.getElementById("pao")
        let hamburguer = document.getElementById("hamb")
        let queijo = document.getElementById("queijo")
        let acompanhamento = document.getElementById("acomp")

        let listaErros = [];
        if(nome == "") {
            listaErros.push("nome");
        }
        if(endereco == "") {
            listaErros.push("endereco");
        }

        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                nome: nome.value,
                endereco: endereco.value,
                pao: pao.value,
                hamburguer: hamburguer.value,
                queijo: queijo.value,
                acompanhamento: acompanhamento.value
            }

            let stringObj = JSON.stringify(obj);

            fetch ('/pedido/fazer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: stringObj
                 
            })
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(resposta) {
                if(resposta.ok) {
                    alert(resposta.msg);
                    window.location.href = '/pedido/listar';
                }
                else {
                    alert(resposta.msg);
                }
            })
            .catch (function(e) {
                console.error('erro no fatch' + e);
            })
        }
    }
})