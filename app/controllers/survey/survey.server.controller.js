'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Survey = mongoose.model('Survey'),
  errorHandler = require(path.resolve('./app/controllers/core/errors.server.controller'));

/**
 * Create an survey
 */
exports.create = function (req, res) {
  var survey = new Survey(req.body);

var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
	
	survey.ipAddress = ip;
	
  survey.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(survey);
    }
  });
};

/**
 * Show the current survey
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var survey = req.survey ? req.survey.toJSON() : {};

  res.json(survey);
};

/**
 * Update an survey
 */
exports.update = function (req, res) {
	
	var survey = req.survey;
	
	survey.created = req.body.created;
	survey.name = req.body.name;
	survey.email = req.body.email;
	survey.ipAddress = req.body.ipAddress;
	survey.survey = req.body.survey;
	
	if(req.body.finished){
		survey.finished = req.body.finished;
	}
	
	if(survey.survey.length == 5){
		var counter = 0;
		survey.survey.map(function(x,i){
			counter += x.value;
		})
		
		if(counter <= 6){
			survey.result = {
				main: "not learn to code",
				val: 1,
				desc: "Let's be real: it doesn't seem like you have enough time or motivation to get into learning to code. Are you really sure you want to do this?"
			}
		} else if(counter >= 7 && counter <= 9){
			survey.result = {
				main: "take a college class",
				val: 2,
				desc: "With a limited time commitment and more in-depth instruction, a college class will likely give you the support system you need at a more manageable pace so you can learn coding right."
			}
		}else if(counter >= 10 && counter <= 13){
			survey.result = {
				main: "do a fulltime coding bootcamp",
				val: 3,
				desc: "A bootcamp would likely be a good decision for you as it will combine the support you need with the time commitment you're able to provide. Just be careful: the price tags can be pretty high here. You can check out schools like General Assembly or Flatiron School."
			}
		}else if(counter >= 14 && counter <= 19){
			survey.result = {	
				main: "take a mentored part-time course",
				val: 4,
				desc: "You want to build and you want to do it well, but you don't have all the time in the world. Why not consider taking a part-time course that gives you more hands-on support and attention so you can accomplish more with less."
			}
		}else if(counter >= 20 && counter <= 22){
			survey.result = {
				main: "do an online course",
				val: 5,
				desc: "It seems like you prefer to do things with less support, and have the time required, so an online course could be a good mix of all these things at a very affordable price. Coursera or Codecademy could be an option."
			}
		}else if(counter >= 23){
			survey.result = {
				main: "learn coding yourself",
				val: 6,
				desc: "Ok we get it! You're a genius and can do it all. 'Nuff said."
			}
		}
	}

  survey.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(survey);
    }
  });
};

/**
 * Delete an survey
 */
exports.delete = function (req, res) {
  var survey = req.survey;

  survey.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(survey);
    }
  });
};

/**
 * List of survey
 */
exports.list = function (req, res) {
  Survey.find().sort('-created').exec(function (err, survey) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(survey);
    }
  });
};

/**
 * Survey middleware
 */
exports.surveyByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Survey is invalid'
    });
  }

  Survey.findById(id).exec(function (err, survey) {
    if (err) {
      return next(err);
    } else if (!survey) {
      return res.status(404).send({
        message: 'No survey with that identifier has been found'
      });
    }
    req.survey = survey;
    next();
  });
};
