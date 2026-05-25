'use strict'

//const que guarda o endereço da api de contatos
const URL = 'https://bakcend-fecaf-render.onrender.com/contatos'

export async function getContatos() {

    // Faz uma requisição HTTP para a URL e espera a resposta chegar
    const response = await fetch(URL)

    // Verifica se a resposta da API NÃO foi bem-sucedida
    if (!response.ok) throw new Error('Erro ao buscar contatos') //Lança um erro manualmente caso a requisição falhe

    // Converte a resposta da API para JSON e retorna os dados
    return response.json() 
}

export async function postContatos(contato) {

    // Configurações da requisição
    const options = {
        // Define o método da requisição como POST
        method: 'POST',
        // Define o tipo de conteúdo enviado para a API
        headers: {
            'Content-Type': 'application/json'
        },
        // Converte o objeto contato para JSON
        // para conseguir enviar no body da requisição
        body: JSON.stringify(contato)
    }
    // Faz a requisição enviando os dados do contato
    const response = await fetch(URL, options)
    if (!response.ok) throw new Error('Erro ao buscar contatos') // força lançar um erro caso haja algum, mesmo usando try/catch
    return response.json()
}

// Exporta a função para que ela possa ser usada em outros arquivos
export async function putContato(id, contato) {

    // Cria um objeto com as configurações da requisição
    const options = {
        
        method: 'PUT',      // Define o método HTTP como PUT (usado para atualizar dados)
        headers: {          // Define os cabeçalhos da requisição
            
            'Content-Type': 'application/json'  // Informa que os dados enviados estarão em formato JSON   
        },
        
        body: JSON.stringify(contato)           // Converte o objeto contato para JSON antes de enviar
    }
    const response = await fetch(`${URL}/${id}`, options)  // Faz a requisição para a API usando o ID do contato e as opções configuradas
    if (!response.ok) // Verifica se a resposta da API NÃO foi bem-sucedida

        throw new Error('Erro ao atualizar contatos')   // Lança um erro manualmente caso ocorra falha na atualização
    return response.json()                              // Converte a resposta da API para JSON e retorna os dados atualizados
}

export async function deleteContato(id) {
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(`${URL}/${id}`, options)
    if (!response.ok) throw new Error('Erro ao deletar contatos') // força lançar um erro caso haja algum, mesmo usando try/catch
    return true
}