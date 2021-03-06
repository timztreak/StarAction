/////////////////////////////////////////////////////////////////////////////////////////////////////
// skapat av Bengt Johansson
//
// Denna programfil utgör kärnan i BProjGameJs, ett egenutvecklat enkelt ramverk för spelutveckling i
// Javascript ämnat för kursen Programmering 1 (enl. GY11).
// 
// Ramverket innehåller grundläggande funktionalitet för att stödja ett spel i Javascript.
// Det innehåller ett exempel på ett påbörjat spel Starship som är körbart, men ramverket är
// generellt för alla typer av spel. Kod som tillhör exemplet är inramad mellan "BEGIN Starship" och
// "END Starship". Det är därför lätt att lokalisera och avlägsna kopplingarna till exemplet om man
// bestämmer sig för att göra ett eget spel från grunden.
//		Ramverket baseras på Canvas i HTML5 och erbjuder en tillståndsstyrd spel-loop. Hantering
// av input från tangentbord och mus är separerat från denna programfil och ligger i input_control.js.
//
// Globala identifierare som hör till ramverket bär prefixet g. Dessa är i bokstavsordning:
//		gApp
//		gAppState
//		gAppStepCount
//		gAppTimeStep
//  	gGameContext
//		gGameHeight
//		gGameWidth
//  	gStates
//
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Version 7 2020-01-13:
// - Exemplet Starship har gjorts objektrienterat.
// - Filstrukturen har organiserats med undermappar.
// - Lagt till g som prefix på globala variabler och konstanter.
// - Förbättrad kommentering allmänt.
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Tillstånd som används av spelprogrammet
const gStates = {
	STARTING 	: 1,
	PLAYING 	: 2,
	STOPPED 	: 3,
	PAUSED 		: 4
};

var gGameContext;			// Kontexten för spelet som renderas i vår canvas
var gGameWidth;				// Spelfönstrets bredd
var gGameHeight;			// Spelfönstrets höjd
var gApp;					// Applikationen som itererande loop
var gAppState;				// Huvudtillstånd i spelprogrammet
var gAppTimeStep;			// Tiden mellan iterationer (uppdateringar) i applikationen
var gAppStepCount;			// Räknare för antal iterationer som spel-loopen genomgått

//******************* BEGIN Starship game **********************************
var NotP1;
var NotP2;
var imageObj = new Image();
var wall;
//******************* END Starship game ************************************

//==========================================================================
// Initialisering som utförs när webbsidan laddats in i webbläsaren.
//==========================================================================
function initialize() {

	// Sätt den context som spelet ska visas i.
	gGameContext = gGameCanvas.getContext("2d");
	
	// Hämta bredd och höjd på canvas från HTML-sidan.
	gGameWidth = gGameCanvas.getAttribute("width");
    gGameHeight = gGameCanvas.getAttribute("height");

	//******************* BEGIN Starship game ******************************
	// Set a target image
	imageObj.src = 'Images/spaceBackground.jpg';
	//******************* END Starship game ********************************

	// Kör igång spel-loopen.
	startApp();
}

//==========================================================================
// Startar applikationen och spel-loopen. Denna loop itererar innehållet
// periodiskt med korta intervall som ger tillräckligt snabb bilduppdatering.
//==========================================================================
function startApp() {
	// Sätt applikationens STARTING-tillstånd.
    gAppState = gStates.STARTING;

	// Sätt spelets uppdateringsintervall
	gAppTimeStep = 5;

	// Räkna applikationens uppdateringar
	gAppStepCount = 0;

	// STARTINGa applikationen (definierad av IterateApp) så att den körs med det intervall
	// som bestäms av gAppTimeStep.
	gApp = setInterval(function() { iterateApp() }, gAppTimeStep);
}

//==========================================================================
// Stoppar applikationen.
//==========================================================================
function stopApp() {
	clearInterval(gApp);
}

//==========================================================================
// Initialiserar en ny spelomgång.
//==========================================================================
function initNewGame() {
	NotP1 = new Player1(300, 750);
	NotP2 = new Player2(300, 100);
	
}

//==========================================================================
// Utför en iteration (uppdatering) av innehållet i applikationen, spelet.
//==========================================================================
function iterateApp() {
	
	switch (gAppState) {

		case gStates.STARTING :
		
			initNewGame();

			//##############################################################
			//# OBS! Skriv kod för att hantera startfönstret här.
			//##############################################################

			gAppState = gStates.PLAYING;
			break;

		case gStates.STOPPED :

			//##############################################################
			//# OBS! Tillståndet används inte f.n. och kan avlägsnas eller
			//#      användas senare.
			//##############################################################

			break;

		case gStates.PAUSED :

			if (gKeysDown[gKeyCodesP1.ESCAPE] == true) {
				// STARTINGa spelet
				gAppState = gStates.PLAYING;
			}
			break;

		case gStates.PLAYING :

			if (gKeysDown[gKeyCodesP1.ESCAPE] == true) {
				// Stoppa spelet
				gAppState = gStates.PAUSED;
			}
			else {
				update();
				draw(gGameContext);
				gAppStepCount++;
			}
			break;
    }
}

//==========================================================================
// Funktion som kan utföra alla förflyttningar i spelet.
//==========================================================================
function update() {
      

	//******************* BEGIN Starship game ******************************
	NotP1.update();
	NotP2.update();
	//******************* END Starship game ********************************
	//######################################################################
	//# OBS! Skriv din egen kod för uppdateringar här. Detta kan göras direkt
	//#      eller genom anrop till funktioner eller metoder i objekt.
	//######################################################################


	return 0;
}
//==========================================================================
// Ritar (renderar) bakgrund och alla objekt som ska visas i spelet
// Param ctx: kontexten för och referensen till den canvas som ska renderas
//==========================================================================
function draw(ctx) {
	
	//******************* BEGIN Starship game ******************************
	// Rita bakgrunden
	ctx.fillStyle = "#0000FF";
	ctx.fillRect(0, 0, gGameWidth, gGameHeight);

	// Rita målet
	ctx.drawImage(imageObj, 0, 0, 1920, 1080);

	if(gAppStepCount % 60 == 0){
		console.log(gGameWidth + " , " + gGameHeight);
	}
	
	// Låt skeppet rita sig självt och sådant som skeppet ansvarar för.
	NotP1.draw(ctx);
	NotP2.draw(ctx);
	collision(ctx);

	//******************* END Starship game ********************************
	
	//######################################################################
	//# OBS! Skriv din egen kod för rendering här. Detta kan göras direkt
	//#      eller genom anrop till andra funktioner eller metoder i objekt.
	//######################################################################
}
	//Väggar 

	class Wall{
		constructor(x, y, w, h, c){
			this.x = x;
			this.y = y;
			this.width = w;
			this.height = h;
			this.color = c;
		}
	
		draw(ctx){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	var Wall1 = new Wall(-1, 0, 3, 850, "cyan"); 
    var Wall2 = new Wall(600, 0, 3, 850, "cyan");
	var Wall3 = new Wall(0, 422, 600, 5, "cyan");
	var spawn1 = new Wall(300, 750, 0, 0, "cyan");	

function collision(ctx){
    //Spelare 1
    if(NotP1.x < Wall1.x + Wall1.width && NotP1.x > Wall1.x){
		NotP1.x = spawn1;
		return alert("Player 1 died, Player 2 Wins");
    }
    else if(NotP1.x > Wall2.x + Wall2.width && NotP1.x > Wall2.x){
		NotP1.x = spawn1;
		return alert("Player 1 died, Player 2 Wins");
    }
    else if(NotP1.x > Wall3.x + Wall3.width && NotP1.x > Wall3.x){
		NotP1.x = NotP2.x;
		return alert("Player 2 died, Player 1 Wins");
    }
    //Spelare 2
    if(NotP2.x < Wall1.x + Wall1.width && NotP2.x > Wall1.x){
		NotP2.x = NotP1.x;
		return alert("Player 2 died, Player 1 Wins");
    }
    else if(NotP2.x > Wall2.x + Wall2.width && NotP2.x > Wall2.x){
		NotP2.x = NotP1.x;
		return alert("Player 2 died, Player 1 Wins");
    }

}
