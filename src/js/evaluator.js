/**
  Initializing Environment
*/
var Env = new Object();
Env.dia = toolData[toolByDefault];
Env.rapidSpeed = rapidSpeedByDefault;

/**
  Initializing variables
*/
var points = new Array(), lineNums = new Array(), tempData = new Object(), errors = false;

/**
  Declaring functions
*/
var throwExceptionsOnScreen = function (errorOrWarn, e) {
	document.getElementById(errorOrWarn).setAttribute("style", "display: block");
	document.getElementById(errorOrWarn).innerHTML = e;
}

var hideAlertBoxes = function () {
	document.getElementById('errors').setAttribute("style", "display: none");
	document.getElementById('warnings').setAttribute("style", "display: none");
}

var paramError = function (word) {
	throw "Error: Parameter '"+ word +"' is not supported for the code '"+ Env.state+"'";
}

var avoidNullState = function () {
	if (!Env.hasOwnProperty('state'))
		throw "Error: Block descriptor is undefined";
}

var eobError = function () {
	throw "Error: Unexpected End of Block code";
}

var addPoint = function (x, z, feed, rpm, dia) {
	points.push({
		x: x,
		z: z,
		feed: feed,
		rpm: rpm,
		dia: dia
	});
};

function doNothing() { return null; }

/**
  Operational code parameter handlers
*/
var opCodeParamHandlers = {
	G00 : function (param) {
		word = param[0]; tempData.f = Env.rapidSpeed;
		if (word == 'X') {
			tempData.x = param.slice(1);
		} else if (word == 'Z') {
			tempData.z = param.slice(1);
		} else if (word == 'U') {
			tempData.x = Number(Env.x) + Number(param.slice(1));
		} else if (word == 'W') {
			tempData.z = Number(Env.z) + Number(param.slice(1));
		} else paramError(word);
	},

	G01 : function (param) {	
		word = param[0]; tempData.f = Env.feed;
		if (word == 'X') {
			tempData.x = param.slice(1);
		} else if (word == 'Z') {
			tempData.z = param.slice(1);
		} else if (word == 'U') {
			tempData.x = Number(Env.x) + Number(param.slice(1));
		} else if (word == 'W') {
			tempData.z = Number(Env.z) + Number(param.slice(1));
		} else if (word == 'F') {
			tempData.f = param.slice(1);
		} else paramError(word);
	},

	G02 : function (param) {
		word = param[0];
		if (word == 'X') {
			tempData.x = param.slice(1);
		} else if (word == 'Z') {
			tempData.z = param.slice(1);
		} else if (word == 'U') {
			tempData.x = Number(Env.x) + Number(param.slice(1));
		} else if (word == 'W') {
			tempData.z = Number(Env.z) + Number(param.slice(1));
		} else if (word == 'F') {
			tempData.f = param.slice(1);
		} else if(word == 'R') {
			tempData.r = param.slice(1);
		} else if(word == 'I') {
			tempData.i = param.slice(1);
		} else if(word == 'K') {
			tempData.k = param.slice(1);
		} else paramError(word);
	},

	G03 : function (param) {
		word = param[0];
		if (word == 'X') {
			tempData.x = param.slice(1);
		} else if (word == 'Z') {
			tempData.z = param.slice(1);
		} else if (word == 'U') {
			tempData.x = Number(Env.x) + Number(param.slice(1));
		} else if (word == 'W') {
			tempData.z = Number(Env.z) + Number(param.slice(1));
		} else if (word == 'F') {
			tempData.f = param.slice(1);
		} else if(word == 'R') {
			tempData.r = param.slice(1);
		} else if(word == 'I') {
			tempData.i = param.slice(1);
		} else if(word == 'K') {
			tempData.k = param.slice(1);
		} else paramError(word);
	},

	G04 : function (param) {
		word = param[0];
		if (word == 'P') {
			tempData.p = param.slice(1);
		} else if (word == 'X') {
			tempData.x = param.slice(1);
		} else paramError(word);
	},

	G28 : function (param) {
		word = param[0]; tempData.f = Env.rapidSpeed;
		if (word == 'X') {
			tempData.x = param.slice(1);
		} else if (word == 'Z') {
			tempData.z = param.slice(1);
		} else if (word == 'U') {
			tempData.x = Number(Env.x) + Number(param.slice(1));
		} else if (word == 'W') {
			tempData.z = Number(Env.z) + Number(param.slice(1));
		} else paramError(word);
	},

	G71 : function (param) {
		word = param[0];
		if (word == 'P') {
			tempData.p = param.slice(1);
		} else if (word == 'Q') {
			tempData.q = param.slice(1);
		} else if (word == 'U') {
			tempData.x = Number(Env.x) + Number(param.slice(1));
		} else if (word == 'W') {
			tempData.z = Number(Env.z) + Number(param.slice(1));
		} else if (word == 'F') {
			tempData.f = param.slice(1);
		} else if(word == 'R') {
			tempData.r = param.slice(1);
		} else if(word == 'S') {
			tempData.s = param.slice(1);
		} else paramError(word);
	},

	G72 : function (param) {
		word = param[0];
		if (word == 'U') {
			tempData.u = param.slice(1);
		} else if (word == 'W') {
			tempData.w = param.slice(1);
		} else if (word == 'R') {
			tempData.r = param.slice(1);
		} else if (word == 'P') {
			tempData.p = param.slice(1);
		} else if (word == 'Q') {
			tempData.q = param.slice(1);
		} else paramError(word);
	},

	G74 : function (param) {
		word = param[0];
		if (word == 'W') {
			tempData.w = param.slice(1);
		} else if (word == 'R') {
			tempData.r = param.slice(1);
		} else if (word == 'P') {
			tempData.p = param.slice(1);
		} else if (word == 'Q') {
			tempData.q = param.slice(1);
		} else if (word == 'U') {
			tempData.u = param.slice(1);
		} else if (word == 'W') {
			tempData.w = param.slice(1);
		} else if (word == 'S') {
			tempData.s = param.slice(1);
		} else if (word == 'F') {
			tempData.f = param.slice(1);
		} else paramError(word);
	},

	G92 : function (param) {
		word = param[0];
		if (word == 'X') {
			tempData.x = param.slice(1);
		} else if (word == 'Z') {
			tempData.z = param.slice(1);
		} else if (word == 'F') {
			tempData.f = param.slice(1);
		} else paramError(word);
	},

	M03 : function (param) {
		word = param[0];
		if (word == 'S') {
			tempData.s = param.slice(1);	// change spindle speed
		} else paramError(word);
	},

	M04 : function (param) {
		word = param[0];
		if (word == 'S') {
			tempData.s = '-'+param.slice(1);	// counter clockwise spindle speed
		} else paramError(word);
	},

	M06 : function (param) {
		word = param[0];
		if (word == 'T') {
			tempData.t = param.slice(1);
		} else paramError(word);
	}
};


/**
  Control code handlers
*/
var controlCodeHandlers = {
	G21 : function () {
		Env.state = 'G21';
	},

	G98 : function () {
		Env.state = 'G98';
	},

	M05 : function () {
		Env.state = 'M05';
	},

	M08 : function () {
		Env.coolant = true;
		Env.state = 'M08';
	},

	M09 : function () {
		Env.coolant = false;
		Env.state = 'M09';	
	},

	M30 : function () {
		Env.state = 'M30';
	},

	N : function (value) {
		lineNums.push(Number(value.slice(1)));
		Env.state = 'N';
	},

	O : function (value) {
		Env.progNum = Number(value.slice(1));
		Env.state = 'O';
	}
};

/**
  End of block handlers
*/
var eobHandlers = {
	// states and functions
	N : function (data) {
		throw "Alert: Blank line found!";
	},

	O : function (data) {
		doNothing();
	},

	G21 : function (data) {
		doNothing();
	},

	G98 : function (data) {
		doNothing();
	},

	M08 : function (data) {
		doNothing();
	},

	M09 : function (data) {
		doNothing();
	},

	M30 : function (data) {
		addPoint(Env.x, Env.z, Env.feed, 0, Env.dia); // set the spindle speed to zero
	},

	M05 : function (data) {
		addPoint(Env.x, Env.z, Env.feed, 0, Env.dia);	// set spindle speed to zero
	},

	G00 : function (data) {
		addPoint(data.x, data.z, data.f, Env.rpm, Env.dia);
	},

	G01 : function (data) {
		addPoint(data.x, data.z, data.f, Env.rpm, Env.dia);
	},

	G02 : function (data) {
		// body...
	},

	G03 : function (data) {
		// body...
	},

	G04 : function (data) {
		doNothing();
	},

	G28 : function (data) {
		addPoint(data.x, data.z, data.f, Env.rpm, Env.dia);
		addPoint(0, 0, data.feed, Env.rpm, Env.dia);
	},

	G71 : function (data) {
		// body...
	},

	G72 : function (data) {
		// body...
	},

	G74 : function (data) {
		// body...
	},

	G92 : function (data) {
		// body...
	},

	M03 : function (data) {
		Env.rpm = data.s;
	},

	M04 : function (data) {
		Env.rpm = data.s;
	},

	M06 : function (data) {
		Env.dia = toolData[data.t];
	}
};

/**
  Evaluating tokens
*/
var getPoints = function (validTokens) {
	points = new Array();	// empty the array to reset

	hideAlertBoxes();	// reset the alert area

	try {
		// loop through the tokens and evaluate
		for (var i = 0; i < validTokens.length; i++) {
			type = validTokens[i].type; value = validTokens[i].value;
			// parameters - PM
			if (type == 'PM') {
				// if state is null then throw error
				avoidNullState();
				// if doesn't have an entry then throw parameter error
				if (!opCodeParamHandlers.hasOwnProperty(Env.state))
					paramError(value[0]);
				opCodeParamHandlers[Env.state](value);	// handle parameters
			}
			// block descriptors - BD
			else if (type == 'BD') {
				Env.state = value;	// handle block descriptors
			}
			// end of block - EB
			else if (type == 'EB') {
				avoidNullState();	// avoid null state
				if (!eobHandlers.hasOwnProperty(Env.state))
					eobError();	// if not a property then throw error

				/** 
				   check if input data is suffice
				*/

			   // update the Env (x, z, feed) with tempData info
				if(tempData.hasOwnProperty('x'))
					Env.x = tempData.x;
				if (tempData.hasOwnProperty('z'))
					Env.z = tempData.z;
				if (tempData.hasOwnProperty('f'))
					Env.feed = tempData.f;

				eobHandlers[Env.state](tempData);	// handle end of block
				tempData = new Object();	// reset tempData

				if (Env.state == 'M30')		// if state M30 then return the points
					return points;			// and stop the program execution
			}
			// control codes : multiline support - CC
			else if (type == 'CC') {
				if (value[0] == 'O' || value[0] == 'N')		// line & program numbers
					controlCodeHandlers[value[0]](value);
				else controlCodeHandlers[value]();	// handle control codes
			} else throw "Alert: Unknown token type found!"
		}
	} catch(e) {
		if (e[0] == 'E') {
			errors = true;
			throwExceptionsOnScreen('errors', e);	// handle errors
		} else throwExceptionsOnScreen('warnings', e);	// handle warnings
	} finally {
		if (errors == false)
			return points;
		else return null;
	}
}