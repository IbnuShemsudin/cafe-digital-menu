import express from "express";

import {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const router =
  express.Router();

/* =========================================================
   MENU ROUTES
========================================================= */

/*
   GET
   /api/menu
*/

router.get(
  "/",
  getMenuItems
);

/*
   GET
   /api/menu/:id
*/

router.get(
  "/:id",
  getMenuItem
);

/*
   POST
   /api/menu
*/

router.post(
  "/",
  createMenuItem
);

/*
   PUT
   /api/menu/:id
*/

router.put(
  "/:id",
  updateMenuItem
);

/*
   DELETE
   /api/menu/:id
*/

router.delete(
  "/:id",
  deleteMenuItem
);

export default router;