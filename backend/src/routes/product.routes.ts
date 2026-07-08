import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

//get all products
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Get all products" });
});

//get single product
router.get("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "Get single product" });
});

//create product
router.post("/", (req: Request, res: Response) => {
  res.status(201).json({ message: "Product created" });
});

//update product
router.put("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "Product updated" });
});

//delete product
router.delete("/:id", (req: Request, res: Response) => {
  res.status(200).json({ message: "Product deleted" });
});

export default router;
