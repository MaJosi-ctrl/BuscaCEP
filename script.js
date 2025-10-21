//--------------------------------------------------------------------------
// 1. VARIÁVEIS GLOBAIS
//--------------------------------------------------------------------------

const txt_cep = document.querySelector("#cep");
const txt_rua = document.querySelector("#rua");
const txt_num = document.querySelector("#numero");
const txt_cidade = document.querySelector("#cidade");
const txt_bairro = document.querySelector("#bairro");

const loadingOverlay = document.querySelector("#loadingOverlay");

//--------------------------------------------------------------------------
// 2. FUNÇÕES DE LÓGICA
//--------------------------------------------------------------------------

function consultaCEP() {
    // Lê o CEP digitado no campo "CEP" da página
    // para variavel 'cep'
    let cep = txt_cep.value
    // Verifica se o CEP corresponde ao padrão '00000-000',
    // Ou seja, se é um CEP válido.
    if(cep.match(/^\d{5}-\d{3}$/)) {

        // Uma API permite que a gente obtrnha informações
        // sem sair da página HTML atual.
        // Nosso objetivo é obter as informações do CEP digitado.
        // A URL da API de CEP possui o seguinte formato:
        // https://viacep.com.br/ws/12345123/json/
        // Onde "12345123" é o CEP (sem traço, apenas números).

        // remove o "-" (traço) da variável 'cep'.
        cep = cep.replace("-", "");

        // Exibe o spiner de 'Carregando' antes de chamar a API.
        loadingOverlay.classList.add('d-flex');
        loadingOverlay.classList.remove('d-none');

        fetch('https://viacep.com.br/ws/'+cep+'/json/')
            .then(function(response) {
                // Oculta o spiner de 'Carregando' ao receber a resposta da API.
                loadingOverlay.classList.add('d-none');
                loadingOverlay.classList.remove('d-flex');

                // Converte a resposta para JSON.
                return response.json(); 
            })
            .then(function(jsonResponse) {
                // Exibe a resposta da API na Console do navegador Web.
                console.log(jsonResponse);

                // A API da ViaCEP retorna a chave 'erro' quando o CEP
                // digitado é invalido.
                if(jsonResponse.erro) {
                    console.log("CEP inválido!");
                    // Exibe a mensagem de "CEP inválido!" abaixo de CEP.
                    txt_cep.classList.add("is-invalid");
                } else {
                    // Remove a mensagem de "CEP invalido!" abaixo do campo de CEP (se existir).
                    txt_cep.classList.remove("is-invalid");
                    // Preenche os campos de texto com as informaçõesretornadas pela API.
                    txt_rua.value = jsonResponse.logradouro;
                    txt_cidade.value = jsonResponse.localidade;
                    txt_bairro.value = jsonResponse.bairro;
                }
            });      
    }
}

//--------------------------------------------------------------------------
// 3. ESCUTADORES DE EVENTOS E INÍCIO
//--------------------------------------------------------------------------

txt_cep.addEventListener("keyup", consultaCEP);

jQuery(function($) {
    $("#cep").mask("99999-999");
});