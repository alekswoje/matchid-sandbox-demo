const {
    register,
    login,
    setAvatar,
    getAllUsers,
    registerOrFindUser
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/registerOrFindUser", registerOrFindUser);
router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);
module.exports = router;
