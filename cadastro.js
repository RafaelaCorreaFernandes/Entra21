  function irPara(pagina) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'))
    document.getElementById(pagina).classList.add('active')
  }

  function cadastrar() {
    const nome = document.getElementById('nome').value.trim()
    const email = document.getElementById('email').value.trim()
    const telefone = document.getElementById('telefone').value.trim()

    if (!nome || !email || !telefone) {
      alert('Preencha todos os campos!')
      return
    }

    const tbody = document.getElementById('tabela-body')
    const vazio = tbody.querySelector('.empty')
    if (vazio) vazio.parentElement.remove()

    const tr = document.createElement('tr')
    tr.innerHTML = `<td>${nome}</td><td>${email}</td><td>${telefone}</td>`
    tbody.appendChild(tr)

    document.getElementById('nome').value = ''
    document.getElementById('email').value = ''
    document.getElementById('telefone').value = ''

    irPara('clientes')
  }