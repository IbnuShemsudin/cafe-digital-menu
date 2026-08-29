import Menu from "../models/Menu.js";

/* =========================================================
   IMAGE VALIDATION
========================================================= */

const isValidImage =
  (image) => {
    if (!image) {
      return true;
    }

    /* -------------------------
       HTTP / HTTPS IMAGE URL
    ------------------------- */

    if (
      image.startsWith(
        "http://"
      ) ||
      image.startsWith(
        "https://"
      )
    ) {
      return true;
    }

    /* -------------------------
       DEVICE BASE64 IMAGE
    ------------------------- */

    if (
      image.startsWith(
        "data:image/"
      )
    ) {
      return true;
    }

    return false;
  };

/* =========================================================
   GET ALL MENU ITEMS
========================================================= */

export const getMenuItems =
  async (req, res) => {
    try {
      const {
        category,
        availability,
        search,
      } = req.query;

      const filter = {
        isActive: true,
      };

      if (
        category &&
        category !== "all"
      ) {
        filter.category =
          category;
      }

      if (
        availability &&
        availability !== "all"
      ) {
        filter.availability =
          availability;
      }

      if (search) {
        filter.$or = [
          {
            "name.en": {
              $regex: search,
              $options: "i",
            },
          },

          {
            "name.am": {
              $regex: search,
              $options: "i",
            },
          },

          {
            "name.om": {
              $regex: search,
              $options: "i",
            },
          },
        ];
      }

      const items =
        await Menu.find(filter)
          .sort({
            sortOrder: 1,
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        count: items.length,
        data: items,
      });
    } catch (error) {
      console.error(
        "Get menu error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch menu",
      });
    }
  };

/* =========================================================
   GET SINGLE MENU ITEM
========================================================= */

export const getMenuItem =
  async (req, res) => {
    try {
      const item =
        await Menu.findOne({
          _id: req.params.id,
          isActive: true,
        });

      if (!item) {
        return res.status(404).json({
          success: false,
          message:
            "Menu item not found",
        });
      }

      res.status(200).json({
        success: true,
        data: item,
      });
    } catch (error) {
      console.error(
        "Get menu item error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch menu item",
      });
    }
  };

/* =========================================================
   CREATE MENU ITEM
========================================================= */

export const createMenuItem =
  async (req, res) => {
    try {
      const {
        name,
        description,
        ingredients,
        price,
        category,
        image,
        tags,
        availability,
        preparationTime,
        sortOrder,
      } = req.body;

      /* -------------------------
         NAME
      ------------------------- */

      if (
        !name?.en ||
        !name?.am ||
        !name?.om
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Menu name is required in all three languages",
        });
      }

      /* -------------------------
         DESCRIPTION
      ------------------------- */

      if (
        !description?.en ||
        !description?.am ||
        !description?.om
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Menu description is required in all three languages",
        });
      }

      /* -------------------------
         PRICE
      ------------------------- */

      if (
        price === undefined ||
        price === null ||
        price === "" ||
        Number.isNaN(Number(price)) ||
        Number(price) < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Valid price is required",
        });
      }

      /* -------------------------
         CATEGORY
      ------------------------- */

      if (!category) {
        return res.status(400).json({
          success: false,
          message:
            "Category is required",
        });
      }

      /* -------------------------
         IMAGE
      ------------------------- */

      if (
        image &&
        !isValidImage(image)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Image must be a valid URL or device image",
        });
      }

      /* -------------------------
         CREATE
      ------------------------- */

      const item =
        await Menu.create({
          name,

          description,

          ingredients:
            ingredients || {
              en: "",
              am: "",
              om: "",
            },

          price: Number(price),

          category,

          image: image || "",

          tags: Array.isArray(tags)
            ? tags
            : [],

          availability:
            availability ||
            "available",

          preparationTime:
            preparationTime || "",

          sortOrder:
            Number(sortOrder) || 0,
        });

      res.status(201).json({
        success: true,

        message:
          "Menu item created successfully",

        data: item,
      });
    } catch (error) {
      console.error(
        "Create menu error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Failed to create menu item",

        error: error.message,
      });
    }
  };

/* =========================================================
   UPDATE MENU ITEM
========================================================= */

export const updateMenuItem =
  async (req, res) => {
    try {
      const item =
        await Menu.findById(
          req.params.id
        );

      if (!item) {
        return res.status(404).json({
          success: false,
          message:
            "Menu item not found",
        });
      }

      const {
        name,
        description,
        ingredients,
        price,
        category,
        image,
        tags,
        availability,
        preparationTime,
        sortOrder,
        isActive,
      } = req.body;

      /* -------------------------
         NAME
      ------------------------- */

      if (name) {
        if (
          !name.en ||
          !name.am ||
          !name.om
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Menu name is required in all three languages",
          });
        }

        item.name = name;
      }

      /* -------------------------
         DESCRIPTION
      ------------------------- */

      if (description) {
        if (
          !description.en ||
          !description.am ||
          !description.om
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Menu description is required in all three languages",
          });
        }

        item.description =
          description;
      }

      /* -------------------------
         INGREDIENTS
      ------------------------- */

      if (ingredients) {
        item.ingredients =
          ingredients;
      }

      /* -------------------------
         PRICE
      ------------------------- */

      if (price !== undefined) {
        if (
          price === "" ||
          Number.isNaN(
            Number(price)
          ) ||
          Number(price) < 0
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Price cannot be negative or invalid",
          });
        }

        item.price =
          Number(price);
      }

      /* -------------------------
         CATEGORY
      ------------------------- */

      if (
        category !== undefined
      ) {
        if (!category) {
          return res.status(400).json({
            success: false,
            message:
              "Category is required",
          });
        }

        item.category =
          category;
      }

      /* -------------------------
         IMAGE
      ------------------------- */

      if (
        image !== undefined
      ) {
        if (
          image &&
          !isValidImage(image)
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Image must be a valid URL or device image",
          });
        }

        item.image = image;
      }

      /* -------------------------
         TAGS
      ------------------------- */

      if (
        tags !== undefined
      ) {
        item.tags =
          Array.isArray(tags)
            ? tags
            : [];
      }

      /* -------------------------
         AVAILABILITY
      ------------------------- */

      if (
        availability !==
        undefined
      ) {
        item.availability =
          availability;
      }

      /* -------------------------
         PREPARATION TIME
      ------------------------- */

      if (
        preparationTime !==
        undefined
      ) {
        item.preparationTime =
          preparationTime;
      }

      /* -------------------------
         SORT ORDER
      ------------------------- */

      if (
        sortOrder !== undefined
      ) {
        item.sortOrder =
          Number(sortOrder) || 0;
      }

      /* -------------------------
         ACTIVE
      ------------------------- */

      if (
        isActive !== undefined
      ) {
        item.isActive =
          Boolean(isActive);
      }

      await item.save();

      res.status(200).json({
        success: true,

        message:
          "Menu item updated successfully",

        data: item,
      });
    } catch (error) {
      console.error(
        "Update menu error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Failed to update menu item",

        error: error.message,
      });
    }
  };

/* =========================================================
   DELETE MENU ITEM
========================================================= */

export const deleteMenuItem =
  async (req, res) => {
    try {
      const item =
        await Menu.findById(
          req.params.id
        );

      if (!item) {
        return res.status(404).json({
          success: false,
          message:
            "Menu item not found",
        });
      }

      await item.deleteOne();

      res.status(200).json({
        success: true,

        message:
          "Menu item deleted successfully",
      });
    } catch (error) {
      console.error(
        "Delete menu error:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          "Failed to delete menu item",
      });
    }
  };