// Array de objetos.
let listaCompletaDeAlunos = [];

// Função responsável por válidar se campos foram preenchidos.
function valorValido(valor) {
    if (!valor) {
        throw new Error("Preencha todos os campos!")
    }
}

// Função responsável por válidar se campos de nota foram preenchidos com números.
function notaValida(valor) {
    if (isNaN(valor)) {
        throw new Error("Valor de nota inválido!")
    }
}

// Função responsável por adicionar a classe closeList nas listas de informações dos alunos.
function closeList() {
    let divStudant = document.getElementById("studant")
    let divLista = document.getElementById("lista")

    divStudant.classList.add("closeList")
    divLista.classList.add("closeList")
}

// Função responsável por criar um objeto com informações do aluno e adicionar dentro do array.
function adicionarAluno() {
    // Valores informados pelo usuário.
    let codigo = document.getElementById("codigo").value.trim();
    let nome = document.getElementById("nome").value.trim();
    let sobrenome = document.getElementById("sobrenome").value.trim();
    let nota1 = Number(document.getElementById("nota1").value);
    let nota2 = Number(document.getElementById("nota2").value);
    let nota3 = Number(document.getElementById("nota3").value);
    let email = document.getElementById("email").value.trim();
    // calculo de média do aluno.
    let media = ((nota1 * 1 + nota2 * 2 + nota3 * 3) / (1 + 2 + 3)).toFixed(2);
    // Situação do aluno padrão na hora do cadastramento.
    let situacaoDoAluno = true

    // Utilizando as funções valorValido e notaValida, verifica se o usuário preencheu as informações corretamente.
    try {
        valorValido(codigo)
        valorValido(nome)
        valorValido(sobrenome)
        valorValido(email)
        valorValido(nota1)
        valorValido(nota2)
        valorValido(nota3)
        notaValida(nota1)
        notaValida(nota2)
        notaValida(nota3)

        // Função anônima usando método some, para verificar se algum objeto dentro do array tem o mesmo codigo.
        const alunoJaCadastrado = listaCompletaDeAlunos.some(aluno => aluno.codigo === codigo)

        if (alunoJaCadastrado) {
            alert("Código já cadastrado!");
        } else {
            // Cria objeto novoAluno para guardar informações inseridas pelo usuário.
            let novoAluno = {
                codigo: codigo,
                nome: nome,
                sobrenome: sobrenome,
                nota1: nota1,
                nota2: nota2,
                nota3: nota3,
                media: media,
                email: email,
                situacaoDoAluno: situacaoDoAluno ? "ativo" : "desativado"
            }

            // Acrescenta novoAluno na lista completa de alunos
            listaCompletaDeAlunos.push(novoAluno);
            alert("Aluno cadastrado com sucesso!");

            document.getElementById("codigo").value = "";
            document.getElementById("nome").value = "";
            document.getElementById("sobrenome").value = "";
            document.getElementById("nota1").value = "";
            document.getElementById("nota2").value = "";
            document.getElementById("nota3").value = "";
            document.getElementById("email").value = "";
        }
    } catch (error) {
        // Resposável por exibir mensagem de erro definidas nas funções valorValido e notaValido caso algum valor esteja incorreto.
        alert(error.message)
    }
}

// Função Responsável por buscar aluno atráves do código.
function buscarAluno() {
    // Código inserido pelo usuário.
    let codigoInserido = document.getElementById("codeStudant").value;
    // Lista onde os dados serão exibidos.
    let infoAluno = document.getElementById("infoAluno");
    // Título das informações que serão exibidas.
    let tituloLista = document.getElementById("titleInfoStudant");

    let divStudant = document.getElementById("studant")


    infoAluno.innerText = ""
    tituloLista.innerHTML = ""

    try {
        // Verifica se o valor inserido pelo usuário é válido.
        valorValido(codigoInserido);

        // Função responsável por filtrar e guardar dentro do array, somente o objeto com código igual ao inserido pelo usuário
        let resultadoDaBusca = listaCompletaDeAlunos.filter(aluno => aluno.codigo === codigoInserido);

        // Se nada for encontrado e guardado dentro do array, ele exibe um alerta.
        if (resultadoDaBusca.length === 0) {
            alert("Aluno não encontrado!")
            return;
        } else {
            for (const aluno of resultadoDaBusca) {

                for (const propriedade in aluno) {
                    // Armazena todos os valores das propriedades do aluno encontrado.
                    let valorDaPropriedadeDoAluno = aluno[propriedade];

                    // Verifica se a propriedade situacaoDoAluno possui valor true ou false
                    if (propriedade === "situacaoDoAluno") {
                        valorDaPropriedadeDoAluno = valorDaPropriedadeDoAluno ? "ativo" : "desativado";
                    }

                    //Adiciona um texto no titulo da lista que será exibido os dados do aluno.
                    tituloLista.innerText = "Resultado";

                    // A cada loop, é criado um li para armazenar uma propriedade encontrada .
                    let li = document.createElement("li");

                    // Adiciona dentro do li as propriedades encontradas.
                    li.textContent = `${propriedade}: ${valorDaPropriedadeDoAluno}`;

                    // Adiciona o li dentro da lista.
                    infoAluno.appendChild(li);

                    divStudant.classList.remove("closeList")
                }
            }
        }
        // Limpa o campo de código do aluno
        document.getElementById("codeStudant").value = "";
    } catch (error) {
        alert("Dígite um código!")
    }

}

// Função responsável por remover aluno da lista
function removerAluno() {
    // Recebe valor inserido pelo usuário. 
    let codigoInserido = document.getElementById("codeStudant").value
    // Lista onde os dados serão exibidos.
    let infoAluno = document.getElementById("infoAluno");
    // Título das informações que serão exibidas.
    let tituloLista = document.getElementById("tituloLista");
    // Limpa os dados anteriores da lista.
    tituloLista.innerText = "";
    infoAluno.innerHTML = "";
    // Criado para conseguir validar se aluno foi encontrado ou não.
    let alunoEncontrado = false

    for (const aluno of listaCompletaDeAlunos) {
        if (aluno.codigo === codigoInserido) {
            alunoEncontrado = true
            // Função utilizando método filter para guardar dentro do array, somente aluno com codigo diferente do inserido.
            listaCompletaDeAlunos = listaCompletaDeAlunos.filter(aluno => aluno.codigo !== codigoInserido)
            alert("Aluno Removido!")
        }
    }
    if (!alunoEncontrado) {
        alert("Aluno Não Encontrado")
    }

}

// Função para desativar aluno.
function desativarAluno() {
    // recebe código recebido do usuário.
    let codigoInserido = document.getElementById("codeStudant").value
    // Lista onde os dados serão exibidos.
    let infoAluno = document.getElementById("infoAluno");
    // Título das informações que serão exibidas.
    let tituloLista = document.getElementById("tituloLista");
    // Limpa os dados anteriores da lista.
    tituloLista.innerText = "";
    infoAluno.innerHTML = "";

    try {
        // Verifica se usuário preencheu campo.
        valorValido(codigoInserido)

        for (let aluno of listaCompletaDeAlunos) {
            if (aluno.codigo === codigoInserido) {
                //Troca o valor da propriedade situacaoDoAluno para false.
                aluno.situacaoDoAluno = false
                alert("Aluno desativado!")
                break;
            }
        }

    } catch (error) {
        alert("Dígite um código!")
    }

}

// Função responsável por exibir todos os alunos.
function listaCompletaAlunos() {
    let listaAlunos = document.getElementById("lista");
    let tituloLista = document.getElementById("tituloLista");
    let ul = document.getElementById("alunos");

    ul.innerHTML = ""

    for (const aluno of listaCompletaDeAlunos) {
        // A cada loop, cria um li
        let li = document.createElement("li");
        // A cada loop, adiciona as propriedades do aluno.
        li.textContent = `
        Código: ${aluno.codigo},
        Nome: ${aluno.nome},
        Sobrenome: ${aluno.sobrenome},
            Média: ${aluno.media},
            Situação: ${aluno.situacaoDoAluno ? 'ativo' : 'desativado'}
        `;
        // adiciona o li dentro do ul.
        ul.appendChild(li);
        listaAlunos.classList.remove("closeList")
    }

    tituloLista.innerText = "Lista Completa de Alunos"
    // Adiciona o ul dentro da Lista
    listaAlunos.appendChild(ul);
}

// Função para exibir alunos ativos.
function alunosAtivos() {
    let ul = document.getElementById("alunos");
    let listaAlunos = document.getElementById("lista");
    let tituloLista = document.getElementById("tituloLista");

    ul.innerHTML = ""

    for (const aluno of listaCompletaDeAlunos) {
        let li = document.createElement("li")

        if (aluno.situacaoDoAluno === "ativo") {
            li.textContent = `
            Código: ${aluno.codigo},
            Nome: ${aluno.nome},
            Sobrenome: ${aluno.sobrenome},
            Média: ${aluno.media},
            Situação: ${aluno.situacaoDoAluno}
        `;
            ul.appendChild(li);
            listaAlunos.classList.remove("closeList")
        }

    }
    tituloLista.innerText = "Alunos ativos"
    listaAlunos.appendChild(ul);
}

// Função responsável por exibir Alunos desativados.
function alunosInativos() {
    let ul = document.getElementById("alunos");
    let tituloLista = document.getElementById("tituloLista");
    let listaAlunos = document.getElementById("lista");

    ul.innerHTML = ""

    for (let aluno of listaCompletaDeAlunos) {
        let li = document.createElement("li")

        if (aluno.situacaoDoAluno === false) {
            li.textContent = `
        Código: ${aluno.codigo},
        Nome: ${aluno.nome},
        Sobrenome: ${aluno.sobrenome},
        Média: ${aluno.media},
        Situação: ${aluno.situacaoDoAluno ? "ativo" : "desativado"}
    `;
            ul.appendChild(li)
            listaAlunos.classList.remove("closeList")
        }
    }
    tituloLista.innerText = "Alunos desativados"
    listaAlunos.appendChild(ul)
}

// Função responsável por exibir alunos aprovados
function alunosAprovados() {
    let ul = document.getElementById("alunos");
    let listaAlunos = document.getElementById("lista");
    let tituloLista = document.getElementById("tituloLista");

    ul.innerHTML = ""

    for (const aluno of listaCompletaDeAlunos) {

        if (aluno.media >= 6) {
            let li = document.createElement("li")
            li.textContent = `
           
            aluno: ${aluno.nome},
            Sobrenome: ${aluno.sobrenome},
            Nota 1: ${aluno.nota1},
            Nota 2: ${aluno.nota2},
            Nota 3: ${aluno.nota3},
            Média: ${aluno.media},
            Situação: ${aluno.situacaoDoAluno ? "ativo" : "desativado"},
            `

            ul.appendChild(li)
            listaAlunos.classList.remove("closeList")
        }
    }
    tituloLista.innerText = "Alunos aprovados"
    listaAlunos.appendChild(ul)
}

// Função para exibir alunos reprovados.
function alunosReprovados() {
    let ul = document.getElementById("alunos")
    let tituloLista = document.getElementById("tituloLista")
    let listaAlunos = document.getElementById("lista")

    ul.innerHTML = ""

    for (const aluno of listaCompletaDeAlunos) {

        if (aluno.media < 6) {
            let li = document.createElement("li")
            li.textContent = `
           
            aluno: ${aluno.nome},
            Sobrenome: ${aluno.sobrenome},
            Nota 1: ${aluno.nota1},
            Nota 2: ${aluno.nota2},
            Nota 3: ${aluno.nota3},
            Média: ${aluno.media},
            Situação: ${aluno.situacaoDoAluno ? "ativo" : "desativado"},
            `
            ul.appendChild(li)
            listaAlunos.classList.remove("closeList")

        }
    }
    tituloLista.innerText = "Alunos reprovados"
    listaAlunos.appendChild(ul)
}