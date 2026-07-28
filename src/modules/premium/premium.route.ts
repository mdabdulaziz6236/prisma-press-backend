import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { PremiumController } from "./premium.controller";
import { subscriptionGuard } from "../../middlewares/premiumGuard";

const router = Router();

router.get(
  "/",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  subscriptionGuard(),
  PremiumController.getPremiumContent,
);

export const premiumRoutes = router;
