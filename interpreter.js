export default function interpreter(command){
    let cmd = command[0].toLowerCase();
    command.shift();
    let params = [];

    for(let prm of command){
        params.push(prm);
    }

    function output(msg){
        prompty.value+=msg+"\n>> ";
    }

    function numOfParam(num){
        if(params.length != num){
            return false;
        }else{
            return true;
        }
    }

    const isMobile = window.mobileCheck();
    let prompty = document.getElementById("prompt")

    switch(cmd){
        case 'help':
            output(`Comandos disponiveis:
            help: lista os comandos disponiveis no terminal.
            print: exibe a mensagem.
            sum: soma os dois primeiros parametros.
            ping: pong.
            waifu: gera uma página com uma personagem de anime aleatória.
        `);
        break;
        case numOfParam(2)&&'=':
            localStorage.setItem(params[0], params[1]);
            output("Variável salva com sucesso, para acessar digite $ [variavel]");
        break;
        case '$':
            localStorage.getItem(params[0]);
        break;
        case 'print':
            let sentence = "";
            for(let [i,p] of params.entries()){
                sentence += params[i]+" ";
            }
            output(sentence);
        break;
        case 'sum':
            let sum = parseFloat(params[0])+parseFloat(params[1]);
            output(sum);
        break;
        case 'waifu':
            function openWaifu(waifurl){
                if (window.confirm('Você será redirecionado para outra página')) 
                    window.open ('imagepop.html?image='+waifurl.url)
            }
            fetch('https://api.waifu.pics/sfw/waifu')
                .then((response) => response.json())
                .then(output("Abrindo imagem em nova guia..."))
                .then((data) => openWaifu(data))
        break;
        case 'ping':
            output("pong");
        break;
        default: 
            !isMobile&&(prompty.value += "Comando não reconhecido\n>> ");
    }
}