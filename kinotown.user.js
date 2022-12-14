// ==UserScript==
// @name         kinotown
// @namespace    https://t.me/kinotown_bot
// @version      0.15
// @description  watch+
// @author       kinotown
// @match        https://www.kinopoisk.ru/*
// @icon         https://kinotown.bitbucket.io/favicon.ico
// @grant        none
// @downloadURL  https://github.com/Swayerka/kinotown/raw/main/kinotown.user.js
// @updateURL    https://github.com/Swayerka/kinotown/raw/main/kinotown.user.js
// ==/UserScript==

const playIco=`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg>
`;


window.addEventListener('load', function() {

    var elementBtn=document.querySelector("div[class^='styles_buttons_']")
    var btnWatch = document.createElement('div');
    btnWatch.style.scale=1
    btnWatch.onclick = openPlayer;
    btnWatch.innerHTML=`<button style="font-weight: 500;cursor: wait;border: 2px solid #ffffff;height: 50px;width: 141px;border-radius: 20px;background-color: #f2f2f2; color: black;font-size: 24px;">${playIco} Watch</button>`
    btnWatch.style.cssText = 'transition: scale 330ms ease-in-out;font-family: Graphik Kinopoisk LC Web,Tahoma,Arial,Verdana,sans-serif;';
    btnWatch.onmouseover = () => {btnWatch.style.scale=1.2};
    btnWatch.onmouseout = () => {btnWatch.style.scale=1};
    elementBtn.firstChild.append(btnWatch)

})


function openPlayer() {
    var url = window.location.href;
    var splitted = url.split('/');
    var fid = splitted[4];
    var watchPage = `http://kinotown.bitbucket.io/?id=${fid}`;
    var filmTab = window.open(watchPage, '_blank');
    filmTab.focus();
}
