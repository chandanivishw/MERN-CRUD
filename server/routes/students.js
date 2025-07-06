import express from 'express';

const router = express.Router();

// all routes
router.get("/students")
router.post("/students")
router.patch("/students/:id")
router.get("/students/:id")
router.delete("/students/:id")


export default router;

