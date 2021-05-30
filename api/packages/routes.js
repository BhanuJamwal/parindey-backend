const { Request, Response, Router } = require("express");

// importing all store related use case
const CreatePackage = require("./createPackage/CreatePackage");

const router = Router();

// tslint:disable-next-line:no-shadowed-variable

router.post("/package", async (Request, Response) => {
    let useCase = CreatePackage.create(Request, Response)
    useCase.execute()
});
module.exports = router;
