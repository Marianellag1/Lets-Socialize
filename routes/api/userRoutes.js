const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// **`/api/users`**
router.route('/').get(getUsers).post(createUser);

// **`/api/users/:userId`**
router
.route('/:usersId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// **`/api/users/:userId/friends/:friendId`**
router
.route('/:usersId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;