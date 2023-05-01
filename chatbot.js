const chatbotMessages = document.querySelector('.chatbot-messages');
const chatbotInput = document.querySelector('.chatbot-input input');
const chatbotButton = document.querySelector('.chatbot-input button');

// Chave de API da OpenAI
const openaiApiKey = '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';

// URL da API da OpenAI
const openaiApiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// Cabeçalhos da solicitação para a API da OpenAI
const openaiApiHeaders = {
	'Content-Type': 'application/json',
	'Authorization': `Bearer ${openaiApiKey}`
};

// Função para exibir mensagens na tela
function showMessage(message, sender) {
	const chatbotMessage = document.createElement('div');
	chatbotMessage.classList.add('chatbot-message');
	if (sender === 'bot') {
		chatbotMessage.innerHTML = `<div class="chatbot-message-bot">${message}</div>`;
	} else {
		chatbotMessage.innerHTML = `<div class="chatbot-message-user">${message}</div>`;
	}
	chatbotMessages.appendChild(chatbotMessage);
}

// Função para enviar uma mensagem para o chatbot
async function sendMessage() {
	const message = chatbotInput.value.trim();
	if (message !== '') {
		showMessage(message, 'user');
		chatbotInput.value = '';
		const response = await fetch(openaiApiUrl, {
			method: 'POST',
			headers: openaiApiHeaders,
			body: JSON.stringify({
				prompt: message,
				max_tokens: 50,
				temperature: 0.5
			})
		});
		const data = await response.json();
		showMessage(data.choices[0].text.trim(), 'bot');
	}
}

// Evento de clique no botão de enviar mensagem
chatbotButton.addEventListener('click', sendMessage);

// Evento de pressionar a tecla Enter no campo de entrada de texto
chatbotInput.addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		sendMessage();
	}
});
