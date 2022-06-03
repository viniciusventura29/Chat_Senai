var input = document.getElementById("msg");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        enviarMSG();
    }
});

var botao = document.getElementById("button");
button.addEventListener("click",function(){
    enviarMSG();
});

var botaoApagar = document.getElementById("botaoApagar");
button.addEventListener("click",function(){
    apagarMsgDB();
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js"; // imports pro firebase funcionar
import { getDatabase, ref, set, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js"; //content

var firebaseConfig = {
    apiKey: "AIzaSyDy-IYd17TKsntIl8d6elisVZHasIU7wEQ",
    authDomain: "chatpoggers-b2275.firebaseapp.com",
    projectId: "chatpoggers-b2275",
    storageBucket: "chatpoggers-b2275.appspot.com",
    messagingSenderId: "1041309077465",
    appId: "1:1041309077465:web:0d7dc469bda67ec61e13c8",
    measurementId: "G-HHDNM0RLVH"		
};

const app = initializeApp(firebaseConfig);

var db = getDatabase(app);
const dbRef = ref(db, 'exemplo');

var meuhtml = "";

var nomeUsuario = prompt("Digite seu nome");

if (nomeUsuario != null){
    
        onValue(dbRef, (snapshot) => { // toda vez que houver uma aleração (MENSAGEM) ele vai executar isso (onValue)
            const data = snapshot.val();
            console.log(data);
            meuhtml = "";
            snapshot.forEach(function (childSnapshot) {
                //utilizar a key pra deleletar a mensagem
                var key = childSnapshot.key; // id
                console.log(key);
                console.log(childSnapshot.val().nome);
                console.log(childSnapshot.val().mensagem);
                if(childSnapshot.val().nome == nomeUsuario){
                    if(childSnapshot.val().mensagem == ""){
                        null;
                    }
                    else{
                        meuhtml += '<div class="msg"><div class="eu"><b>' + 
                        '<div class="nomeEhorario">'+'<div class="horario">'+childSnapshot.val().horario + 
                        '</div>'+'</div>'+" " +  childSnapshot.val().nome + '</i></b><span>' + childSnapshot.val().mensagem + 
                        '</span>' + '<a href="javascript: void (0)" id="'+key+'" class="botaoDeDeletar"><i class="material-icons" style="font-size:30px;color:#e2a4ff;">delete</i></a>'
                        + '</div>' ;
                    }
                }
                else if(childSnapshot.val().nome != nomeUsuario){
                    if(childSnapshot.val().mensagem == ""){
                        null;
                    }
                    else{
                        meuhtml += '<div class="msg"><div class="outro"><b>' + 
                        '<div class="nomeEhorario">'+'</div>'+" " +  childSnapshot.val().nome + '<div class="horario_outro">'+  childSnapshot.val().horario +'</div>'+'</i></b><span>' + childSnapshot.val().mensagem + 
                        '</span>' + '<a href="javascript: void (0)" id="'+key+'" class="botaoDeDeletar"><i class="material-icons" style="font-size:30px;color:#e2a4ff;">delete</i></a>'
                        + '</div>' ;
                    }
                }

        });
        atualizarHTML();
        let arrBotoesDelete = Array.from(document.querySelectorAll('.botaoDeDeletar')); //pega o node list e transforma num array pra poder dar forEach
        arrBotoesDelete.forEach((botao) => {
            botao.addEventListener('click', () => { //sso estavamos fazendo 
                apagar(botao.id);
            });
        });
    });
    }
else{   
    meuhtml += '<div class="msg"><div class="outro"><b>' + 
    '<div class="nomeEhorario">'+'<div class="horario_outro ">'+ 
    '</div>'+'</div>'+" " +  childSnapshot.val().nome + childSnapshot.val().horario +'</i></b><span>' + 'FDPPPPPPP'+ 
    '</span>' + '<a href="javascript: void (0)" id="'+key+'" class="botaoDeDeletar"><i class="material-icons" style="font-size:30px;color:#e2a4ff;">delete</i></a>'
    + '</div>' ;
}

function apagar(key){
    console.log(key);
    remove(ref(db, 'exemplo/' + key));
}


function enviarMSG() {

    var datahj = new Date();
    var hora = datahj.getHours() + ":" + datahj.getMinutes() + ":" + datahj.getSeconds()
    if (nomeUsuario == "")
    {
        alert("Você não declarou seu nome!");
    }
    else{
    push(ref(db, 'exemplo'), { // isso é o que aparece no nosso banco, pra add e aparecer tem que ser aqui
        nome: nomeUsuario,
        horario: hora,
        mensagem: document.getElementById("msg").value
    });

    document.getElementById("msg").value = "";
}}

function atualizarHTML() {
    document.getElementById("conteudo").innerHTML = meuhtml
    ajustarScroll();
}

// function apagarMsgDB(){
//     var apagarKey = document.getElementById("key").value
//     console.log(apagarKey);
//     remove(ref(db, 'exemplo/' + apagarKey));
// }

function ajustarScroll() {
    console.log("corrirgir scroll");
    var divConteudo = document.getElementById("conteudo");
    divConteudo.scrollTop = divConteudo.scrollHeight;
}
