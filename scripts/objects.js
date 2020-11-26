/* copyright tmmydcn */

const PLAYFIELD_PADDING = 0.035 + 0.007;
const LINE_WIDTH_DASH = 0.005;
const LINE_WIDTH_GAP = 0.005;
const LINE_HEIGHT = 0.0025;
const TXT_FONT_SIZE = 0.025;
const OBJ_WIDTH = 0.14;
const OBJ_HEIGHT = 0.14;
const ARROW_WIDTH = 0.07
const ARROW_HEIGHT = 0.07;
const ARROW_PADDING = 0.007;
const CROSSHAIR_WIDTH = 0.015;
const CROSSHAIR_HEIGHT = 0.015;

/********** BACKGROUND **********/
class Background {

	constructor(canvas, theme) {
		this.canvas;
		this.ctx;
		this.width;
		this.height;
		this.x;
		this.y;
		this.theme;
		this.fillStyle;

		this.updateCanvas(canvas);
		this.updateTheme(theme);
	}

	updateCanvas(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");

		this.calculateDimensions();
		this.calculatePosition();
	}

	calculateDimensions() {
		this.width = MathUtils_round(this.canvas.width, 0);
		this.height = MathUtils_round(this.canvas.height, 0);
	}

	calculatePosition() {
		this.x = 0;
		this.y = 0;
	}

	updateTheme(theme) {
		this.theme = theme;
		this.fillStyle = CSSUtils_getVariable("--color-0");
	}

	paint()	{
		this.ctx.fillStyle = this.fillStyle;
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

/********** PLAYFIELD **********/
class Playfield {

	constructor(canvas, theme) {
		this.canvas;
		this.ctx;
		this.width;
		this.height;
		this.x;
		this.y;
		this.theme;
		this.fillStyle;

		this.updateCanvas(canvas);
		this.updateTheme(theme);
	}

	updateCanvas(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");

		this.calculateDimensions();
		this.calculatePosition();
	}

	calculateDimensions() {
		this.width = MathUtils_round(this.canvas.width - (this.canvas.height * PLAYFIELD_PADDING * 2), 0);
		this.height = MathUtils_round(this.canvas.height - (this.canvas.height * PLAYFIELD_PADDING * 2), 0);
	}

	calculatePosition() {
		this.x = MathUtils_round(this.canvas.height * PLAYFIELD_PADDING, 0);
		this.y = MathUtils_round(this.canvas.height * PLAYFIELD_PADDING, 0);
	}

	updateTheme(theme) {
		this.theme = theme;
		this.fillStyle = CSSUtils_getVariable("--color-4");
	}

	paint()	{
		this.ctx.fillStyle = this.fillStyle;
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

/********** LINE **********/
class Line {

	constructor(canvas, theme) {
		this.canvas;
		this.ctx;
		this.widthDash;
		this.widthGap;
		this.height;
		this.xStart;
		this.yStart;
		this.xEnd;
		this.yEnd;
		this.theme;
		this.strokeStyle;
		this.isVisible = false;

		this.updateCanvas(canvas);
		this.updateTheme(theme);
	}

	updateCanvas(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");

		this.calculateDimensions();
		this.setStartPoint(0, 0);
		this.setEndPoint(0, 0);
	}

	calculateDimensions() {
		this.widthDash = MathUtils_round(this.canvas.height * LINE_WIDTH_DASH, 0);
		this.widthGap = MathUtils_round(this.canvas.height * LINE_WIDTH_GAP, 0);
		this.height = MathUtils_round(this.canvas.height * LINE_HEIGHT, 0);
	}

	setStartPoint(x, y) {
		this.xStart = MathUtils_round(x, 0);
		this.yStart = MathUtils_round(y, 0);
	}

	setEndPoint(x, y) {
		this.xEnd = MathUtils_round(x, 0);
		this.yEnd = MathUtils_round(y, 0);
	}

	updateTheme(theme) {
		this.theme = theme;
		this.strokeStyle = CSSUtils_getVariable("--color-3");
	}

	setIsVisible(isVisible) {
		this.isVisible = isVisible;
	}

	paint()	{
		if (this.isVisible) {
			this.ctx.beginPath();
			this.ctx.moveTo(this.xStart, this.yStart);
			this.ctx.lineTo(this.xEnd, this.yEnd);
			this.ctx.setLineDash([this.widthDash, this.widthGap]);
			this.ctx.strokeStyle = this.strokeStyle;
			this.ctx.lineWidth = this.height;
			this.ctx.stroke();
		}
	}
}

/********** TXT **********/
class Txt {

	constructor(canvas, theme) {
		this.canvas;
		this.ctx;
		this.fontSize;
		this.widthBackground;
		this.heightBackground;
		this.verticalPositionOnPlayfield = "MIDDLE";
		this.xText;
		this.yText;
		this.xBackground;
		this.yBackground;
		this.theme;
		this.fontFamily;
		this.fillStyleText;
		this.filleStyleBackground;
		this.key = "";
		this.message = "";
		this.messages = [];
		this.isVisibleText = true;

		this.updateCanvas(canvas);
		this.updateTheme(theme);
	}

	updateCanvas(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");

		this.calculateDimensions();
		this.calculatePosition();
	}

	calculateDimensions() {
		this.fontSize = MathUtils_round(this.canvas.height * TXT_FONT_SIZE, 0);
		this.widthBackground = MathUtils_round(this.canvas.width - ((this.canvas.height * (ARROW_WIDTH + (ARROW_PADDING * 4))) * 2), 0);
		this.heightBackground = MathUtils_round(this.fontSize * 2, 0);
	}

	calculatePosition() {
		this.xText = MathUtils_round(this.canvas.width / 2, 0);

		switch (this.verticalPositionOnPlayfield) {
			case "TOP":
				this.yText = this.canvas.height * 0.25;
				break;
			case "MIDDLE":
				this.yText = this.canvas.height * 0.50;
				break;
			case "BOTTOM":
				this.yText = this.canvas.height * 0.75;
				break;
		}

		this.xBackground = MathUtils_round(this.canvas.height * (ARROW_WIDTH + (ARROW_PADDING * 4)), 0);
		this.yBackground = MathUtils_round(this.yText - this.fontSize, 0);
	}

	updatePositionOnPlayfield(verticalPositionOnPlayfieldOfObj) {
		switch (verticalPositionOnPlayfieldOfObj) {
			case "Q1":
				this.verticalPositionOnPlayfield = "MIDDLE";
				break;
			case "Q2":
				this.verticalPositionOnPlayfield = "BOTTOM";
				break;
			case "Q3":
				this.verticalPositionOnPlayfield = "TOP";
				break;
			case "Q4":
				this.verticalPositionOnPlayfield = "MIDDLE";
				break;
		}

		this.calculatePosition();
	}

	resetPositionOnPlayfield() {
		this.verticalPositionOnPlayfield = "MIDDLE";
		this.calculatePosition();
	}

	updateTheme(theme) {
		this.theme = theme;
		this.fontFamily = CSSUtils_getVariable("--font-family");
		this.fillStyleText = CSSUtils_getVariable("--color-3");
		this.fillStyleBackground = CSSUtils_getVariable("--color-4");
	}

	updateMessageWithoutKey(message) {
		this.key = "";
		this.updateMessage(message);
	}

	updateMessageWithKey(key) {
		this.key = key;
		this.updateMessage(getMessage(this.key));
	}

	updateLanguage() {
		if (!StringUtils_isEmpty(this.key)) {
			this.updateMessage(getMessage(this.key));
		}
	}

	updateMessage(message) {
		this.message = message;
		this.messages = [];
		StringUtils_splitTextIntoSeperateSentences(this.message, this.messages);
		this.isVisibleText = true;
	}

	reverseIsVisibleText() {
		this.isVisibleText = !this.isVisibleText;
	}

	paint()	{
		for (let i = 0; i < this.messages.length; i++) {
			this.ctx.fillStyle = this.fillStyleBackground;
			this.ctx.fillRect(this.xBackground, this.yBackground + ((this.fontSize * -(this.messages.length - 1)) + (this.fontSize * 2 * i)), this.widthBackground, this.heightBackground);

			if (this.isVisibleText) {
				this.ctx.font = this.fontSize + "px " + this.fontFamily;
				this.ctx.fillStyle = this.fillStyleText;
				this.ctx.textAlign = "center";
				this.ctx.textBaseline = "middle";
				this.ctx.fillText(this.messages[i], this.xText, this.yText + ((this.fontSize * -(this.messages.length - 1)) + (this.fontSize * 2 * i)));
			}
		}
	}
}

/********** OBJ **********/
class Obj {

	constructor(canvas, theme) {
		this.canvas;
		this.ctx;
		this.width;
		this.height;
		this.x;
		this.y;
		this.xAsPercentageOfCanvasWidth;
		this.yAsPercentageOfCanvasHeight;
		this.xCenter;
		this.yCenter;
		this.theme;
		this.img = new Image();
		this.isVisible = false;

		this.updateCanvas(canvas);
		this.updateTheme(theme);
	}

	updateCanvas(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");

		this.calculateDimensions();
		this.calculatePosition();
	}

	calculateDimensions() {
		this.width = MathUtils_round(this.canvas.height * OBJ_WIDTH, 0);
		this.height = MathUtils_round(this.canvas.height * OBJ_HEIGHT, 0);
	}

	calculatePosition()	{
		this.x = MathUtils_round(this.xAsPercentageOfCanvasWidth * this.canvas.width, 0);
		this.y = MathUtils_round(this.yAsPercentageOfCanvasHeight * this.canvas.height, 0);

		this.calculateCenter();
	}

	calculateRandomPosition() {
		this.x = MathUtils_round(MathUtils_getRandomNumberBetweenTwoValuesWithValuesIncluded(this.canvas.height * PLAYFIELD_PADDING, this.canvas.width - (this.canvas.height * PLAYFIELD_PADDING) - this.width), 0);
		this.y = MathUtils_round(MathUtils_getRandomNumberBetweenTwoValuesWithValuesIncluded(this.canvas.height * PLAYFIELD_PADDING, this.canvas.height - (this.canvas.height * PLAYFIELD_PADDING) - this.height), 0);
		this.xAsPercentageOfCanvasWidth = this.x / this.canvas.width;
		this.yAsPercentageOfCanvasHeight = this.y / this.canvas.height;

		this.calculateCenter();
	}

	calculateCenter() {
		this.xCenter = MathUtils_round(this.x + (this.width / 2), 0);
		this.yCenter = MathUtils_round(this.y + (this.height / 2), 0);
	}

	getVerticalPositionOnPlayfield() {
		let verticalPositionOnPlayfield = this.yCenter / this.canvas.height * 100;

		if (verticalPositionOnPlayfield <= 25) {
			return "Q1";
		} else if (verticalPositionOnPlayfield <= 50) {
			return "Q2";
		} else if (verticalPositionOnPlayfield <= 75) {
			return "Q3";
		} else if (verticalPositionOnPlayfield <= 100) {
			return "Q4";
		}
	}

	updateTheme(theme) {
		this.theme = theme;
		this.img.src = "images/object-" + this.theme + ".svg";
	}

	isPerfectHit(x, y) {
		let radius = this.width / 2;
		if (Math.sqrt(Math.pow(x - this.xCenter, 2) + Math.pow(y - this.yCenter, 2)) <= radius / 4) {
			return true;
		}
		return false;
	}

	isHit(x, y) {
		let radius = this.width / 2;
		if (Math.sqrt(Math.pow(x - this.xCenter, 2) + Math.pow(y - this.yCenter, 2)) <= radius) {
			return true;
		}
		return false;
	}

	setIsVisible(isVisible) {
		this.isVisible = isVisible;
	}

	paint()	{
		this.img.onload = function() {
			paint();
		}
		if (this.isVisible) {
			this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		}
	}
}

/********** ARROW **********/
class Arrow {

	constructor(canvas, theme, type) {
		this.canvas;
		this.ctx;
		this.width;
		this.height;
		this.type = type;
		this.x;
		this.y;
		this.xCenter;
		this.yCenter;
		this.defaultDegrees;
		this.degrees;
		this.theme;
		this.img = new Image();

		this.updateCanvas(canvas);
		this.updateTheme(theme);
	}

	updateCanvas(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");

		this.calculateDimensions();
		this.calculatePosition();
	}

	calculateDimensions() {
		this.width = MathUtils_round(this.canvas.height * ARROW_WIDTH, 2);
		this.height = MathUtils_round(this.canvas.height * ARROW_HEIGHT, 2);
	}

	calculatePosition()	{
		switch (this.type) {
			case "TOP":
				this.x = MathUtils_round((this.canvas.width / 2) - (this.width / 2), 2);
				this.y = MathUtils_round(this.canvas.height * ARROW_PADDING, 2);
				this.defaultDegrees = 180;
				break;
			case "RIGHT":
				this.x = MathUtils_round(this.canvas.width - this.width - (this.canvas.height * ARROW_PADDING), 2);
				this.y = MathUtils_round((this.canvas.height / 2) - (this.height / 2), 2);
				this.defaultDegrees = -90;
				break;
			case "BOTTOM":
				this.x = MathUtils_round((this.canvas.width / 2) - (this.width / 2), 2);
				this.y = MathUtils_round(this.canvas.height - this.height - (this.canvas.height * ARROW_PADDING), 2);
				this.defaultDegrees = 0;
				break;
			case "LEFT":
				this.x = MathUtils_round(this.canvas.height * ARROW_PADDING, 2);
				this.y = MathUtils_round((this.canvas.height / 2) - (this.height / 2), 2);
				this.defaultDegrees = 90;
				break;
		}
		this.degrees = this.defaultDegrees;

		this.calculateCenter();
	}

	calculateCenter() {
		this.xCenter = MathUtils_round(this.x + (this.width / 2), 2);
		this.yCenter = MathUtils_round(this.y + (this.height / 2), 2);
	}

	updateDegrees(xCenterObj, yCenterObj) {
		let lengthAdjacentSide, lengthOppositeSide;

		if (this.type === "TOP" || this.type === "BOTTOM") {
			lengthAdjacentSide = this.yCenter - yCenterObj;
			lengthOppositeSide = xCenterObj - this.xCenter;
		}

		if (this.type === "RIGHT" || this.type === "LEFT") {
			lengthAdjacentSide = xCenterObj - this.xCenter;
			lengthOppositeSide = yCenterObj - this.yCenter;
		}

		this.degrees = this.defaultDegrees + MathUtils_calculateDegreesOfCornerOfRightAngledTriangle(lengthAdjacentSide, lengthOppositeSide);
	}

	updateTheme(theme) {
		this.theme = theme;
		this.img.src = "images/arrow-" + this.theme + ".svg";
	}

	paint() {
		this.img.onload = function() {
			paint();
		}
		CanvasUtils_rotateElement(this.ctx, this.xCenter, this.yCenter, this.degrees, () => this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height));
	}
}

/********** CROSSHAIR **********/
class Crosshair {

	constructor(canvas, theme) {
		this.canvas;
		this.ctx;
		this.width;
		this.height;
		this.x;
		this.y
		this.xAsPercentageOfCanvasWidth;
		this.yAsPercentageOfCanvasHeight;
		this.theme;
		this.img = new Image();
		this.isVisible = false;

		this.updateCanvas(canvas);
		this.updateTheme(theme);
	}

	updateCanvas(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");

		this.calculateDimensions();
		this.calculatePosition();
	}

	calculateDimensions() {
		this.width = MathUtils_round(this.canvas.height * CROSSHAIR_WIDTH, 0);
		this.height = MathUtils_round(this.canvas.height * CROSSHAIR_HEIGHT, 0);
	}

	calculatePosition() {
		this.x = MathUtils_round(this.xAsPercentageOfCanvasWidth * this.canvas.width, 0);
		this.y = MathUtils_round(this.yAsPercentageOfCanvasHeight * this.canvas.height, 0);
	}

	updatePosition(x, y) {
		this.x = MathUtils_round(x - (this.width / 2), 0);
		this.y = MathUtils_round(y - (this.height / 2), 0);
		this.xAsPercentageOfCanvasWidth = this.x / this.canvas.width;
		this.yAsPercentageOfCanvasHeight = this.y / this.canvas.height;
	}

	updateTheme(theme) {
		this.theme = theme;
		this.img.src = "images/crosshair.svg";
	}

	setIsVisible(isVisible) {
		this.isVisible = isVisible;
	}

	paint() {
		this.img.onload = function() {
			paint();
		}
		if (this.isVisible) {
			this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		}
	}
}

/********** SOUND **********/
class Sound {

	constructor(src) {
		this.sound = document.createElement("audio");
		this.sound.setAttribute("src", src);
		this.sound.setAttribute("preload", "auto");
		this.sound.style.display = "none";
		document.body.appendChild(this.sound);
	}

	updateSrc(src) {
		this.sound.setAttribute("src", src);
	}

	play() {
		this.sound.play();
	}
}