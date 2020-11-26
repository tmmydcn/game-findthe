/* copyright tmmydcn */

/********** STRING **********/

/* StringUtils_isEmpty */
function StringUtils_isEmpty(strng) {
	return strng.length === 0;
}

/* StringUtils_splitTextIntoSeperateSentences */
function StringUtils_splitTextIntoSeperateSentences(txt, arraySentences) {
	let arrayPunctuationMarks = [".", "?", "!"];
	let isSplitted = false;

	for (let i = 0; i < arrayPunctuationMarks.length; i++) {
		let index = txt.indexOf(arrayPunctuationMarks[i]);

		//to split special punctuation mark ...
		if (index !== -1 && index + 2 < txt.length && txt[index + 2] === ".") {
			index += 2;
		}

		if (index !== -1 && index + 1 < txt.length && txt[index + 1] === " ") {
			isSplitted = true;
			StringUtils_splitTextIntoSeperateSentences(txt.substr(0, index + 1).trim(), arraySentences);
			StringUtils_splitTextIntoSeperateSentences(txt.substr(index + 1, txt.length + 1).trim(), arraySentences);
			break;
		}
	}

	if (!isSplitted) {
		arraySentences.push(txt);
	}
}

/********** MATH **********/

/* MathUtils_round */
function MathUtils_round(number, numberOfDecimals) {
	return Math.round(number * Math.pow(10, numberOfDecimals)) / Math.pow(10, numberOfDecimals);
}

/* MathUtils_getRandomNumberBetweenTwoValuesWithValuesIncluded */
function MathUtils_getRandomNumberBetweenTwoValuesWithValuesIncluded(minimumValue, maximumValue) {
	return Math.floor(Math.random() * (maximumValue - minimumValue + 1)) + minimumValue;
}

/* MathUtils_calculateDegreesOfCornerOfRightAngledTriangle */
function MathUtils_calculateDegreesOfCornerOfRightAngledTriangle(lengthAdjacentSide, lengthOppositeSide) {
	return Math.atan(lengthOppositeSide / lengthAdjacentSide) * 180 / Math.PI;
}

/********** BROWSER **********/

/* BrowserUtils_getFullLanguage */
function BrowserUtils_getFullLanguage() {
	return window.navigator.language;
}

/* BrowserUtils_getShortLanguage */
function BrowserUtils_getShortLanguage() {
	return BrowserUtils_getFullLanguage().substr(0, 2);
}

/********** ELEMENT **********/

/* ElementUtils_setText */
function ElementUtils_setText(elementId, txt) {
	document.getElementById(elementId).innerHTML = txt;
}

/* ElementUtils_removeText */
function ElementUtils_removeText(elementId) {
	document.getElementById(elementId).innerHTML = "";
}

/* ElementUtils_getValue */
function ElementUtils_getValue(elementId) {
	return document.getElementById(elementId).value;
}

/* ElementUtils_setValue */
function ElementUtils_setValue(elementId, value) {
	document.getElementById(elementId).value = value;
}

/* ElementUtils_setClass */
function ElementUtils_setClass(elementId, className) {
	document.getElementById(elementId).className = className;
}

/* ElementUtils_removeClass */
function ElementUtils_removeClass(elementId) {
	document.getElementById(elementId).removeAttribute("class");
}

/* ElementUtils_setAttribute */
function ElementUtils_setAttribute(elementId, attribute, value) {
	document.getElementById(elementId).setAttribute(attribute, value);
}

/* ElementUtils_removeAttribute */
function ElementUtils_removeAttribute(elementId, attribute) {
	document.getElementById(elementId).removeAttribute(attribute);
}

/* ElementUtils_setWidthInPixels */
function ElementUtils_setWidthInPixels(elementId, width) {
	document.getElementById(elementId).style.width = width + "px";
}

/* ElementUtils_setHeightInPixels */
function ElementUtils_setHeightInPixels(elementId, height) {
	document.getElementById(elementId).style.height = height + "px";
}

/* ElementUtils_setDisplay */
function ElementUtils_setDisplay(elementId, display) {
	document.getElementById(elementId).style.display = display;
}

/* ElementUtils_setVisibility */
function ElementUtils_setVisibility(elementId, visibility) {
	document.getElementById(elementId).style.visibility = visibility;
}

/********** CSS **********/

/* CSSUtils_getVariable */
function CSSUtils_getVariable(variable) {
	return getComputedStyle(document.body).getPropertyValue(variable);
}

/********** COLOR **********/

/* ColorUtils_hexadecimalToRgba */
function ColorUtils_hexadecimalToRgba(hexadecimal, alpha) {
	hexadecimal = hexadecimal.trim();

	let r = parseInt(hexadecimal.slice(1, 3), 16);
	let g = parseInt(hexadecimal.slice(3, 5), 16);
	let b = parseInt(hexadecimal.slice(5, 7), 16);

	return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

/********** CANVAS **********/

/* CanvasUtils_requestAnimationFrame */
function CanvasUtils_requestAnimationFrame() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
}

/* CanvasUtils_cancelAnimationFrame */
function CanvasUtils_cancelAnimationFrame() {
	return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame;
}

/* CanvasUtils_rotateElement */
function CanvasUtils_rotateElement(ctx, xCenter, yCenter, degrees, callbackFunctionPaint) {
	ctx.translate(xCenter, yCenter);
	ctx.rotate(degrees * Math.PI / 180);
	ctx.translate(-xCenter, -yCenter);

	callbackFunctionPaint();

	ctx.setTransform(1, 0, 0, 1, 0, 0);
}

/* CanvasUtils_isDoubleClicked */
let timeLastClicked;
function CanvasUtils_isDoubleClicked() {
	if (timeLastClicked > 0 && TimeUtils_getCurrentBrowserTimeInMilliseconds() - timeLastClicked <= 500) {
		timeLastClicked = TimeUtils_getCurrentBrowserTimeInMilliseconds();
		return true;
	} else {
		timeLastClicked = TimeUtils_getCurrentBrowserTimeInMilliseconds();
		return false;
	}
}

/********** TIME **********/

/* TimeUtils_getCurrentTimeInMilliseconds */
function TimeUtils_getCurrentBrowserTimeInMilliseconds() {
	return performance.now();
}

/* TimeUtils_formatTimeInMillisecondsToStringInSecondsAndTenths */
function TimeUtils_formatTimeInMillisecondsToStringInSecondsAndTenths(timeInMilliseconds) {
	return (timeInMilliseconds / 1000).toFixed(1);
}

/* TimeUtils_Timer */
class TimeUtils_Timer {

	constructor(startTime) {
		this.startTime = startTime;
		this.init();
	}

	init() {
		this.timeLeft = this.startTime;
		this.browserTimeWhenStarted = 0;
		this.browserTimeWhenPaused = 0;
		this.timePaused = 0;
		this.extraTime = 0;
		this.isStarted = false;
		this.isPaused = false;
	}

	start() {
		if (!this.isStarted) {
			this.isStarted = true;
			this.browserTimeWhenStarted = TimeUtils_getCurrentBrowserTimeInMilliseconds();
		}
	}

	stop() {
		if (this.isStarted) {
			this.init();
		}
	}

	pause() {
		if (this.isStarted && !this.isPaused) {
			this.isPaused = true;
			this.browserTimeWhenPaused = TimeUtils_getCurrentBrowserTimeInMilliseconds();
			this.calculateTimeLeft();
		}
	}

	unpause() {
		if (this.isStarted && this.isPaused) {
			this.isPaused = false;
			this.timePaused += TimeUtils_getCurrentBrowserTimeInMilliseconds() - this.browserTimeWhenPaused;
		}
	}

	addExtraTime(extraTime) {
		this.extraTime += extraTime;
	}

	calculateTimeLeft() {
		this.timeLeft = MathUtils_round(this.startTime - (TimeUtils_getCurrentBrowserTimeInMilliseconds() - this.browserTimeWhenStarted) + this.timePaused + this.extraTime, 0);
		if (this.timeLeft < 0) {
			this.timeLeft = 0;
		}
	}

	getTimeLeft() {
		if (this.isStarted && !this.isPaused) {
			this.calculateTimeLeft();
		}
		return this.timeLeft;
	}
}