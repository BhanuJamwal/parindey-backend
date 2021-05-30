const {Request, Response ,Router} = require("express");

// importing all store related use case
const userSignUp = require("./register/Register");
const Login = require("./login/Login");
const Logout = require("./logout/Logout");

const router = Router();

// tslint:disable-next-line:no-shadowed-variable

router.post("/signup", async (Request,Response) => {
    user = new userSignUp(Request,Response)
    console.log("user",Request);
    user.validation()
    console.log("user validate")
    await user.add()
    console.log("user added")
});
router.post("/signin", async (Request, Response) => {
    login = new Login(Request, Response)
    login.authenticate()
});
router.get("/signout/:userId", async(Request, Response) =>{
    logout = new Logout(Request,Response)
    logout.expireToken()
})

module.exports = router;
