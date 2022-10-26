const { User, Thought } = require('../models');

module.exports = {
    // * `GET` all users
    getUsers(req, res) {
        User.find()
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
      },
      // * `GET` a single user by its `_id` and populated thought and friend data
      getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')//the - is don't show version
          .populate('thought')//built in function, which its saying in which field do you want to populate, which is thought
          .populate('friend')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      // * `POST` a new user:
      createUser(req, res) {
        User.create(req.body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
          // ```json
          // // example data
          // {
          //   "username": "lernantino",
          //   "email": "lernantino@gmail.com"
          // }
          // ```
      },
}




// * `PUT` to update a user by its `_id`

// * `DELETE` to remove user by its `_id`

// **BONUS**: Remove a user's associated thoughts when deleted.

//________________________________________________________

// * `POST` to add a new friend to a user's friend list

// * `DELETE` to remove a friend from a user's friend list