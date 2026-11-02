document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('video-url');
    const playBtn = document.getElementById('play-btn');
    const clearBtn = document.getElementById('clear-btn');
    const videoPlayer = document.getElementById('video-player');
    const loadingEl = document.getElementById('loading');
    const errorMsg = document.getElementById('error-msg');

    // Spustenie prehrávania pri kliknutí na tlačidlo
    playBtn.addEventListener('click', startPlayback);

    // Spustenie prehrávania stlačením klávesu Enter
    urlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            startPlayback();
        }
    });

    // Sledovanie vstupu: skrytie chyby a prepínanie tlačidla Vymazať
    urlInput.addEventListener('input', () => {
        hideError();
        toggleClearButton();
    });

    // Vymazanie textového poľa
    clearBtn.addEventListener('click', () => {
        urlInput.value = '';
        toggleClearButton();
        urlInput.focus();
    });

    function toggleClearButton() {
        if (urlInput.value.trim().length > 0) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }
    }

    function startPlayback() {
        const url = urlInput.value.trim();

        if (!url) {
            showError('Prosím, zadajte odkaz na video.');
            return;
        }

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            showError('Odkaz musí začínať na http:// alebo https://');
            return;
        }

        hideError();
        loadVideo(url);
    }

    function loadVideo(url) {
        showLoading();
        videoPlayer.src = url;

        videoPlayer.play().catch(error => {
            console.warn('Autoplay bol zablokovaný prehliadačom alebo nastala chyba:', error);
            hideLoading();
        });
    }

    // Udalosti videa pre správu stavu načítavania
    videoPlayer.addEventListener('loadstart', showLoading);
    videoPlayer.addEventListener('waiting', showLoading);
    videoPlayer.addEventListener('canplay', hideLoading);
    videoPlayer.addEventListener('playing', hideLoading);

    // Ošetrenie chýb pri načítaní streamu
    videoPlayer.addEventListener('error', () => {
        hideLoading();
        showError('Video sa nepodarilo načítať. Skontrolujte platnosť priameho odkazu z Webshare.');
    });

    function showLoading() {
        if (loadingEl) loadingEl.classList.remove('hidden');
    }

    function hideLoading() {
        if (loadingEl) loadingEl.classList.add('hidden');
    }

    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.classList.remove('hidden');
    }

    function hideError() {
        errorMsg.classList.add('hidden');
    }
});
