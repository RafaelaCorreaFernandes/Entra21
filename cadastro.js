function cadastrar() {
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const telefone = document.getElementById('telefone').value

    const tbody = document.getElementById('tabela-body')

    const tr = document.createElement('tr')

     tr.innerHTML = `
                <td>${nome}</td>
                <td>${email}</td>
                <td>${telefone}</td>
            `

            tbody.appendChild(tr)

            document.getElementById('nome').value = ''
            document.getElementById('email').value = ''
            document.getElementById('telefone').value = ''
}