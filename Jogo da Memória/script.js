var ordemDeEscolha = 0;
var ordemDeJogada = 0;
function Escolha(){carta1 = "",carta2 = "",indice1 = 0,indice2 = 0};
var escolhas = new Escolha();
var jogador1 = 0;
var jogador2 = 0;
var listaDeIndicesDeBotoes = [];
var tipoDeJogo = 2;

var divPlacar;
var divBotoes;
var rodada = document.getElementById('rodada')

//var imagens = ["imagens/teste.png","imagens/urso.jpeg","imagens/dog.jpg"]
var imagens = ['clash/bandida30.png','clash/bruxa_sombria.png','clash/mineiro.png','clash/executor.png','clash/principe.png',
  'clash/cavaleiro.png','clash/gigante.png','clash/bruxa.png','clash/princesa.png','clash/mago_eletrico.png',
  'clash/lenhador.png','clash/megacavaleiro.png','clash/mago.png','clash/Pekka.png','clash/corredor.png']
imagens = imagens.concat(imagens);// Duplica as imagens

function createButton(indice,imagem){
  let btn = document.createElement('BUTTON');
  imagem = "imagens/padrao.jpg"
 
  const carta = () =>{
    return mostraImagem(imagens[indice-1],indice)
	}
  btn.id = String(indice); // adiciona um ID para o botão
  btn.style.background =  'url('+ imagem +')';
  btn.onclick = carta;
  //let botoes= document.getElementById('idbuttons');
  divBotoes.appendChild(btn);
  
}

function mostraImagem(imagem,indice){
  let bt = document.getElementById(String(indice))
  bt.style.background =  'url('+ imagem +')no-repeat center center';
  organizaSelecionadas(imagem,indice);
}

//declaro minha função de sorting
function sorteiaNum(min,max){ 
  num = Math.random() * (max - min) + min;
  num = Math.round(num);
  return num;
}

sorteia = () =>{
  imagens.sort(function(){return Math.random() * 2 -1})
  return imagens;

}
var imagens = sorteia();

// Inicia novo jogo criando os botões
function criaBotoes(){
  removeCapaFundo();
  atualizaPlacar();
  rodada.innerHTML = ordemDeJogada%2 == 0?"Vez do jogador 1": "Vez do jogador 2";

  divBotoes = document.createElement('div');
  divBotoes.id = 'idbuttons'  
  document.body.appendChild(divBotoes);

  for(let i = 1; i<=30;i++){
    createButton(i,imagens[i-1]);
  }
}

function removeCapaFundo(){
  let menu = document.getElementById('idmenu');
  //let capa = document.getElementById('imagemCapa')
  menu.removeChild(menu.children[0])
  menu.removeChild(menu.children[0])
  menu.removeChild(menu.children[0])
}

function adicionaCapaFundo(){
  let capa = document.createElement('img');  
  capa.id = 'imagemCapa';
  capa.src="menu/capa_principal.png";
  document.body.appendChild(capa)
}
//adicionaCapaFundo();


const verificaIgualdade = function({carta1 , carta2,indice1,indice2}){
    
    Ativa_e_Desativa_Botoes(true);
    
    if(carta1 === carta2){
        acertou(indice1,indice2);
        Ativa_e_Desativa_Botoes(false);
        atualizaPlacar();
        //escolhas = function(){carta1 = "",carta2 = "",indice1 = 0,indice2 = 0};
    }else{
      ordemDeJogada++;
      voltaCartaPadrao(indice1,indice2);
    }
    rodada.innerHTML = ordemDeJogada%2 == 0?"Vez do jogador 1": "Vez do jogador 2";
}

const Ativa_e_Desativa_Botoes = function(condicao){
  for(let i=0; i < listaDeIndicesDeBotoes.length;i++){
    try{
    document.getElementById(String(listaDeIndicesDeBotoes[i])).disabled = condicao;
    }catch(erro){
    } 
  }
}

const atualizaPlacar = function(){
  if(divPlacar){
  }else{
    divPlacar = document.createElement('div')
    divPlacar.id = 'placar'
    //let lbl = document.createTextNode(`jogador 1: ${jogador1}   jogador 2: ${jogador2} `)
    document.body.appendChild(divPlacar);
  }


  if(tipoDeJogo === 2){
    divPlacar.innerHTML = `jogador 1: ${jogador1}   jogador 2: ${jogador2}`
  }else{
    divPlacar.innerHTML = `jogador: ${jogador1}   PC: ${jogador2}`
  }

  
}

const acertou = function(indice1,indice2){
  ordemDeJogada%2 == 0? jogador1++ : jogador2++;
  listaDeIndicesDeBotoes.splice(listaDeIndicesDeBotoes.indexOf(indice1),1)
  listaDeIndicesDeBotoes.splice(listaDeIndicesDeBotoes.indexOf(indice2),1)
}

const voltaCartaPadrao = function(indice1,indice2){
  let temp = 0;
      
  let interval = setInterval(function(){    
    if(temp != 0){
      imagem = "imagens/padrao.jpg";   
      let bt1 = document.getElementById(String(indice1));
      let bt = document.getElementById(String(indice2));
      bt1.style.background =  'url('+ imagem +')';
      bt.style.background =  'url('+ imagem +')';
      bt1.disabled = false;
      bt.disabled = false;
      Ativa_e_Desativa_Botoes(false);
      clearInterval(interval); // finaliza intervalo
    }else{
      temp++;
    }

  },350);
}


const selecionaCarta1 = (idCarta,indice) =>{
    escolhas.carta1 = idCarta;
    escolhas.indice1 = indice;
    document.getElementById(String(indice)).disabled = true;
}

const selecionaCarta2 = function(idCarta,indice){
    escolhas.carta2 = idCarta;
    escolhas.indice2 = indice;
    ordemDeEscolha = 0;

    document.getElementById(String(indice)).disabled = true;
    verificaIgualdade(escolhas);
}

const organizaSelecionadas = function(idCarta,indice){
    ordemDeEscolha++;
    return ordemDeEscolha%2 == 1? selecionaCarta1(idCarta,indice)  : selecionaCarta2(idCarta,indice);
}

const verificaVencedor = function(){
    if(jogador1 > jogador2){
        console.log("Jogador 1 ganhou!")
    }else{
        console.log("Jogador 2 ganhou!")
    }
}

const verificaFimDoJogo = function(){
    if(jogador1 + jogador2 == 15){
        console.log('fim do jogo!')
        verificaVencedor();
    }
}

function indiceBotoes (){
  for(var i = 1; i <= 30;i++){
    listaDeIndicesDeBotoes.push(i);
  }
}

indiceBotoes();

function reniciaJogo(){
  indiceBotoes();
  atualizaPlacar();
  imagens = sorteia();
}