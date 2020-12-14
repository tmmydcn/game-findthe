/* copyright tmmydcn */

/* getMessage */
function getMessage(key) {
	let message = searchMessage(language + "." + key);

	if (StringUtils_isEmpty(message)) {
		message = searchMessage(language + "." + theme + "." + key);
	}

	return message;
}

/* searchMessage */
function searchMessage(key) {
	switch (key) {

		/* EN */
		case "en.title.object.default":					return "Object Default";
		case "en.title.object.frog":					return "Object Frog";
		case "en.title.object.pig":						return "Object Pig";
		case "en.title.restart":						return "Restart";
		case "en.text.restart":							return "Are you sure you want to restart?";
		case "en.title.submit.score":					return "Submit Score";
		case "en.text.submit.score.error.player.name":	return "The player name must consist of 5 to 25 characters. The allowed characters are: letters, uppercase letters, numbers and underscores."
		case "en.text.submit.score.score":				return "Your score: ";
		case "en.text.submit.score":					return "Fill in a player name and press SUBMIT to add your score to the ranking.";
		case "en.title.ranking":						return "Ranking";
		case "en.text.ranking":							return "Only the first 10 scores are shown. In the event of an equal score, the score first achieved is placed at the top.";
		case "en.title.ranking.click.type.mouse":		return "Mouse";
		case "en.title.ranking.click.type.touch":		return "Touch";
		case "en.title.settings":						return "Settings";
		case "en.title.settings.language":				return "Language";
		case "en.button.settings.language.en":			return "English";
		case "en.button.settings.language.nl":			return "Nederlands";
		case "en.title.settings.theme":					return "Theme";
		case "en.button.settings.theme.default":		return "Default";
		case "en.button.settings.theme.frog":			return "Frog";
		case "en.button.settings.theme.pig":			return "Pig";
		case "en.title.settings.sound":					return "Sound";
		case "en.button.settings.sound.true":			return "On";
		case "en.button.settings.sound.false":			return "Off";
		case "en.title.help":							return "Help";
		case "en.title.privacy.policy":					return "Privacy Policy";
		case "en.text.privacy.policy":					return "No personal information is collected except for your player name. The player name is collected to be able to add your score to the ranking. Adding your score to the ranking is not mandatory. No personal information is passed on to third parties. You always have the right to request, change or delete your data. For this, you can send an email to <a href='mailto:tmmydcn@outlook.com'>tmmydcn@outlook.com</a>.";
		case "en.text.error.unknown":					return "Unknown error.";
		case "en.button.ok":							return "OK";
		case "en.button.yes":							return "YES";
		case "en.button.no":							return "NO";
		case "en.button.submit":						return "SUBMIT";
		case "en.button.cancel":						return "CANCEL";
		case "en.text.footer.copyright":				return "&#x00A9; tmmydcn";

		/* EN-CANVAS */
		case "en.canvas.text.start":					return "Double click to start...";
		case "en.canvas.text.nohit":					return "No hit.";
		case "en.canvas.text.hit":						return "Hit!";
		case "en.canvas.text.perfecthit":				return "Perfect hit! +5 seconds";
		case "en.canvas.text.paused":					return "Paused... Double click to continue playing...";
		case "en.canvas.text.gameover":					return "Game over... Double click to submit your score...";

		/* EN-THEME-DEFAULT */
		case "en.default.title.main":					return "Find the ... circle";
		case "en.default.text.description":				return "4 arrows point to an invisible circle. Try to guess the position of the circle and collect as many circles as possible.";
		case "en.default.text.help":					return "4 arrows point to an invisible circle. Try to guess the position of the circle by clicking on the screen. You have 30 seconds to collect as many circles as possible. You get 5 extra seconds when you hit a circle perfectly in the middle.";

		/* EN-THEME-FROG */
		case "en.frog.title.main":						return "Find the ... frog";
		case "en.frog.text.description":				return "4 arrows point to an invisible frog. Try to guess the position of the frog and collect as many frogs as possible.";
		case "en.frog.text.help":						return "4 arrows point to an invisible frog. Try to guess the position of the frog by clicking on the screen. You have 30 seconds to collect as many frogs as possible. You get 5 extra seconds when you hit a frog perfectly in the middle.";

		/* EN-THEME-PIG */
		case "en.pig.title.main":						return "Find the ... pig";
		case "en.pig.text.description":					return "4 arrows point to an invisible pig. Try to guess the position of the pig and collect as many pigs as possible.";
		case "en.pig.text.help":						return "4 arrows point to an invisible pig. Try to guess the position of the pig by clicking on the screen. You have 30 seconds to collect as many pigs as possible. You get 5 extra seconds when you hit a pig perfectly in the middle.";

		/* NL */
		case "nl.title.object.default":					return "Object Standaard";
		case "nl.title.object.frog":					return "Object Kikker";
		case "nl.title.object.pig":						return "Object Varken";
		case "nl.title.restart":						return "Herstarten";
		case "nl.text.restart":							return "Ben je zeker dat je wilt herstarten?";
		case "nl.title.submit.score":					return "Score Versturen";
		case "nl.text.submit.score.error.player.name":	return "De spelersnaam moet uit 5 tot 25 karakters bestaan. De toegestane karakters zijn: letters, hoofdletters, cijfers en underscores.";
		case "nl.text.submit.score.score":				return "Jouw score: ";
		case "nl.text.submit.score":					return "Vul een spelersnaam in en druk op VERSTUREN om je score toe te voegen aan het klassement."
		case "nl.title.ranking":						return "Klassement";
		case "nl.text.ranking":							return "Alleen de eerste 10 scores worden getoond. Bij een gelijke score, wordt de score die het eerst werd behaald bovenaan geplaatst.";
		case "nl.title.ranking.click.type.mouse":		return "Muis";
		case "nl.title.ranking.click.type.touch":		return "Touch";
		case "nl.title.settings":						return "Instellingen";
		case "nl.title.settings.language":				return "Taal";
		case "nl.button.settings.language.en":			return "English";
		case "nl.button.settings.language.nl":			return "Nederlands";
		case "nl.title.settings.theme":					return "Thema";
		case "nl.button.settings.theme.default":		return "Standaard";
		case "nl.button.settings.theme.frog":			return "Kikker";
		case "nl.button.settings.theme.pig":			return "Varken";
		case "nl.title.settings.sound":					return "Geluid";
		case "nl.button.settings.sound.true":			return "Aan";
		case "nl.button.settings.sound.false":			return "Uit";
		case "nl.title.help":							return "Help";
		case "nl.title.privacy.policy":					return "Privacybeleid";
		case "nl.text.privacy.policy":					return "Met uitzondering van uw spelersnaam worden er geen persoonlijke gegevens verzameld. De spelersnaam wordt verzameld om uw score toe te kunnen voegen aan het klassement. Het toevoegen van uw score aan het klassement is niet verplicht. Er worden geen persoonlijke gegevens doorgegeven aan derde partijen. U hebt altijd het recht uw gegevens op te vragen, aan te passen of te verwijderen. Hiervoor kunt u een e-mail sturen naar <a href='mailto:tmmydcn@outlook.com'>tmmydcn@outlook.com</a>.";
		case "nl.text.error.unknown":					return "Onbekende fout."
		case "nl.button.ok":							return "OK";
		case "nl.button.yes":							return "JA";
		case "nl.button.no":							return "NEE";
		case "nl.button.submit":						return "VERSTUREN";
		case "nl.button.cancel":						return "ANNULEREN";
		case "nl.text.footer.copyright":				return "&#x00A9; tmmydcn";

		/* NL-CANVAS */
		case "nl.canvas.text.start":					return "Dubbelklik om te starten...";
		case "nl.canvas.text.nohit":					return "Niets geraakt.";
		case "nl.canvas.text.hit":						return "Geraakt!";
		case "nl.canvas.text.perfecthit":				return "Perfect geraakt! +5 seconden";
		case "nl.canvas.text.paused":					return "Gepauzeerd... Dubbelklik om verder te spelen...";
		case "nl.canvas.text.gameover":					return "Game over... Dubbelklik om je score te versturen...";

		/* NL-THEME-DEFAULT */
		case "nl.default.title.main":					return "Vind de ... cirkel";
		case "nl.default.text.description":				return "4 pijlen wijzen naar een onzichtbare cirkel. Probeer de positie van de cirkel te raden en verzamel zoveel mogelijk cirkels.";
		case "nl.default.text.help":					return "4 pijlen wijzen naar een onzichtbare cirkel. Probeer de positie van de cirkel te raden door op het scherm te klikken. Je hebt 30 seconden om zoveel mogelijk cirkels te verzamelen. Je krijgt 5 extra seconden als je een cirkel perfect in het midden raakt.";

		/* NL-THEME-FROG */
		case "nl.frog.title.main":						return "Vind de ... kikker";
		case "nl.frog.text.description":				return "4 pijlen wijzen naar een onzichtbare kikker. Probeer de positie van de kikker te raden en verzamel zoveel mogelijk kikkers.";
		case "nl.frog.text.help":						return "4 pijlen wijzen naar een onzichtbare kikker. Probeer de positie van de kikker te raden door op het scherm te klikken. Je hebt 30 seconden om zoveel mogelijk kikkers te verzamelen. Je krijgt 5 extra seconden als je een kikker perfect in het midden raakt.";

		/* NL-THEME-PIG */
		case "nl.pig.title.main":						return "Vind het ... varken";
		case "nl.pig.text.description":					return "4 pijlen wijzen naar een onzichtbaar varken. Probeer de positie van het varken te raden en verzamel zoveel mogelijk varkens.";
		case "nl.pig.text.help":						return "4 pijlen wijzen naar een onzichtbaar varken. Probeer de positie van het varken te raden door op het scherm te klikken. Je hebt 30 seconden om zoveel mogelijk varkens te verzamelen. Je krijgt 5 extra seconden als je een varken perfect in het midden raakt.";

		default: 										return "";
	}
}
