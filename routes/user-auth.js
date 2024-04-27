import {
    authWithGoogle,
    createMultipleUsers,
    createUser,
    signInUser,
    sendResetPasswordToken,
    resetPassword,
    updatePassword,
} from "../controllers/user-auth.js";
import { sendResetPasswordToken_v, resetPassword_v } from "../validations/user-auth.js";

import router from "./server.js";

router.post("/v1/auth/signup", createUser);
router.post("/v1/auth/signin", signInUser);
router.post("/v1/auth/google", authWithGoogle);
router.post("/v1/auth/signup/multiple", createMultipleUsers);
router.post("/v1/auth/send-reset-password-token", sendResetPasswordToken_v, sendResetPasswordToken);
router.post("/v1/auth/reset-password", resetPassword_v, resetPassword);
router.post("/v1/auth/update-password", updatePassword);

export default router;
