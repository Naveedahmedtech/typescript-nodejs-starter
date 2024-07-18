import { Request, Response, router } from "@/config/express.config";

// ** routes
import auth from "./auth";
import csrfProtection from "@/middlewares/csrfTokenHandler";

router.use("/auth", auth);
router.get("/csrf-token", csrfProtection, (req: Request, res: Response) => {
  res.json({ csrfToken: req.csrfToken() });
});

export default router;
