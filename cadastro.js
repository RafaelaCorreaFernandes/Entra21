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

  document.getElementById('aviso').textContent = ''

  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
  clientes.push({ nome, email, telefone })
  localStorage.setItem('clientes', JSON.stringify(clientes))

  document.getElementById('nome').value = ''
  document.getElementById('email').value = ''
  document.getElementById('telefone').value = ''

  renderizarCards()
  irPara('clientes')
}


function excluir(index) {
  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
  clientes.splice(index, 1)
  localStorage.setItem('clientes', JSON.stringify(clientes))
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
      <button class="btn-excluir" onclick="excluir(${index})">Excluir</button>
    `
    container.appendChild(card)
  })
}