document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('video-url');
    const playBtn = document.getElementById('play-btn');
    const videoPlayer = document.getElementById('video-player');
    const errorMsg = document.getElementById('error-msg');

    playBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        
        if (!url) {
            showError('Prosím, zadajte odkaz na video.');
            return;
        }

        // Kontrola základného formátu URL
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            showError('Odkaz musí začínať na http:// alebo https://');
            return;
        }

        hideError();
        loadVideo(url);
    });

    function loadVideo(url) {
        // Nastavenie zdroja pre video element
        videoPlayer.src = url;
        
        // Skusit automaticky spustit
        videoPlayer.play().catch(error => {
            console.warn('Autoplay bol zablokovaný prehliadačom alebo nastala chyba:', error);
        });
    }

    videoPlayer.addEventListener('error', () => {
        // Zobrazí chybu, ak video nie je možné načítať (napr. expirovaný link, chybné CORS)
        if (videoPlayer.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
            showError('Video sa nepodarilo načítať. Skontrolujte platnosť priameho odkazu z Webshare.');
        }
    });

    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.classList.remove('hidden');
    }

    function hideError() {
        errorMsg.classList.add('hidden');
    }
});