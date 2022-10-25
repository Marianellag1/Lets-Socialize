const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');
// **`/api/users`**



// **`/api/users/:userId/friends/:friendId`**


module.exports = router;