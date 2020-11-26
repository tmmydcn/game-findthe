/* copyright tmmydcn */

let isInit;

/* init */
function init() {
	isInit = true;

	ElementUtils_setVisibility("header", "visible");
	ElementUtils_setVisibility("canvas", "visible");
	ElementUtils_setVisibility("footer", "visible");

	initSettings();
	initGame();
	calculateCanvasDimensions();

	updateLanguage(language);
	updateTheme(theme);
	updateSound(isSoundOn);

	addEventListeners();

	showSettings();
}

/* updateLanguage */
function updateLanguage(lngg) {
	language = lngg;

	ElementUtils_setClass("button-settings-language-en", "button");
	ElementUtils_setClass("button-settings-language-nl", "button");
	ElementUtils_setClass("button-settings-language-" + language, "button button-selected");

	document.documentElement.setAttribute("lang", language);

	updateMessages();
	updateMessagesGame();
}

/* updateTheme */
function updateTheme(thm) {
	theme = thm;

	ElementUtils_setAttribute("image-favicon-32x32", "href", "images/favicon-" + theme + "-32x32.png");
	ElementUtils_setAttribute("image-favicon-64x64", "href", "images/favicon-" + theme + "-64x64.png");
	ElementUtils_setAttribute("image-favicon-128x128", "href", "images/favicon-" + theme + "-128x128.png");

	ElementUtils_setDisplay("image-object-default", "none");
	ElementUtils_setDisplay("image-object-frog", "none");
	ElementUtils_setDisplay("image-object-pig", "none");
	ElementUtils_setDisplay("image-object-" + theme, "initial");

	ElementUtils_setClass("button-settings-theme-default", "button");
	ElementUtils_setClass("button-settings-theme-frog", "button");
	ElementUtils_setClass("button-settings-theme-pig", "button");
	ElementUtils_setClass("button-settings-theme-" + theme, "button button-selected");

	document.documentElement.setAttribute("theme", theme);

	updateMessages();
	updateMessagesGame();
	updateThemeGame();
}

/* updateMessages */
function updateMessages() {
	ElementUtils_setText("title-browser", getMessage("title.main"));

	ElementUtils_setAttribute("meta-description", "content", getMessage("text.description"));
	ElementUtils_setAttribute("meta-open-graph-title", "content", getMessage("title.main"));
	ElementUtils_setAttribute("meta-open-graph-description", "content", getMessage("text.description"));

	ElementUtils_setText("title-header", getMessage("title.main"));

	ElementUtils_setAttribute("image-object-default", "alt", getMessage("title.object.default"));
	ElementUtils_setAttribute("image-object-frog", "alt", getMessage("title.object.frog"));
	ElementUtils_setAttribute("image-object-pig", "alt", getMessage("title.object.pig"));

	ElementUtils_setAttribute("image-restart", "alt", getMessage("title.restart"));
	ElementUtils_setAttribute("image-ranking", "alt", getMessage("title.ranking"));
	ElementUtils_setAttribute("image-settings", "alt", getMessage("title.settings"));
	ElementUtils_setAttribute("image-help", "alt", getMessage("title.help"));

	ElementUtils_setText("title-restart", getMessage("title.restart"));
	ElementUtils_setText("text-restart", getMessage("text.restart"));
	ElementUtils_setText("button-restart-yes", getMessage("button.yes"));
	ElementUtils_setText("button-restart-no", getMessage("button.no"));

	ElementUtils_setText("title-submit-score", getMessage("title.submit.score"));
	ElementUtils_setText("text-submit-score", getMessage("text.submit.score"));
	ElementUtils_setText("button-submit-score-submit", getMessage("button.submit"));
	ElementUtils_setText("button-submit-score-cancel", getMessage("button.cancel"));

	ElementUtils_setText("title-ranking", getMessage("title.ranking"));
	ElementUtils_setText("text-ranking", getMessage("text.ranking"));
	ElementUtils_setText("button-ranking-ok", getMessage("button.ok"));

	ElementUtils_setText("title-settings-language", getMessage("title.settings.language"));
	ElementUtils_setText("button-settings-language-en", getMessage("button.settings.language.en"));
	ElementUtils_setText("button-settings-language-nl", getMessage("button.settings.language.nl"));
	ElementUtils_setText("title-settings-theme", getMessage("title.settings.theme"));
	ElementUtils_setText("button-settings-theme-default", getMessage("button.settings.theme.default"));
	ElementUtils_setText("button-settings-theme-frog", getMessage("button.settings.theme.frog"));
	ElementUtils_setText("button-settings-theme-pig", getMessage("button.settings.theme.pig"));
	ElementUtils_setText("title-settings-sound", getMessage("title.settings.sound"));
	ElementUtils_setText("button-settings-sound-true", getMessage("button.settings.sound.true"));
	ElementUtils_setText("button-settings-sound-false", getMessage("button.settings.sound.false"));
	ElementUtils_setText("button-settings-ok", getMessage("button.ok"));

	ElementUtils_setText("title-help", getMessage("title.help"));
	ElementUtils_setText("text-help", getMessage("text.help"));
	ElementUtils_setText("button-help-ok", getMessage("button.ok"));

	ElementUtils_setText("title-privacy-policy", getMessage("title.privacy.policy"));
	ElementUtils_setText("text-privacy-policy", getMessage("text.privacy.policy"));
	ElementUtils_setText("button-privacy-policy-ok", getMessage("button.ok"));

	ElementUtils_setText("text-footer-privacy-policy", getMessage("title.privacy.policy"));
	ElementUtils_setText("text-footer-copyright", getMessage("text.footer.copyright"));
}

/* updateSound */
function updateSound(ssndn) {
	isSoundOn = (ssndn === "true") || (ssndn === true);

	ElementUtils_setClass("button-settings-sound-true", "button");
	ElementUtils_setClass("button-settings-sound-false", "button");
	ElementUtils_setClass("button-settings-sound-" + isSoundOn, "button button-selected");
}

/* showRestart */
function showRestart() {
	pauseGame();
	ElementUtils_setDisplay("popup-restart", "flex");
}

/* restart */
function restart() {
	restartGame();
	closeRestart();
}

/* closeRestart */
function closeRestart() {
	ElementUtils_setDisplay("popup-restart", "none");
}

/* showSubmitScore */
function showSubmitScore() {
	removeError("text-submit-score-error");

	ElementUtils_setText("text-submit-score-score", getMessage("text.submit.score.score") + score + "x");
	ElementUtils_setValue("input-text-submit-score-player-name", localStorage.getItem("player-name"));

	ElementUtils_setDisplay("popup-submit-score", "flex");
}

/* submitScore */
function submitScore() {
	removeError("text-submit-score-error");

	localStorage.setItem("player-name", ElementUtils_getValue("input-text-submit-score-player-name").trim());

	let parameters = "";
	parameters += "player-name=" + ElementUtils_getValue("input-text-submit-score-player-name").trim();
	parameters += "&click-type=" + ((numberOfMouseClicks >= numberOfTouchClicks) ? "mouse" : "touch");
	parameters += "&\u0073\u0063\u006f\u0072\u0065=" + \u0073\u0063\u006f\u0072\u0065;

	try {
		xhr = new XMLHttpRequest();
		xhr.open("POST", "https://\u006b\u0062\u006b\u0069\u0063\u0068\u0074\u0065\u0067\u0065\u006d\u002e\u0062\u0065/projects/games/findthe/php/insertScore.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let responseText = xhr.responseText;
				if (responseText === "ok") {
					closeSubmitScore();
					showRanking();
				} else if (responseText === "error.player.name") {
					showError("text-submit-score-error", getMessage("text.submit.score.error.player.name"));
				} else if (responseText === "error.unknown" || StringUtils_isEmpty(responseText)) {
					showError("text-submit-score-error", getMessage("text.error.unknown"));
				}
			} else if (xhr.readyState === 4 && xhr.status !== 200) {
				showError("text-submit-score-error", getMessage("text.error.unknown"));
			}
		}
		xhr.send(parameters);
	} catch(e) {
		console.error(e);
		showError("text-submit-score-error", getMessage("text.error.unknown"));
	}
}

/* closeSubmitScore */
function closeSubmitScore() {
	initGame();
	ElementUtils_setDisplay("popup-submit-score", "none");
}

/* showRanking */
function showRanking() {
	pauseGame();

	removeError("text-ranking-error");
	ElementUtils_removeText("table-ranking");

	try {
		xhr = new XMLHttpRequest();
		xhr.open("POST", "https://\u006b\u0062\u006b\u0069\u0063\u0068\u0074\u0065\u0067\u0065\u006d\u002e\u0062\u0065/projects/games/findthe/php/selectRanking.php", true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let responseText = xhr.responseText;

				if (responseText !== "error.unknown" && !StringUtils_isEmpty(responseText)) {
					let JSONObjects;

					try {
						JSONObjects = JSON.parse(responseText);
					} catch(e) {
						console.error(e);
					}

					let tableRanking = "";

					for (let i = 0; i < 10; i++) {
						let rankingNumber = i + 1;
						let playerName = "";
						let currentPlayer = "";
						let clickType = "";
						let score = "";

						if (JSONObjects && i < JSONObjects.length) {
							playerName = JSONObjects[i].PlayerName;
							currentPlayer = (JSONObjects[i].PlayerName === localStorage.getItem("player-name")) ? " class='current-player'" : "";
							clickType = "<img src='images/" + JSONObjects[i].ClickType + " - " + theme + ".svg' alt='" + getMessage("title.ranking.click.type." + JSONObjects[i].ClickType) + "' />";
							score = JSONObjects[i].Score + "x";
						}

						tableRanking += "<tr><td><span>" + rankingNumber + "</span></td><td" + currentPlayer + ">" + playerName + "</td><td>" + clickType + "</td><td>" + score + "</td></tr>";
					}

					ElementUtils_setText("table-ranking", tableRanking);
				} else {
					showError("text-ranking-error", getMessage("text.error.unknown"));
				}
			} else if (xhr.readyState === 4 && xhr.status !== 200) {
				showError("text-ranking-error", getMessage("text.error.unknown"));
			}
		}
		xhr.send();
	} catch(e) {
		console.error(e);
		showError("text-ranking-error", getMessage("text.error.unknown"));
	}

	ElementUtils_setDisplay("popup-ranking", "flex");
}

/* closeRanking */
function closeRanking() {
	ElementUtils_setDisplay("popup-ranking", "none");
}

/* showSettings */
function showSettings() {
	pauseGame();
	ElementUtils_setDisplay("popup-settings", "flex");
}

/* closeSettings */
function closeSettings() {
	ElementUtils_setDisplay("popup-settings", "none");
	if (isInit) {
		isInit = false;
		showHelp();
	}
}

/* showHelp */
function showHelp() {
	pauseGame();
	ElementUtils_setDisplay("popup-help", "flex");
}

/* closeHelp */
function closeHelp() {
	ElementUtils_setDisplay("popup-help", "none");
}

/* showPrivacyPolicy */
function showPrivacyPolicy() {
	pauseGame();
	ElementUtils_setDisplay("popup-privacy-policy", "flex");
}

/* closePrivacyPolicy */
function closePrivacyPolicy() {
	ElementUtils_setDisplay("popup-privacy-policy", "none");
}

/* showError */
function showError(elementId, errorMessage) {
	ElementUtils_setDisplay(elementId, "block");
	ElementUtils_setText(elementId, errorMessage);
}

/* removeError */
function removeError(elementId) {
	ElementUtils_setDisplay(elementId, "none");
	ElementUtils_removeText(elementId);
}

/* addEventListeners */
function addEventListeners() {
	document.getElementById("form-submit-score").addEventListener("keydown", function(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			submitScore();
		}
	}, false);

	window.addEventListener("resize", function(e) {
		e.preventDefault();
		pauseGame();
		calculateCanvasDimensions();
	}, false);

	window.addEventListener("blur", function(e) {
		e.preventDefault();
		pauseGame();
	}, false);

	//prevents text selection when double clicking
	canvas.addEventListener("mousedown", (e) => e.preventDefault(), false);

	canvas.addEventListener("click", function(e) {
		e.preventDefault();
		clickedOrTouchedOnCanvas(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, CanvasUtils_isDoubleClicked(), "mouse");
	}, false);

	canvas.addEventListener("touchstart", function(e) {
		e.preventDefault();
		clickedOrTouchedOnCanvas(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, CanvasUtils_isDoubleClicked(), "touch");
	}, false);
}