/* copyright tmmydcn */

const \u0054\u0049\u004d\u0045\u005f\u0047\u0041\u004d\u0045 = parseInt("\u0033\u0030\u0030\u0030\u0030");
const \u0054\u0049\u004d\u0045\u005f\u0045\u0058\u0054\u0052\u0041\u005f\u0050\u0045\u0052\u0046\u0045\u0043\u0054\u005f\u0048\u0049\u0054 = parseInt("\u0035\u0030\u0030\u0030");
const TIME_SHOW_OBJ = 1250;
const TIME_TXT_ANIMATION_BLINK = 250;

let language, theme, isSoundOn;

let isError, isStarted, isClicked, isHit, isPaused, isGameOver;

let animationFrame, requestAnimationFrame, cancelAnimationFrame;

let timerGame, timerShowObj, timerTxtAnimationBlink;

let canvas;
let background, playfield, lineTop, lineRight, lineBottom, lineLeft, txt, obj, arrowTop, arrowRight, arrowBottom, arrowLeft, crosshair;
let arrayElements;

let soundHit, soundPerfectHit;

let score;

let numberOfMouseClicks, numberOfTouchClicks;

/* initSettings */
function initSettings() {
	let browserLanguage = BrowserUtils_getShortLanguage();
	if(!StringUtils_isEmpty(browserLanguage) && (browserLanguage === "en" || browserLanguage === "nl")) {
		language = browserLanguage;
	} else {
		language = "en";
	}

	theme = "default";

	isSoundOn = false;
}

/* updateMessagesGame */
function updateMessagesGame() {
	txt.updateLanguage();
	paint();
}

/* updateThemeGame */
function updateThemeGame() {
	for (let i = 0; i < arrayElements.length; i++) {
		if (arrayElements[i].updateTheme) {
			arrayElements[i].updateTheme(theme);
		}
	}

	soundHit.updateSrc("sounds/hit-" + theme + ".mp3");
	soundPerfectHit.updateSrc("sounds/perfect-hit-" + theme + ".mp3");

	paint();
}

/* calculateCanvasDimensions */
function calculateCanvasDimensions() {
	canvas.height = window.innerHeight * 0.8;
	canvas.width = window.innerWidth;

	if (canvas.width >= canvas.height * 0.85) {
		canvas.width = canvas.height / 1.5;
	}

	for (let i = 0; i < arrayElements.length; i++) {
		if (arrayElements[i].updateCanvas) {
			arrayElements[i].updateCanvas(canvas);
		}
	}

	ElementUtils_setHeightInPixels("header", window.innerHeight * 0.15);
	ElementUtils_setHeightInPixels("footer", window.innerHeight * 0.05);

	ElementUtils_setWidthInPixels("header", playfield.width);
	ElementUtils_setWidthInPixels("footer", playfield.width);

	if (isStarted) {
		calculateStartAndEndPointsForLines();
		calculateDegreesForArrows();
	}

	paint();
}

/* initGame */
function initGame() {
	isError = false;
	isStarted = false;
	isClicked = false;
	isHit = false;
	isPaused = false;
	isGameOver = false;

	animationFrame = null;
	requestAnimationFrame = null;
	cancelAnimationFrame = null;

	\u0074\u0069\u006d\u0065\u0072\u0047\u0061\u006d\u0065 = new \u0054\u0069\u006d\u0065\u0055\u0074\u0069\u006c\u0073\u005f\u0054\u0069\u006d\u0065\u0072(\u0054\u0049\u004d\u0045\u005f\u0047\u0041\u004d\u0045);
	timerShowObj = new TimeUtils_Timer(TIME_SHOW_OBJ);
	timerTxtAnimationBlink = new TimeUtils_Timer(TIME_TXT_ANIMATION_BLINK);

	canvas = document.getElementById("canvas");

	background = new Background(canvas, theme);
	playfield = new Playfield(canvas, theme);
	lineTop = new Line(canvas, theme);
	lineRight = new Line(canvas, theme);
	lineBottom = new Line(canvas, theme);
	lineLeft = new Line(canvas, theme);
	txt = new Txt(canvas, theme);
	txt.updateMessageWithKey("canvas.text.start");
	obj = new Obj(canvas, theme);
	arrowTop = new Arrow(canvas, theme, "TOP");
	arrowRight = new Arrow(canvas, theme, "RIGHT");
	arrowBottom = new Arrow(canvas, theme, "BOTTOM");
	arrowLeft = new Arrow(canvas, theme, "LEFT");
	crosshair = new Crosshair(canvas, theme);

	arrayElements = [background, playfield, lineTop, lineRight, lineBottom, lineLeft, txt, obj, arrowTop, arrowRight, arrowBottom, arrowLeft, crosshair];

	if (!soundHit) {
		soundHit = new Sound("sounds/hit-" + theme + ".mp3");
	} else {
		soundHit.updateSrc("sounds/hit-" + theme + ".mp3");
	}

	if (!soundPerfectHit) {
		soundPerfectHit = new Sound("sounds/perfect-hit-" + theme + ".mp3");
	} else {
		soundPerfectHit.updateSrc("sounds/perfect-hit-" + theme + ".mp3");
	}

	\u0073\u0063\u006f\u0072\u0065 = parseInt("\u0030");

	numberOfMouseClicks = 0;
	numberOfTouchClicks = 0;

	paint();
}

/* startGame */
function startGame() {
	if (!isStarted) {
		try {
			requestAnimationFrame = CanvasUtils_requestAnimationFrame();
			cancelAnimationFrame = CanvasUtils_cancelAnimationFrame();
			isStarted = true;
			calculateNewRandomPositionForObj();
			timerGame.start();
			animationFrame = requestAnimationFrame(animate);
		} catch(e) {
			console.error(e);
			isStarted = false;
			isError = true;
			txt.updateMessageWithKey("text.error.unknown");
			paint();
		}
	}
}

/* restartGame */
function restartGame() {
	if (isStarted || isGameOver) {
		cancelAnimationFrame(animationFrame);
		initGame();
	}
}

/* pauseGame */
function pauseGame() {
	if (isStarted && !isPaused) {
		isPaused = true;
		timerGame.pause();
		cancelAnimationFrame(animationFrame);
		ElementUtils_removeClass("image-object-" + theme);
		timerTxtAnimationBlink.stop();
		txt.updateMessageWithKey("canvas.text.paused");
		paint();
	}
}

/* unpauseGame */
function unpauseGame() {
	if (isStarted && isPaused) {
		isPaused = false;
		timerGame.unpause();
		animationFrame = requestAnimationFrame(animate);
	}
}

/* animate */
function animate() {
	if (isStarted && !isPaused) {
		if (isClicked) {
			if (timerShowObj.getTimeLeft() <= 0) {
				isClicked = false;
				isHit = false;

				timerShowObj.stop();
				ElementUtils_removeClass("image-object-" + theme);
				timerTxtAnimationBlink.stop();

				for (let i = 0; i < arrayElements.length; i++) {
					if (arrayElements[i].setIsVisible) {
						arrayElements[i].setIsVisible(false);
					}
				}

				txt.updateMessageWithoutKey("");
				txt.resetPositionOnPlayfield();

				calculateNewRandomPositionForObj();

				timerGame.unpause();
			}

			if (isHit && timerTxtAnimationBlink.getTimeLeft() <= 0) {
				txt.reverseIsVisibleText();
				timerTxtAnimationBlink.stop();
				timerTxtAnimationBlink.start();
			}
		} else {
			txt.updateMessageWithoutKey(TimeUtils_formatTimeInMillisecondsToStringInSecondsAndTenths(timerGame.getTimeLeft()));
		}

		if (timerGame.getTimeLeft() <= 0) {
			isStarted = false;
			isGameOver = true;

			txt.updateMessageWithKey("canvas.text.gameover");

			cancelAnimationFrame(animationFrame);
		}

		paint();

		if (!isGameOver) {
			animationFrame = requestAnimationFrame(animate);
		}
	}
}

/* paint */
function paint() {
	for (let i = 0; i < arrayElements.length; i++) {
		arrayElements[i].paint();
	}

	ElementUtils_setText("text-score", score + "x");
}

/* calculateNewRandomPositionForObj */
function calculateNewRandomPositionForObj() {
	obj.calculateRandomPosition();
	calculateDegreesForArrows();
	calculateStartAndEndPointsForLines();
}

/* calculateDegreesForArrows */
function calculateDegreesForArrows() {
	arrowTop.updateDegrees(obj.xCenter, obj.yCenter);
	arrowRight.updateDegrees(obj.xCenter, obj.yCenter);
	arrowBottom.updateDegrees(obj.xCenter, obj.yCenter);
	arrowLeft.updateDegrees(obj.xCenter, obj.yCenter);
}

/* calculateStartAndEndPointsForLines */
function calculateStartAndEndPointsForLines() {
	lineTop.setStartPoint(arrowTop.xCenter, arrowTop.yCenter);
	lineRight.setStartPoint(arrowRight.xCenter, arrowRight.yCenter);
	lineBottom.setStartPoint(arrowBottom.xCenter, arrowBottom.yCenter);
	lineLeft.setStartPoint(arrowLeft.xCenter, arrowLeft.yCenter);

	lineTop.setEndPoint(obj.xCenter, obj.yCenter);
	lineRight.setEndPoint(obj.xCenter, obj.yCenter);
	lineBottom.setEndPoint(obj.xCenter, obj.yCenter);
	lineLeft.setEndPoint(obj.xCenter, obj.yCenter);
}

/* clickedOrTouchedOnCanvas */
function clickedOrTouchedOnCanvas(x, y, isDoubleClicked, clickType) {
	if (!isError) {
		if (isDoubleClicked) {
			if (isGameOver) {
				showSubmitScore();
			} else if (!isStarted) {
				initGame();
				startGame();
			} else if (isPaused) {
				unpauseGame();
			}
		} else if (isStarted && !isClicked && !isPaused) {

			isClicked = true;

			timerGame.pause();

			switch (clickType) {
				case "mouse":
					numberOfMouseClicks++;
					break;
				case "touch":
					numberOfTouchClicks++;
					break;
			}

			if (obj.isPerfectHit(x, y)) {
				isHit = true;

				if (isSoundOn) {
					soundPerfectHit.play();
				}

				txt.updateMessageWithKey("canvas.text.perfecthit");

				\u0073\u0063\u006f\u0072\u0065 += parseInt("\u0031");

				\u0074\u0069\u006d\u0065\u0072\u0047\u0061\u006d\u0065.\u0061\u0064\u0064\u0045\u0078\u0074\u0072\u0061\u0054\u0069\u006d\u0065(\u0054\u0049\u004d\u0045\u005f\u0045\u0058\u0054\u0052\u0041\u005f\u0050\u0045\u0052\u0046\u0045\u0043\u0054\u005f\u0048\u0049\u0054);

				if (theme !== "default") {
					ElementUtils_setClass("image-object-" + theme, "rotate-360-degrees-for-1250ms");
				}
				timerTxtAnimationBlink.start();
			} else if(obj.isHit(x, y)) {
				isHit = true;

				if (isSoundOn) {
					soundHit.play();
				}

				txt.updateMessageWithKey("canvas.text.hit");

				\u0073\u0063\u006f\u0072\u0065 += parseInt("\u0031");

				if (theme !== "default") {
					ElementUtils_setClass("image-object-" + theme, "rotate-360-degrees-for-1250ms");
				}
				timerTxtAnimationBlink.start();
			} else {
				txt.updateMessageWithKey("canvas.text.nohit");
			}

			crosshair.updatePosition(x, y);
			txt.updatePositionOnPlayfield(obj.getVerticalPositionOnPlayfield());

			for (let i = 0; i < arrayElements.length; i++) {
				if (arrayElements[i].setIsVisible) {
					arrayElements[i].setIsVisible(true);
				}
			}

			timerShowObj.start();
		}
	}
}