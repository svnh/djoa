var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
  //  Quote                    = require('../models/quote.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')


var document = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    missions: [{type: Schema.Types.ObjectId, ref: 'Mission'}],
    details: {
      name: {type: String},
      description: {type: String},
    },
    // clients: [{type: Schema.Types.ObjectId, ref: 'User'}],
    // assignedTos: [{type: Schema.Types.ObjectId, ref: 'User'}],
    status: {type: String, default: [0]},
    link: {type: String, default: ['']},
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    status: {type: Number},
    dateDocument:{
      start: {type: Date, default: [Date()]},
      end: {type: Date, default: [Date()]},
    },
    // categorie: {
    //   categ0:[{name: {type: String}}],
    //   categ1:[{name: {type: String}}],
    //   categ2:[{name: {type: String}}],
    // },
    // progressTasks:{type: Number, default: [0]},
    // bucketTasks:[{
    //   bucketName:{type: String, default: ['']},
    //   tasks:[{type: Schema.Types.ObjectId, ref: 'Task'}
    //   //   {
    //   //   name: {type: String},
    //   //   status: {type: String},
    //   //   description: {type: String},
    //   //   assignedTos: [{type: Schema.Types.ObjectId, ref: 'User'}],
    //   //   dateTask:{
    //   //     creationDate: {type: Date, default: [Date()]},
    //   //     endDate: {type: Date, default: [Date()]},
    //   //   }
    //   // }
    // ]
    // }]
  },
  {
    timestamps: true
  })

document.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Document', document)
