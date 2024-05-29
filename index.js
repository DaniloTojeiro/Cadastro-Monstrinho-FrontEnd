document.addEventListener('DOMContentLoaded', function() {
    const telefoneInput = document.getElementById('telefone');
    const celularInput = document.getElementById('celular');
    const celResponsavelInput = document.getElementById('celResponsavel');
    const rgInput = document.getElementById('rg');
    const cpfInput = document.getElementById('cpf');

    function formatarTelefone(event) {
        let input = event.target.value;

        // Remove todos os caracteres que não são dígitos
        input = input.replace(/\D/g, '');

        if (event.target.id === 'celular' || event.target.id === 'celResponsavel') {
            // Formatação para celular: (XX) XXXXX-XXXX
            if (input.length > 0) {
                input = '(' + input;
            }
            if (input.length > 3) {
                input = input.slice(0, 3) + ') ' + input.slice(3);
            }
            if (input.length > 10) {
                input = input.slice(0, 10) + '-' + input.slice(10);
            }
            if (input.length > 15) {
                input = input.slice(0, 15);
            }
        } else {
            // Formatação para telefone: (XX) XXXX-XXXX
            if (input.length > 0) {
                input = '(' + input;
            }
            if (input.length > 3) {
                input = input.slice(0, 3) + ') ' + input.slice(3);
            }
            if (input.length > 9) {
                input = input.slice(0, 9) + '-' + input.slice(9);
            }
            if (input.length > 14) {
                input = input.slice(0, 14);
            }
        }

        event.target.value = input;
    }

    function formatarRg(event) {
        let input = event.target.value;

        // Remove todos os caracteres que não são dígitos
        input = input.replace(/\D/g, '');

        // Formatação para RG: XX.XXX.XXX-X
        if (input.length > 2) {
            input = input.slice(0, 2) + '.' + input.slice(2);
        }
        if (input.length > 6) {
            input = input.slice(0, 6) + '.' + input.slice(6);
        }
        if (input.length > 10) {
            input = input.slice(0, 10) + '-' + input.slice(10);
        }
        if (input.length > 12) {
            input = input.slice(0, 12);
        }

        event.target.value = input;
    }

    function formatarCpf(event) {
        let input = event.target.value;

        // Remove todos os caracteres que não são dígitos
        input = input.replace(/\D/g, '');

        // Formatação para CPF: XXX.XXX.XXX-XX
        if (input.length > 3) {
            input = input.slice(0, 3) + '.' + input.slice(3);
        }
        if (input.length > 7) {
            input = input.slice(0, 7) + '.' + input.slice(7);
        }
        if (input.length > 11) {
            input = input.slice(0, 11) + '-' + input.slice(11);
        }
        if (input.length > 14) {
            input = input.slice(0, 14);
        }

        event.target.value = input;
    }

    telefoneInput.addEventListener('input', formatarTelefone);
    celularInput.addEventListener('input', formatarTelefone);
    celResponsavelInput.addEventListener('input', formatarTelefone);
    rgInput.addEventListener('input', formatarRg);
    cpfInput.addEventListener('input', formatarCpf);
});

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
            limparFormulario(); // Chama a função para limpar os campos
        })
        .catch(function(error) {
            console.error('Houve um erro ao deletar o aluno:', error);
            alert('Erro ao deletar o aluno');
        });
}

function limparFormulario() {
    mostrarCampoId();
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

function mostrarCampoId() {
    const idField = document.getElementById('idField');
    idField.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
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