
var util = require("./util.js");
var types         = util.types;
var matchParen    = util.matchParen;



function func(token, name, line, storage)
{
	this.token = token;
	this.name = token.name;
	this.line = token.line;
	this.storage = storage;
}


//test for a function definition at the given token index
function testFuncDef(statement, start)
{
	if(statement[start].type === types.IDENTIFIER) //function name
	{
		if(statement[start+1].type === types.OPEN_PAREN) //open paren
		{
			//find matching paren
			var close = matchParen(statement, start+1);

			if(close !== -1) //close paren
			{
				if(statement[close+1].type === types.OPEN_BRACKET) //open bracket
				{
					//ghostbusters: "weeee GOT ONE!!!"
					return true;
				}
			}
		}
	}
	return false;
}


module.exports = function(statements) {
	var definitions = [];

	//find function definitions
	for(var i = 0; i < statements.length; i++)
	{
		var statement = statements[i];

		//minimum number of tokens needed to form function DEFINITION
		// void main ( ) {
		if(statement.length >= 5)
		{
			var storage = "extern"; //all functions are extern by default
			for(var t = 0; t < statement.length - 3; t++)
			{
				var token = statement[t];

				//record the last occurence of storage modifiers
				if(token.type === types.KEYWORD_STORAGE)
				{
					storage = token.name;
				}
				else
				{
					//test using this position as a starting point
					if(testFuncDef(statement, t))
					{
						//oh boy oh boy oh boy!!
						var f = new func(token, storage);
						definitions.push(f);
					}
				}
			}
		}
	}

	return definitions;
}
