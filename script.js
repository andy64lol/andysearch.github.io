const iframe = document.getElementById('browser-frame');
const urlBar = document.getElementById('url-bar');

function navigate() {
    let url = urlBar.value;
    if (!url) {
        alert('Please enter a URL');
        return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
    }
    
    const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
    const headers = {
        'Origin': window.location.origin,
        'X-Requested-With': 'XMLHttpRequest'
    };
    
    fetch(proxyUrl, { method: 'GET', headers: headers })
        .then(response => response.text())
        .then(data => {
            iframe.srcdoc = data;
        })
        .catch(error => {
            console.error('Error fetching the URL:', error);
        });
}

function goBack() {
    iframe.contentWindow.history.back();
}

function goForward() {
    iframe.contentWindow.history.forward();
}

function refreshPage() {
    iframe.contentWindow.location.reload();
}

urlBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') navigate();
});

urlBar.value = 'https://andy64lol.github.io/4ndysearch.github.io/start_page.html';
navigate();
