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
        User.findOne({ _id: req.params.usersId })
          .select('-__v')//the - is don't show version
          .populate('thoughts')//built in function, which its saying in which field do you want to populate, which is thought
          // .populate('friends')
          .then((user) =>
          { 
            console.log(user);
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)}
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
      // * `PUT` to update a user by its `_id`
      updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.usersId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // * `DELETE` to remove user by its `_id`
      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.usersId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No course with that ID' })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'User and thought(s) deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
      // * `POST` to add a new friend to a user's friend list
      addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.usersId },
          { $addToSet: { friends: req.body } },
          { runValidators: true, new: true }
          )
          .then((user) =>
          !user
          ? res
          .status(404)
          .json({ message: 'No user found with that ID :(' })
          : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
        },
        // * `DELETE` to remove a friend from a user's friend list
      // removeAssignment(req, res) {
      //   Student.findOneAndUpdate(
      //     { _id: req.params.studentId },
      //     { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      //     { runValidators: true, new: true }
      //   )
      //     .then((student) =>
      //       !student
      //         ? res
      //           .status(404)
      //           .json({ message: 'No student found with that ID :(' })
      //         : res.json(student)
      //     )
      //     .catch((err) => res.status(500).json(err));
      // },
}