document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const aluno = {
        nome: document.getElementById('nome').value,
        endereco: document.getElementById('endereco').value,
        rg: document.getElementById('rg').value,
        cpf: document.getElementById('cpf').value,
        dtNasc: document.getElementById('dtNasc').value,
        celular: document.getElementById('celular').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        celResponsavel: document.getElementById('celResponsavel').value,
        horario: document.getElementById('horario').value,
        genero: document.getElementById('genero').value,
        esportes: document.getElementById('esportes').value,
        modalidade: document.getElementById('modalidade').value,
        periodo: document.getElementById('periodo').value,
        nomeResponsavel: document.getElementById('nomeResponsavel').value
    };

    axios.post('http://localhost:8080/cadastros/create', aluno)
        .then(function(response) {
            alert('Cadastro realizado com sucesso!');
        })
        .catch(function(error) {
            console.error('Houve um erro ao cadastrar o aluno:', error);
            alert('Erro ao cadastrar o aluno');
        });
});

function buscarAlunoPorId() {
    const id = document.getElementById('id').value;

    if (id.trim() === '') {
        alert('Por favor, insira um ID válido para buscar o aluno.');
        return;
    }

    axios.get(`http://localhost:8080/cadastros/${id}`)
        .then(function(response) {
            const aluno = response.data;
            preencherFormulario(aluno);
        })
        .catch(function(error) {
            console.error('Houve um erro ao buscar o aluno:', error);
            alert('Erro ao buscar o aluno');
        });
}

function atualizarAluno() {
    const id = document.getElementById('id').value;
    const aluno = {
        id: id,
        nome: document.getElementById('nome').value,
        endereco: document.getElementById('endereco').value,
        rg: document.getElementById('rg').value,
        cpf: document.getElementById('cpf').value,
        dtNasc: document.getElementById('dtNasc').value,
        celular: document.getElementById('celular').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        celResponsavel: document.getElementById('celResponsavel').value,
        horario: document.getElementById('horario').value,
        genero: document.getElementById('genero').value,
        esportes: document.getElementById('esportes').value,
        modalidade: document.getElementById('modalidade').value,
        periodo: document.getElementById('periodo').value,
        nomeResponsavel: document.getElementById('nomeResponsavel').value
    };

    axios.patch(`http://localhost:8080/cadastros/update/${id}`, aluno)
        .then(function(response) {
            if (response.status === 200) {
                alert('Atualização realizada com sucesso!');
            } else {
                alert('Erro ao atualizar o aluno: Não encontrado');
            }
        })
        .catch(function(error) {
            console.error('Houve um erro ao atualizar o aluno:', error);
            alert('Erro ao atualizar o aluno');
        });
}

function deletarAluno() {
    const id = document.getElementById('id').value;

    if (id.trim() === '') {
        alert('Por favor, insira um ID válido para deletar o aluno.');
        return;
    }

    axios.delete(`http://localhost:8080/cadastros/delete/${id}`)
        .then(function(response) {
            alert('Aluno deletado com sucesso!');
        })
        .catch(function(error) {
            console.error('Houve um erro ao deletar o aluno:', error);
            alert('Erro ao deletar o aluno');
        });
}

function mostrarCampoId() {
    const idField = document.getElementById('idField');
    idField.style.display = 'block';
}

function preencherFormulario(aluno) {
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('endereco').value = aluno.endereco;
    document.getElementById('rg').value = aluno.rg;
    document.getElementById('cpf').value = aluno.cpf;
    document.getElementById('dtNasc').value = aluno.dtNasc;
    document.getElementById('celular').value = aluno.celular;
    document.getElementById('telefone').value = aluno.telefone;
    document.getElementById('email').value = aluno.email;
    document.getElementById('celResponsavel').value = aluno.celResponsavel;
    document.getElementById('horario').value = aluno.horario;
    document.getElementById('genero').value = aluno.genero;
    document.getElementById('esportes').value = aluno.esportes;
    document.getElementById('modalidade').value = aluno.modalidade;
    document.getElementById('periodo').value = aluno.periodo;
    document.getElementById('nomeResponsavel').value = aluno.nomeResponsavel;
}

function limparFormulario() {
    document.getElementById('id').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('rg').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('dtNasc').value = '';
    document.getElementById('celular').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('celResponsavel').value = '';
    document.getElementById('horario').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('esportes').value = '';
    document.getElementById('modalidade').value = '';
    document.getElementById('periodo').value = '';
    document.getElementById('nomeResponsavel').value = '';
}