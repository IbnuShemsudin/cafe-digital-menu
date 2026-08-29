import mongoose from "mongoose";

/* =========================================================
   LOCALIZED TEXT
========================================================= */

const localizedTextSchema =
  new mongoose.Schema(
    {
      en: {
        type: String,
        required: true,
        trim: true,
      },

      am: {
        type: String,
        required: true,
        trim: true,
      },

      om: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      _id: false,
    }
  );

/* =========================================================
   MENU SCHEMA
========================================================= */

const menuSchema =
  new mongoose.Schema(
    {
      /* =========================
         NAME
      ========================= */

      name: {
        type:
          localizedTextSchema,
        required: true,
      },

      /* =========================
         DESCRIPTION
      ========================= */

      description: {
        type:
          localizedTextSchema,
        required: true,
      },

      /* =========================
         INGREDIENTS
      ========================= */

      ingredients: {
        type:
          localizedTextSchema,

        default: {
          en: "",
          am: "",
          om: "",
        },
      },

      /* =========================
         PRICE
      ========================= */

      price: {
        type: Number,
        required: true,
        min: 0,
      },

      /* =========================
         CATEGORY
      ========================= */

      category: {
        type: String,
        required: true,
        trim: true,
      },

      /* =========================
         IMAGE
      ========================= */

      /*
        Supports BOTH:

        1. Public URL
           https://example.com/image.jpg

        2. Device image
           data:image/jpeg;base64,...
      */

      image: {
        type: String,
        default: "",
      },

      /* =========================
         TAGS
      ========================= */

      tags: [
        {
          type: String,

          enum: [
            "popular",
            "chef-pick",
            "vegetarian",
            "vegan",
            "spicy",
            "dairy-free",
            "gluten-free",
          ],
        },
      ],

      /* =========================
         AVAILABILITY
      ========================= */

      availability: {
        type: String,

        enum: [
          "available",
          "sold-out",
          "seasonal",
        ],

        default:
          "available",
      },

      /* =========================
         PREPARATION TIME
      ========================= */

      preparationTime: {
        type: String,

        default: "",

        trim: true,
      },

      /* =========================
         ACTIVE
      ========================= */

      isActive: {
        type: Boolean,

        default: true,
      },

      /* =========================
         SORT ORDER
      ========================= */

      sortOrder: {
        type: Number,

        default: 0,
      },
    },

    {
      timestamps: true,
    }
  );

/* =========================================================
   MODEL
========================================================= */

export default mongoose.model(
  "Menu",
  menuSchema
);