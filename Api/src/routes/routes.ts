import express from "express";
import userRoutes from "./user.routes";
import squadRoutes from "./squad.routes";
import newsRoutes from "./news.routes";
import projectsRoutes from "./projects.routes";
import leaderRoutes from "./leader.routes";
import studentRoutes from "./student.routes";
import administratorRoutes from "./administrator.routes";
import loginRoutes from "./login.routes";

const router = express.Router()
router.use("/squad", squadRoutes)
router.use("/user", userRoutes)
router.use("/news",newsRoutes)
router.use("/projects",projectsRoutes)
router.use("/leader",leaderRoutes)
router.use("/student",studentRoutes)
router.use("/admin",administratorRoutes)
router.use(loginRoutes)

export default router;