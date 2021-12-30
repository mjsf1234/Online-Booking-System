import Express from "express";

const router = Express.Router();

router.post("/api/payment", (req, res) => {
  const [amount] = req.body;
});
export default router;
