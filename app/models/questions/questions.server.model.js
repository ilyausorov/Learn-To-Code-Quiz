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
 * Questions Schema
 */

var ChoiceSchema = new Schema({
	value: String,
	num: Number
})

var QuestionsSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  question: {
    type: String,
    default: ''
  },
  order: {
	  type: Number,
	  default: 1
  },
  choice: [ChoiceSchema],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

QuestionsSchema.statics.seed = seed;

mongoose.model('Question', QuestionsSchema);

/**
* Seeds the User collection with document (Questions)
* and provided options.
*/
function seed(doc, options) {
  var Questions = mongoose.model('Questions');

  return new Promise(function (resolve, reject) {

    skipDocument()
	  .then(findAdminUser)
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });
	  
	function findAdminUser(skip) {
      var User = mongoose.model('User');

      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve(true);
        }

        User
          .findOne({
            roles: { $in: ['admin'] }
          })
          .exec(function (err, admin) {
            if (err) {
              return reject(err);
            }

            doc.user = admin;

            return resolve();
          });
      });
    }  

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Questions
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

            // Remove Questions (overwrite)

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
            message: chalk.yellow('Database Seeding: Questions\t' + doc.name + ' skipped')
          });
        }

        var Questions = new Questions(doc);

        Questions.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Questions\t' + Questions.name + ' added'
          });
        });
      });
    }
  });
}
