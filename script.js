let inputDigitarTexto = document.getElementById('texto-tarefa');
const ulDAlista = document.getElementById('lista-tarefas');
let botaoAdd = document.getElementById('criar-tarefa');
const botaoLimpar = document.getElementById('apaga-tudo');
const paletaDeCores = document.querySelector('#lista-tarefas');
const botaoRemover = document.getElementById('remover-finalizados');
const botaoSalvar = document.getElementById('salvar-tarefas');

botaoAdd.addEventListener('click', function (e) {
  let textoDigitado = inputDigitarTexto.value;
  const criarLinha = document.createElement('li');
  criarLinha.className = 'linhaLi';
  ulDAlista.appendChild(criarLinha);
  criarLinha.innerText = textoDigitado;
});

botaoAdd.addEventListener('click', function () {
  inputDigitarTexto.value = '';
});

function selecionarCores(event) {
  const removeSelect = document.getElementsByClassName('selected');
  for (let i = 0; i < removeSelect.length; i += 1) {
    removeSelect[i].classList.remove('selected');
  }
  const SelectEvento = event.target;
  SelectEvento.classList.add('selected');
}
paletaDeCores.addEventListener('click', selecionarCores);

function complet(event) {
  const classCompleted = document.getElementsByClassName('completed');
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}
paletaDeCores.addEventListener('dblclick', complet);

function apagarTudo(event) {
  const li = document.querySelectorAll('.linhaLi');
  for (let index = 0; index < li.length; index += 1) {
    event.target = ulDAlista.removeChild(li[index]);
  }
}
botaoLimpar.addEventListener('click', apagarTudo);

function removerFinalizados(event) {
  const li = document.querySelectorAll('.linhaLi');
  for (let index = 0; index < li.length; index += 1) {
    if (li[index].classList.contains('completed')) {
      event.target = ulDAlista.removeChild(li[index]);
    }
  }
}
botaoRemover.addEventListener('click', removerFinalizados);

function salvarItensList(event) {
  const linhasDaLista = document.querySelectorAll('.linhaLi');
  let objectItem = [];
  for (let index = 0; index < linhasDaLista.length; index += 1) {
    objectItem.push({
      id: index,
      text: linhasDaLista[index].innerText,
      class: linhasDaLista[index].classList.contains('completed'),
    });
  }
  localStorage.setItem('listaItem', JSON.stringify(objectItem));
}
botaoSalvar.addEventListener('click', salvarItensList);

const listSalve = JSON.parse(localStorage.getItem('listaItem'));
function getItemLocalStore() {
  for (let index = 0; index < listSalve.length; index += 1) {
    const criarLinha = document.createElement('li');
    criarLinha.className = 'linhaLi';
    criarLinha.innerText = listSalve[index].text;
    ulDAlista.appendChild(criarLinha);
    if (listSalve[index].class) {
      criarLinha.classList.add('completed');
    }
  }
}

window.onload = function () {
  if (listSalve != null) {
    getItemLocalStore();
  }
};;
