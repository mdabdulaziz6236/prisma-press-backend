import { Router } from "express";
import { subscriptionController } from "./subscription.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/checkout",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  subscriptionController.createCheckoutSession,
);

router.get(
  "/status",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  subscriptionController.getSubscriptionStatus,
);

router.post("/webhook", subscriptionController.handleWebHook);

export const subscriptionRoutes = router;
