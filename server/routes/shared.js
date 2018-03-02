var Notification = require('../models/notification.model'),
  User = require('../models/user.model'),
  Project = require('../models/project.model'),
  Strat = require('../models/strat.model'),
  Log = require('../models/log.model'),
  emailGenerator = require('./emailGenerator.js');

module.exports = {

  saveUsersMissionToProjectWithoutDuplicate (mission) {
    mission.projects.forEach(projectId => {
      Project.findById(({_id: projectId}), function (err, item) {
        if (err) {
        } else {
          mission.users.forEach(user => {
            item.users.push(user)
          })
          var uniq = new Set(item.users.map(e => JSON.stringify(e)));
          var res = Array.from(uniq).map(e => JSON.parse(e));
          item.users = res
          item.save()
        }
      })
    })
  },
  saveUsersStratToProjectWithoutDuplicate (strat) {
    strat.projects.forEach(projectId => {
      Project.findById(({_id: projectId}), function (err, item) {
        if (err) {
        } else {
          strat.users.forEach(user => {
            item.users.push(user)
          })
          var uniq = new Set(item.users.map(e => JSON.stringify(e)));
          var res = Array.from(uniq).map(e => JSON.parse(e));
          item.users = res
          item.save()
        }
      })
    })
  },
  isCurentUserHasAccess(user, nameObject, typeAccess) {
    // console.log(user, nameObject, typeAccess)
    return true;
    if (!user.rights) {
      return true;
    }

    let rights = JSON.parse(JSON.stringify(user.rights))
    let permissionBool = false

    rights.forEach(right => {
      right.detailRight.permissions.forEach(permission => {
        if (permission.namePermission === nameObject)
          permission.access.forEach(singleAccess => {
            if (singleAccess.typeAccess === typeAccess)
              permissionBool = true
          })
          })
    })
    return permissionBool
  },

  postNotification(req, typeObject) {
    // //init new notification
    // return new Promise((resolve, reject) => {
    //   var notification = new Notification()
    //   notification.ownerCompanies = req.user.ownerCompanies
    //   notification.nameNotification = 'New Update ' + typeObject + ' ' + req.params.id
    //   notification.typeObject = typeObject
    //   notification.quotes = [req.params.id]
    //
    //   let searchQuery = {}
    //   searchQuery['ownerCompanies'] = req.user.ownerCompanies
    //   User.find(searchQuery).populate({path: 'rights', model: 'Right'}).exec(function (err, item) {
    //     if (err) {
    //       reject(err)
    //       // return res.status(404).json({message: 'No results', err: err})
    //     } else {
    //       // add users with the 'notification right'
    //       item.forEach(user => {
    //         if (shared.isCurentUserHasAccess(user, typeObject, 'notification')) {
    //           notification.users.push(user)
    //         }
    //       })
    //       // add user owner of typeObject
    //       if (typeObject === 'quote') {
    //         req.body.projects.forEach(project => {
    //           project.assignedTos.forEach(user => {
    //             notification.users.push(user)
    //           })
    //         })
    //       }
    //       if (typeObject === 'userCalendar') {
    //         req.body.users.forEach(user => {
    //           notification.users.push(user)
    //         })
    //       }
    //
    //       //remove duplicate
    //       notification.users = Array.from(new Set(JSON.parse(JSON.stringify(notification.users))))
    //
    //       // save in DB
    //       notification.save(function (err, result2) {
    //         if (err) {
    //           // console.log(err)
    //           // return res.status(403).json({
    //           //   title: 'There was an issue',
    //           //   error: {
    //           //     message: 'Error'
    //           //   }
    //           // })
    //         }
    //         // res.status(200).json({message: 'Ok', obj: 'ok'})
    //         resolve(result2)
    //       })
    //
    //     }
    //   })
    // })
  },
  sendEmailBatchDocuments (req) {

    User
    .find({})
    .exec(function (err, users) {
      if (err) {
        return res.status(404).json({
          message: 'No results',
          err: err
        })
      } else {
        users.forEach(user=> {

              // var itemsPerPage = 10
              // var currentPage = Number(req.params.page)
              // var pageNumber = currentPage - 1
              // var skip = (itemsPerPage * pageNumber)

            // let rights = new Date(JSON.parse(JSON.stringify(req.query.start)))

              let searchQuery = {}

              // searchQuery['ownerCompanies'] = req.user.ownerCompanies




              //
              // if(req.query.start)
              //   searchQuery['createdAt'] = {
              //     "$gte":  new Date(JSON.parse(req.query.start)),
              //     "$lt":  new Date(JSON.parse(req.query.end))
              //   }
              //





              // if(req.query.search) {
              //   searchQuery['name'] = new RegExp(req.query.search, 'i')
              // }


              // if(req.query.start)
              //   searchQuery['createdAt']['$lt'] = new Date(JSON.parse(req.query.start))

              // if(req.query.projectId)
              //   searchQuery['projects'] = mongoose.Types.ObjectId(req.query.projectId)
              // if(req.query.categorieId)
              //   searchQuery['categories'] = mongoose.Types.ObjectId(req.query.categorieId)
              // if(req.query.userId)
              //   searchQuery['users'] = mongoose.Types.ObjectId(req.query.userId)
              // if(req.query.documentId)
              //   searchQuery['documents'] = mongoose.Types.ObjectId(req.query.documentId)
              // if(req.query.stratId)
              //   searchQuery['strats'] = mongoose.Types.ObjectId(req.query.stratId)
              // if(req.query.missionId)
              //   searchQuery['missions'] = mongoose.Types.ObjectId(req.query.missionId)

                // console.log(searchQuery)

              searchQuery['documents'] = {$exists: true}
              searchQuery['type'] = 'change'
              searchQuery['mailSent'] = false
              searchQuery['mailSent'] = false
              searchQuery['users'] = mongoose.Types.ObjectId(user._id)



              Log
              .find(searchQuery)
              // .sort('-createdAt')
              // .populate({path: 'users', model: 'User'})
              // .populate({path: 'missions', model: 'Mission'})
              // .populate({path: 'strats', model: 'Strat'})
              .populate({

                path: 'documents.crewMembers',
                model: 'User',

              })
              .populate({
                path: 'documents.reviewers',
                model: 'User',
              })
              .exec(function (err, items) {
                if (err) {
                  console.log(err)
                } else {
                  items.forEach((item, i) => {
                    var stackDocuments = []
                    item.documents.forEach(document => {
                      // console.log(document.status.pendingActionFrom)
                      if (user.profile.emailPreferences.frequencyEmail === 'asTheyHappen') {
                        // if (document.status.pendingActionFrom === 'crew') {
                        //   document.crewMembers.forEach(user => {
                        //     stackDocuments.push({ document: document, pendingActionFrom: pendingActionFrom})
                        //   })
                        // }
                        // if (document.status.pendingActionFrom === 'client') {
                        //   document.reviewers.forEach(user => {
                        //    })
                        // }
                        stackDocuments.push(document)
                      }
                    })
                    emailGenerator.sendEmailBatchDocuments(req, user, stackDocuments)
                        // Log.findOneAndUpdate({_id: item._id}, {mailSent: true}, {upsert: true})




                  })
                }
              })
            })
        }

      })
    }

}
