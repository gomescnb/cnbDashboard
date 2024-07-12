document.addEventListener('DOMContentLoaded', function() {
    fetch('https://ptax.bcb.gov.br/ptax_internet/consultarTodasAsMoedas.do?method=consultaTodasMoedas', { mode: 'no-cors' })
        .then(response => {
            // Since the response is opaque, we can't directly read it
            // Instead, we'll set the URL as an iframe source to display the content
            let iframe = document.createElement('iframe');
            iframe.src = 'https://ptax.bcb.gov.br/ptax_internet/consultarTodasAsMoedas.do?method=consultaTodasMoedas';
            iframe.width = '100%';
            iframe.height = '800px';
            document.getElementById('content').innerHTML = '';
            document.getElementById('content').appendChild(iframe);
        })
        .catch(error => {
            document.getElementById('content').innerHTML = 'Erro ao carregar conteúdo.';
            console.error('Error fetching the HTML content:', error);
        });
});
