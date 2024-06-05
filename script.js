let embeddedLinks = [];

function embedLinks() {
  const linkInput = document.getElementById('linkInput');
  const embedButton = document.getElementById('embedButton');
  const iframesContainer = document.getElementById('iframesContainer');
  const links = linkInput.value.split('\n').filter(link => link.trim() !== '');

  embedButton.disabled = true;
  iframesContainer.innerHTML = '';
  embeddedLinks = [];

  for (let i = 0; i < links.length; i++) {
    const iframeWrapper = document.createElement('div');
    iframeWrapper.setAttribute('class', 'iframeWrapper');
    iframesContainer.appendChild(iframeWrapper);

    const iframe = document.createElement('iframe');
    iframe.setAttribute('class', 'resultIframe');
    iframeWrapper.appendChild(iframe);

    const toggleButton = document.createElement('button');
    toggleButton.setAttribute('class', 'toggleButtonInFrame circle');
    toggleButton.innerHTML = '〇';
    toggleButton.onclick = ((link, toggleButton) => () => toggleLink(link, toggleButton))(links[i], toggleButton);
    iframeWrapper.appendChild(toggleButton);

    iframe.src = links[i];
    embeddedLinks.push({ link: links[i], toggleButton: toggleButton });
  }
}

function toggleLink(link, toggleButton) {
  const linksContainer = document.getElementById('linksContainer');
  const linksList = document.getElementById('linksList');
  const linkInfo = embeddedLinks.find(embeddedLink => embeddedLink.link === link);

  if (linkInfo) {
    const linkItem = document.createElement('div');
    linkItem.setAttribute('class', 'linkItem');
    linkItem.innerHTML = link;
    linksList.appendChild(linkItem);
    embeddedLinks = embeddedLinks.filter(embeddedLink => embeddedLink.link !== link);
    toggleButton.classList.toggle('circle');
    toggleButton.classList.toggle('cross');
    toggleButton.innerHTML = toggleButton.classList.contains('circle') ? '表示されたらクリック' : 'クリック済み';
  }

  linksContainer.style.display = linksList.children.length > 0 ? 'block' : 'none';
  document.getElementById('downloadLink').style.display = linksList.children.length > 0 ? 'block' : 'none';
}

function downloadLinks() {
  const linksList = document.getElementById('linksList');
  const links = Array.from(linksList.getElementsByClassName('linkItem')).map(linkItem => linkItem.innerHTML);
  const downloadLink = document.getElementById('downloadLink');
  downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(links.join('\n'));
  downloadLink.download = 'embedded_links.txt';
}
