// Variável global para armazenar o índice do cliente que está sendo editado
let indexEdicao = null;

document.addEventListener('DOMContentLoaded', () => {
  renderizarCards()
})

function irPara(pagina) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'))
  document.getElementById(pagina).classList.add('active')
}

function cadastrar() {
  const nome     = document.getElementById('nome').value.trim()
  const email    = document.getElementById('email').value.trim()
  const telefone = document.getElementById('telefone').value.trim()

  document.getElementById('aviso').textContent = ''

  if (!nome) {
    document.getElementById('aviso').textContent = 'Preencha o nome!'
    document.getElementById('nome').focus()
    return
  }

  if (!email) {
    document.getElementById('aviso').textContent = 'Preencha o email!'
    document.getElementById('email').focus()
    return
  }

  if (!telefone) {
    document.getElementById('aviso').textContent = 'Preencha o telefone!'
    document.getElementById('telefone').focus()
    return
  }

  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')

  // Se indexEdicao não for nulo, significa que estamos EDITANDO um cliente existente
  if (indexEdicao !== null) {
    clientes[indexEdicao] = { nome, email, telefone }
    indexEdicao = null; // Reseta o modo de edição
    document.querySelector('.btn-cadastrar').textContent = 'Cadastrar' // Volta o texto original do botão
  } else {
    // Se for nulo, segue o fluxo normal de criar um NOVO cliente
    clientes.push({ nome, email, telefone })
  }

  localStorage.setItem('clientes', JSON.stringify(clientes))

  // Limpa os campos
  document.getElementById('nome').value = ''
  document.getElementById('email').value = ''
  document.getElementById('telefone').value = ''

  renderizarCards()
  irPara('clientes')
}

// Nova função para acionar o modo de edição
function prepararEdicao(index) {
  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
  const cliente = clientes[index]

  // Preenche os inputs do formulário com os dados atuais do cliente
  document.getElementById('nome').value = cliente.nome
  document.getElementById('email').value = cliente.email
  document.getElementById('telefone').value = cliente.telefone

  // Guarda o índice do cliente que estamos editando
  indexEdicao = index

  // Modifica o texto do botão de cadastro para avisar o usuário
  document.querySelector('.btn-cadastrar').textContent = 'Salvar Alterações'

  // Redireciona o usuário para a página de cadastro
  irPara('cadastro')
}

function excluir(index) {
  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
  clientes.splice(index, 1)
  localStorage.setItem('clientes', JSON.stringify(clientes))
  
  // Se o cliente deletado era o que estava sendo editado, limpa o formulário e reseta o modo de edição
  if (indexEdicao === index) {
    indexEdicao = null
    document.querySelector('.btn-cadastrar').textContent = 'Cadastrar'
    document.getElementById('nome').value = ''
    document.getElementById('email').value = ''
    document.getElementById('telefone').value = ''
  }

  renderizarCards()
}

function renderizarCards() {
  const clientes  = JSON.parse(localStorage.getItem('clientes') || '[]')
  const container = document.getElementById('container-clientes')

  container.innerHTML = ''

  if (clientes.length === 0) {
    container.innerHTML = '<p class="empty">Nenhum cliente cadastrado ainda.</p>'
    return
  }

  clientes.forEach((cliente, index) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `
      <div class="card-nome">${cliente.nome}</div>
      <div class="card-info">
        <strong>Email</strong>
        <span>${cliente.email}</span>
      </div>
      <div class="card-info">
        <strong>Telefone</strong>
        <span>${cliente.telefone}</span>
      </div>
      <!-- Adicionado o botão de editar aqui abaixo -->
      <div class="card-acoes">
        <button class="btn-editar" onclick="prepararEdicao(${index})">Editar</button>
        <button class="btn-excluir" onclick="excluir(${index})">Excluir</button>
      </div>
    `
    container.appendChild(card)
  })
}