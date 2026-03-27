import { Router, type IRouter } from "express";
import healthRouter from "./health";
import classesRouter from "./classes";
import coachesRouter from "./coaches";
import enquiriesRouter from "./enquiries";

const router: IRouter = Router();

router.use(healthRouter);
router.use(classesRouter);
router.use(coachesRouter);
router.use(enquiriesRouter);

export default router;
