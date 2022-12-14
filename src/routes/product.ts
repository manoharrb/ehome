import { Router } from "express";
import { createProduct, getProduct,addFavourite,getFavourites } from "../controllers/productController";
import {
  sendVerificationMail,
  signinUser,
  signupUser,
  verifyUserMail,
  sendForgotPasswordMail,
  verifyForgotMail,
} from "../controllers/userControllers";
import {
  signupUserValidation,
  signinUserValidation,
  verifyUserMailValidation,
  sendVerificationMailValidation,
  verifyForgotMailValidation,
  sendForgotPasswordMailValidation,
} from "../validation/userValidation/userValidation";

const router = Router();

router.post("/create",createProduct);
  
 router.post("/items",getProduct);
 router.post('/favourite',addFavourite);
 router.post('/favourites/list',getFavourites);

export default router;
