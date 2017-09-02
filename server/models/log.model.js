var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator')


var log = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    strats: [{type: Schema.Types.ObjectId, ref: 'Strat'}],

  },
  {
    timestamps: true
  })

log.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Log', log)
