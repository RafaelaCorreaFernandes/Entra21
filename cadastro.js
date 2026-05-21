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
  const cep      = document.getElementById('cep').value.trim()
  const rua      = document.getElementById('rua').value.trim()
  const cidade   = document.getElementById('cidade').value.trim()

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

  if (!cep) {
    document.getElementById('aviso').textContent = 'Preencha o CEP!'
    document.getElementById('cep').focus()
    return
  }

  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')

  if (indexEdicao !== null) {
    // FIX 3: agora salva cep, rua e cidade também na edição
    clientes[indexEdicao] = { nome, email, telefone, cep, rua, cidade }
    indexEdicao = null
    document.querySelector('.btn-cadastrar').textContent = 'Cadastrar'
  } else {
    clientes.push({ nome, email, telefone, cep, rua, cidade })
  }

  localStorage.setItem('clientes', JSON.stringify(clientes))

  // Limpa todos os campos
  document.getElementById('nome').value    = ''
  document.getElementById('email').value   = ''
  document.getElementById('telefone').value = ''
  document.getElementById('cep').value     = ''
  document.getElementById('rua').value     = ''
  document.getElementById('cidade').value  = ''

  renderizarCards()
  irPara('clientes')
}

function prepararEdicao(index) {
  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
  const cliente  = clientes[index]

  document.getElementById('nome').value     = cliente.nome
  document.getElementById('email').value    = cliente.email
  document.getElementById('telefone').value = cliente.telefone
  document.getElementById('cep').value      = cliente.cep    || ''
  document.getElementById('rua').value      = cliente.rua    || ''
  document.getElementById('cidade').value   = cliente.cidade || ''

  indexEdicao = index
  document.querySelector('.btn-cadastrar').textContent = 'Salvar Alterações'
  irPara('cadastro')
}

function excluir(index) {
  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
  clientes.splice(index, 1)
  localStorage.setItem('clientes', JSON.stringify(clientes))

  if (indexEdicao === index) {
    indexEdicao = null
    document.querySelector('.btn-cadastrar').textContent = 'Cadastrar'
    document.getElementById('nome').value     = ''
    document.getElementById('email').value    = ''
    document.getElementById('telefone').value = ''
    document.getElementById('cep').value      = ''  // FIX 2: removido o ponto 'cep.'
    document.getElementById('rua').value      = ''
    document.getElementById('cidade').value   = ''
  }

  renderizarCards()
}

function toggleDetalhes(index) {
  const detalhes = document.getElementById(`detalhes-${index}`)
  const btn = detalhes.nextElementSibling.querySelector('.btn-detalhes')

  detalhes.classList.toggle('aberto')
  btn.textContent = detalhes.classList.contains('aberto') ? '▲ Fechar' : '▼ Detalhes'
}

// FIX 1: função movida para fora de excluir(), agora funciona corretamente
function buscarLogradouro() {
  const cep = document.getElementById('cep').value.trim()
  if (!cep) return

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(dados => dados.json())
    .then(resposta => {
      if (resposta.erro) {
        alert('CEP não encontrado!')
        return
      }
      document.getElementById('rua').value    = resposta.logradouro
      document.getElementById('cidade').value = resposta.localidade
    })
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
  <div class="card-info"><strong>Email</strong><span>${cliente.email}</span></div>
  <div class="card-info"><strong>Telefone</strong><span>${cliente.telefone}</span></div>

  <div class="card-detalhes" id="detalhes-${index}">
    <div class="card-info"><strong>CEP</strong><span>${cliente.cep || '-'}</span></div>
    <div class="card-info"><strong>Rua</strong><span>${cliente.rua || '-'}</span></div>
    <div class="card-info"><strong>Cidade</strong><span>${cliente.cidade || '-'}</span></div>
  </div>

  <div class="card-acoes">
    <button class="btn-detalhes" onclick="toggleDetalhes(${index})">▼ Detalhes</button>
    <button class="btn-editar" onclick="prepararEdicao(${index})">Editar</button>
    <button class="btn-excluir" onclick="excluir(${index})">Excluir</button>
  </div>
`
    container.appendChild(card)
  })
}
