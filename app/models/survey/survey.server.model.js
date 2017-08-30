'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./settings/settings')),
  chalk = require('chalk');

/**
 * Survey Schema
 */
var AnswerSchema = new Schema({
	question: Number,
	answer: String,
	value: Number
})

var ResultSchema = new Schema({
	main: String,
	val: Number,
	desc: String
})

var SurveySchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  finished: {
	type: Date  
  },
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  ipAddress: {
	type: String,
	default: ''
  },
  survey: [AnswerSchema],
  result: ResultSchema
});

SurveySchema.statics.seed = seed;

mongoose.model('Survey', SurveySchema);

/**
* Seeds the User collection with document (Survey)
* and provided options.
*/
function seed(doc, options) {
  var Survey = mongoose.model('Survey');

  return new Promise(function (resolve, reject) {

    skipDocument()
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Survey
          .findOne({
            name: doc.name
          })
          .exec(function (err, existing) {
            if (err) {
              return reject(err);
            }

            if (!existing) {
              return resolve(false);
            }

            if (existing && !options.overwrite) {
              return resolve(true);
            }

            // Remove Survey (overwrite)

            existing.remove(function (err) {
              if (err) {
                return reject(err);
              }

              return resolve(false);
            });
          });
      });
    }

    function add(skip) {
      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve({
            message: chalk.yellow('Database Seeding: Survey\t' + doc.name + ' skipped')
          });
        }

        var Survey = new Survey(doc);

        Survey.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Survey\t' + Survey.name + ' added'
          });
        });
      });
    }
  });
}
