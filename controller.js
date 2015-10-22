/**
 * Created by deepaksisodiya on 22/10/15.
 */



var exports = module.exports = {},
  dynamoose = require('dynamoose'),
  Users = dynamoose.model('Users');

/**
 * This API saves the user in the Users table.
 * creationTime(rangeKey) and userId(hashKey) is created for each user
 * @return on success: created user
 * @return on error: error message
 * @param req
 * @param res
 */
exports.saveUser = function (req, res) {
  req.body.creationTime = new Date().getTime();
  req.body.userId = Math.random().toString(36).substring(7);
  Users.create(req.body, function (err, user) {
    if(err) {
      return res.status(500).json({'error' : 'error in saving user'});
    } else {
      res.json(user);
    }
  });
};

/**
 * This API is getting all users from the Users table
 * @return on success: all users
 * @return on error: error message
 * @param req
 * @param res
 */
exports.getAllUsers = function (req, res) {
  Users.scan({}, function (err, users) {
    if(err) {
      return res.status(500).json({'error' : 'error in fetching users'});
    }
    res.json(users);
  });
};

/**
 * This API is deleting user from the Users table
 * @return on success: success message
 * @return on error: error message
 * @param req
 * @param req.userId: userId(hashKey) for the user
 * @param req.creationTime: creationTime(rangeKey) for the user
 * @param res
 */
exports.deleteUser = function (req, res) {
  var userId = req.params.userId;
  var creationTime = req.params.creationTime;
  Users.delete({userId: userId, creationTime: creationTime}, function (err) {
    if(err) {
      return res.status(500).json({'error' : 'error while deleting user'});
    }
    res.json({'status' : 'user deleted successfully'});
  });
};

/**
 * This API is updating the user in the Users table
 * @return on success: success message
 * @return on error: error message
 * @param req
 * @param req.userId: userId(hashKey) for the user
 * @param req.creationTime: creationTime(rangeKey) for the user
 * @param res
 */
exports.updateUser = function (req, res) {
  var userId = req.params.userId;
  var creationTime = req.params.creationTime;
  Users.update({userId: userId, creationTime: creationTime}, req.body, function (err) {
    if(err) {
      console.log(err);
      return res.status(500).json({'error':'error while updating user'});
    }
    res.json({'status' : 'user updated successfully'});
  });
};