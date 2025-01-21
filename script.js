let students = []; // Array de estudantes
const matriculaToName = {
    "0": "Cristiano Ronaldo",
    "1": "Uchiha Itachi",
    "2": "Nara Shikamaro",
    "3": "Oreki Houtaro",
    "4": "light Yagami_Kira",
    "5": "Namikaze Minato",
    "6": "Ryiomi Sukuna",
    "7": "Edgar Baptista",
    "8": "Kiyotaka Ayanokoji",
    // Adicione mais pares de matrícula e nome conforme necessário
};

// Alternar lados esquerdo e direito
function toggleSides() {
    const leftSide = document.getElementById("leftSide");
    const rightSide = document.getElementById("rightSide");
    const container = document.getElementById("container");

    if (container.classList.contains("flipped")) {
        leftSide.style.order = "0";
        rightSide.style.order = "1";
        container.classList.remove("flipped");
    } else {
        leftSide.style.order = "1";
        rightSide.style.order = "0";
        container.classList.add("flipped");
    }
}

// Validar nota
document.getElementById("nota_atribuida").addEventListener("input", function () {
    const nota = this.value;
    const warning = document.getElementById("notaWarning");
    if (nota < 0 || nota > 20) {
        warning.style.display = "block";
    } else {
        warning.style.display = "none";
    }
});

// Preencher nome com base na matrícula
document.getElementById("matricula").addEventListener("input", function () {
    const matricula = this.value;
    const nameField = document.getElementById("name");
    nameField.value = matriculaToName[matricula] || "";
});

// Salvar notas
function saveGrades() {
    const id = document.getElementById("ID").value;
    const matricula = document.getElementById("matricula").value;
    const nota = document.getElementById("nota_atribuida").value;
    const name = document.getElementById("name").value;

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!id || !matricula || !nota || !name) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    // Validar a nota
    if (nota < 0 || nota > 20) {
        alert("Nota inválida. Insira um valor entre 0 e 20.");
        return;
    }

    // Adicionar os dados ao array de estudantes
    students.push({ id, matricula, nota, name });

    // Armazenar os dados no localStorage
    localStorage.setItem("students", JSON.stringify(students));

    alert("Dados salvos com sucesso!");

    // Limpar o formulário após salvar os dados
    document.getElementById("studentForm").reset();
}

// Consultar notas
function viewGrades() {
    const resultList = document.getElementById("resultList");
    resultList.innerHTML = ""; // Limpar lista

    // Verificar se já existem dados armazenados no localStorage
    const savedData = localStorage.getItem("students");
    if (savedData) {
        students = JSON.parse(savedData);
    }

    // Exibir os dados dos estudantes
    if (students.length > 0) {
        students.forEach((student) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>ID:</strong> ${student.id} <br>
                <strong>Nome:</strong> ${student.name} <br>
                <strong>Matrícula:</strong> ${student.matricula} <br>
                <strong>Nota:</strong> ${student.nota} <br>
            `;
            resultList.appendChild(listItem);
        });
        document.getElementById("popup").style.display = "flex";
    } else {
        alert("Nenhuma nota disponível.");
    }
}


// Função para atualizar o relógio automaticamente
function atualizarRelogio() {
    const relogio = document.getElementById('relogio');  // Elemento HTML onde será exibida a hora
    const atual = new Date();  // Obtém a data e hora atual
    
    // Formata as horas, minutos e segundos, colocando zero à esquerda se necessário
    const horas = atual.getHours().toString().padStart(2, '0');
    const minutos = atual.getMinutes().toString().padStart(2, '0');
    const segundos = atual.getSeconds().toString().padStart(2, '0');
    
    // Exibe a hora no formato HH:mm:ss
    relogio.textContent = `${horas}:${minutos}:${segundos}`;
}

// Atualiza a hora a cada segundo (1000ms)
setInterval(atualizarRelogio, 1000);

// Chama a função uma vez para inicializar a hora assim que a página carregar
atualizarRelogio();


// Fechar popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}
