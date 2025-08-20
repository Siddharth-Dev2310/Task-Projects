import { Router } from "express"
import { 
    createStudent,
    fileUplodeOnMongoDB
} from "../controller/user.controller.js"
import { upload } from "../middleware/multer.middleware.js"

const router = Router()

router.route("/ragister").post(createStudent)
router.route("/uplode").post(upload.single("File"), fileUplodeOnMongoDB)

export default router;