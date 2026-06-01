'use strict'

import { getContatos, postContatos, putContato, deleteContato } from "./contatos.js"

const tabela = document.querySelector('table')
const botaoSalvar = document.querySelector('.salvar')

let idContatoEmEdicao = null

function limparCampos() {
    document.getElementById('nome').value = ''
    document.getElementById('email').value = ''
    document.getElementById('endereco').value = ''
    document.getElementById('cidade').value = ''
}

function criarLinha(contato) {

    const tr = document.createElement('tr')

    const tdId = document.createElement('td')
    tdId.textContent = contato.id

    const tdNome = document.createElement('td')
    tdNome.textContent = contato.nome

    const tdEmail = document.createElement('td')
    tdEmail.textContent = contato.email

    const tdEndereco = document.createElement('td')
    tdEndereco.textContent = contato.endereco

    const tdCidade = document.createElement('td')
    tdCidade.textContent = contato.cidade

    const tdAcao = document.createElement('td')

    const divBotoes = document.createElement('div')
    divBotoes.classList.add('update-delete')

    const btnUpdate = document.createElement('button')
    btnUpdate.textContent = 'update'
    btnUpdate.classList.add('acao')

    const btnDelete = document.createElement('button')
    btnDelete.textContent = 'delete'
    btnDelete.classList.add('acao')

    // UPDATE
    btnUpdate.addEventListener('click', () => {

        document.getElementById('nome').value = contato.nome
        document.getElementById('email').value = contato.email
        document.getElementById('endereco').value = contato.endereco
        document.getElementById('cidade').value = contato.cidade

        idContatoEmEdicao = contato.id

        botaoSalvar.textContent = 'Atualizar'
    })

    // DELETE
    btnDelete.addEventListener('click', async () => {

        const confirmar = confirm(
            `Deseja realmente excluir ${contato.nome}?`
        )

        if (!confirmar) return

        await deleteContato(contato.id)

        tr.remove()
    })

    divBotoes.append(btnUpdate, btnDelete)
    tdAcao.appendChild(divBotoes)

    tr.append(
        tdId,
        tdNome,
        tdEmail,
        tdEndereco,
        tdCidade,
        tdAcao
    )

    tabela.appendChild(tr)
}

async function carregarContatos() {

    const contatos = await getContatos()

    contatos.forEach(criarLinha)
}

async function salvarContato() {

    const contato = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value
    }

    // UPDATE
    if (idContatoEmEdicao !== null) {

        await putContato(idContatoEmEdicao, contato)

        // remove apenas as linhas de dados
        const linhas = document.querySelectorAll('table tr:not(:first-child)')
        linhas.forEach(linha => linha.remove())

        await carregarContatos()

        idContatoEmEdicao = null

        botaoSalvar.textContent = 'Salvar'
    }

    // CREATE
    else {

        const novoContato = await postContatos(contato)

        criarLinha(novoContato)
    }

    limparCampos()
}

botaoSalvar.addEventListener('click', salvarContato)

carregarContatos()