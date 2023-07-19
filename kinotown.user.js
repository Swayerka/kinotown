// ==UserScript==
// @name         kinotown
// @namespace    https://t.me/kinotown_bot
// @version      0.24
// @description  Add watch button on kinopoisk.ru and imdb.com
// @author       kinotown
// @match        https://www.kinopoisk.ru/*
// @match        https://www.imdb.com/title/*
// @icon         https://kinotown.bitbucket.io/favicon.ico
// @grant        none
// @downloadURL  https://github.com/Swayerka/kinotown/raw/main/kinotown.user.js
// @updateURL    https://github.com/Swayerka/kinotown/raw/main/kinotown.user.js
// ==/UserScript==

const ktLogo=`data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSI1LjA
yOCA0Ljk5NSA5NC45OTUgODkuNzQ0IiB3aWR0aD0iOTguMzM0IiBoZWlnaHQ9IjkzLjAwNSIgeG
1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNIDMwLjY4IDIyL
jA0IEMgMzQuMjU5IDE1Ljg0MyAzNy44MzggMTUuODQzIDQxLjQxNiAyMi4wNCBMIDUyLjE1IDQw
LjYzMiBDIDU1LjcyOSA0Ni44MyA1My45NCA0OS45MjkgNDYuNzgzIDQ5LjkyOSBMIDI1LjMxMyA
0OS45MjkgQyAxOC4xNTcgNDkuOTI5IDE2LjM2NyA0Ni44MyAxOS45NDYgNDAuNjMyIFoiIHN0eW
xlPSJmaWxsLXJ1bGU6IG5vbnplcm87IHBhaW50LW9yZGVyOiBzdHJva2U7IHN0cm9rZTogcmdiK
DI1NSwgMjU1LCAyNTUpOyBmaWxsOiBub25lOyBzdHJva2Utd2lkdGg6IDRweDsiIHRyYW5zZm9y
bT0ibWF0cml4KDAuODY2MDIxLCAtMC41MDAwMDcsIDAuNTAwMDA3LCAwLjg2NjAyMSwgLTEyLjA
wMDg3MywgMjIuNTM0MTE4KSIvPgogIDxwYXRoIGQ9Ik0gNjkuMTIyIDM4LjA0MiBDIDY5LjEyMi
A1NS4xODkgNTUuMjIyIDY5LjA4OSAzOC4wNzUgNjkuMDg5IEMgMjAuOTI4IDY5LjA4OSA3LjAyO
CA1NS4xODkgNy4wMjggMzguMDQyIEMgNy4wMjggMjAuODk1IDIwLjkyOCA2Ljk5NSAzOC4wNzUg
Ni45OTUgQyA1NS4yMjIgNi45OTUgNjkuMTIyIDIwLjg5NSA2OS4xMjIgMzguMDQyIFoiIHN0eWx
lPSJmaWxsOiBub25lOyBmaWxsLXJ1bGU6IG5vbnplcm87IHN0cm9rZTogcmdiKDI1NSwgMjU1LC
AyNTUwKTsgc3Ryb2tlLXdpZHRoOiA0cHg7Ii8+CiAgPHBhdGggZD0iTSA2Mi42NTggNjUuNjg3I
EwgODkuNzExIDkyLjczOSBMIDk4LjAyMyA4NC40MjggTCA3MS4zNDQgNTcuNzQ5IiBzdHlsZT0i
ZmlsbDogbm9uZTsgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kOyBzdHJva2UtbWl0ZXJsaW1pdDogNTA
7IHN0cm9rZS1saW5lam9pbjogcm91bmQ7IHBhaW50LW9yZGVyOiBmaWxsOyBzdHJva2U6IHJnYi
gyNTUsIDI1NSwgMjU1KTsgc3Ryb2tlLXdpZHRoOiA0cHg7Ii8+Cjwvc3ZnPg==`

const BTN_ID="kinotown-btn"
const KP_TYPES=["film","series"]
const KP_WILDCARD="div[class^='styles_header__']"
const IMDB_WILDCARD="section[class^='ipc-page-section']"
const KT_LINK="kinotown.bitbucket.io/"

function openPlayer(s) {
    window.open(`https://${KT_LINK}?s=${s}&id=${window.location.href.split('/')[4]}`, '_blank').focus();
}

window.onload = (event) => {
    if(window.location.hostname=='www.imdb.com'){
        addBtnImdb()
    }else if(window.location.hostname=='www.kinopoisk.ru'){
        const observer = new MutationObserver(() => checkState());
        observer.observe(document, { subtree: true, childList: true });
        checkState();
    }else{
        console.log("o")
    }

}

let lastUrl = ""
function checkState(){
	let url = window.location.href;

	if (url === lastUrl) return;
	lastUrl = url;

	let ktBtn = document.getElementById(BTN_ID);
	let kpId = window.location.href.split('/')[4];
	let kpType = window.location.href.split('/')[3];

	if (!kpId || !kpType || !KP_TYPES.includes(kpType)) {
		if (ktBtn) ktBtn.remove();
	} else {
		if (!ktBtn) addBtn();
	}
}

function addBtn(){
    var elementToFind=document.querySelector(KP_WILDCARD)
    var btnWatch = document.createElement('div');
    btnWatch.id=BTN_ID
    btnWatch.style.cssText = 'margin-top:15px;font-family: Graphik Kinopoisk LC Web,Tahoma,Arial,Verdana,sans-serif;';
    btnWatch.className=document.querySelector("button[class^='style_button__']").className
    btnWatch.innerHTML=`<img src="${ktLogo}" alt="" width="40" height="40" class="d-inline-block align-text-top"><a>Watch</a>`
    btnWatch.style.background="linear-gradient(135deg,#f50 69.91%,#d6bb00)"
    btnWatch.style.padding="0 12px"
    btnWatch.onclick = () => {openPlayer('kp')};
    elementToFind.appendChild(btnWatch)
}
function addBtnImdb(){
    var elementToFind=document.querySelector(IMDB_WILDCARD).children[1].children[1].children[0]
    var btnWatch = document.createElement('div');
    btnWatch.id=BTN_ID
    btnWatch.style.cssText = 'margin-top:4px;';
    btnWatch.className='ipc-btn ipc-btn--full-width ipc-btn--center-align-content ipc-btn--large-height ipc-btn--core-accent1 ipc-btn--theme-baseAlt sc-e2dae9eb-0 bSzABL'
    btnWatch.innerHTML=`<img src="${ktLogo}" alt="" width="40" height="40" class="d-inline-block align-text-top"><a>Watch</a>`
    btnWatch.onclick = () => {openPlayer('imdb')};
    elementToFind.appendChild(btnWatch)
}
