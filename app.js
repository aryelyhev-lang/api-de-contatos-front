'use strict'

import { getContatos, postContatos, putContato, deleteContato } from "./contatos.js"

const tabela = document.querySelector('table')          // seleciona a primeira tabela encontrada no HTML
const botaoSalvar = document.querySelector('.salvar')   // seleciona o botão que possui a classe "salvar"

// função responsável por criar uma linha da tabela
// recebe um objeto 'contato' como parâmetro
function criarLinha(contato) {

    // cria um elemento <tr> (linha da tabela)
    const tr = document.createElement('tr')

    const tdId = document.createElement('td')       // cria uma célula <td> para o ID
    tdId.textContent = contato.id                   // adiciona o valor do id do contato dentro da célula

    
    const tdNome = document.createElement('td')     // cria uma célula <td> para o nome    
    tdNome.textContent = contato.nome               // adiciona o nome do contato dentro da célula

   
    const tdEmail = document.createElement('td')    // cria uma célula <td> para o email
    tdEmail.textContent = contato.email             // adiciona o email do contato dentro da célula

    
    const tdEndereco = document.createElement('td') // cria uma célula <td> para o endereço
    tdEndereco.textContent = contato.endereco       // adiciona o endereço do contato dentro da célula

    
    const tdCidade = document.createElement('td')   // cria uma célula <td> para a cidade
    tdCidade.textContent = contato.cidade           // adiciona a cidade do contato dentro da célula

    
    const tdAcao = document.createElement('td')         // cria uma célula <td> para armazenar os botões de ação
    const divBotoes = document.createElement('div')     // cria uma div para organizar os botões
    divBotoes.classList.add('update-delete')            // adiciona a classe CSS "update-delete" na div

    const btnUpdate = document.createElement('button')  // cria o botão de atualizar
    btnUpdate.textContent = 'update'                    // adiciona o texto "update" no botão
    btnUpdate.classList.add('acao')                     // adiciona a classe CSS "acao" no botão

    const btnDelete = document.createElement('button')  // cria o botão de deletar
    btnDelete.textContent = 'delete'                    // adiciona o texto "delete" no botão
    btnDelete.classList.add('acao')                     // adiciona a classe CSS "acao" no botão

    btnDelete.addEventListener('click', async () => {   // adiciona um evento de clique no botão delete

        // chama a função para deletar o contato da API
        await deleteContato(contato.id)

        // remove a linha da tabela da tela
        tr.remove()
    })

    
    divBotoes.append(btnUpdate, btnDelete)  // adiciona os dois botões dentro da div
    tdAcao.appendChild(divBotoes)           // adiciona a div dentro da célula de ações

    // adiciona todas as células dentro da linha da tabela
    tr.append(
        tdId,
        tdNome,
        tdEmail,
        tdEndereco,
        tdCidade,
        tdAcao
    )

    // adiciona a linha completa dentro da tabela
    tabela.appendChild(tr)
}

// função responsável por carregar os contatos da API
async function carregarContatos() {

    // chama a função getContatos()
    // espera a resposta da API e guarda os contatos na variável
    const contatos = await getContatos()

    // percorre todos os contatos recebidos
    // para cada contato chama a função criarLinha()
    // criando uma linha na tabela
    contatos.forEach(criarLinha)
}

// função responsável por salvar um novo contato
async function salvarContato() {

    // cria um objeto chamado contato
    // pegando os valores digitados nos inputs do HTML
    const contato = {
        
        nome: document.getElementById('nome').value,            // pega o valor do input com id "nome"
        email: document.getElementById('email').value,          // pega o valor do input com id "email"
        endereco: document.getElementById('endereco').value,    // pega o valor do input com id "endereco"
        cidade: document.getElementById('cidade').value         // pega o valor do input com id "cidade"
    }

    // envia o contato para a API usando a função postContatos()
    // await espera a resposta da API
    const novoContato = await postContatos(contato)

    // cria uma nova linha na tabela com o contato retornado da API
    criarLinha(novoContato)

    // limpa os campos do formulário após salvar
    limparCampos()
}

function atualizarCampos(contato){
    
    const contato = {
        
        nome: document.getElementById('nome').value,            // pega o valor do input com id "nome"
        email: document.getElementById('email').value,          // pega o valor do input com id "email"
        endereco: document.getElementById('endereco').value,    // pega o valor do input com id "endereco"
        cidade: document.getElementById('cidade').value         // pega o valor do input com id "cidade"
    }

    const atualizaContato = putContato(contato)

}

// função responsável por limpar os campos do formulário
function limparCampos() {
   
    document.getElementById('nome').value = ''      // limpa o campo de nome
    document.getElementById('email').value = ''     // limpa o campo de email
    document.getElementById('endereco').value = ''  // limpa o campo de endereço
    document.getElementById('cidade').value = ''    // limpa o campo de cidade
}


// adiciona um evento de clique no botão salvar
// quando o botão for clicado, chama a função salvarContato
botaoSalvar.addEventListener('click', salvarContato)
botaoAtualizar.addEventListener('click', atualizarCampos)
botaoExcluir.addEventListener('click', limparCampos)



// inicia a aplicação chamando a função que carrega os contatos da API
carregarContatos()