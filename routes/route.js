const express = require('express')
const router = express.Router();
const controller = require("../controller/controllers.js")

router.post("/addUser", controller.addUser)
router.get("/getUser", controller.getUser)
router.post("/login", controller.Login)
router.post("/chatGPT", controller.chatGPT)
router.post("/textModification", controller.textModification)
router.post("/htmlExtract", controller.htmlExtract)

module.exports = router;