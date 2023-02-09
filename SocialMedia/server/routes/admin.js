import express from 'express';  
import { adminLogin, adminRegister, deleteAllnotifications, markNotificationAsSeen, viewPost} from '../controllers/admin'

const router =express.Router();

router.post =("/register",adminRegister)
router.post("/login",adminLogin)
router.post("/view-post",viewPost)
router.post( "/mark-all-notifications-as-seen",markNotificationAsSeen)
router.post("/delete-all-notifications",deleteAllnotifications)

export default router