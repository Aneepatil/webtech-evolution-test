import { Schema, model } from "mongoose";

const subCategorySchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    name: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
    // Below fileds are to keep tack of last modified by who and created by and deleted by
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const SubCategory = model("SubCategory", subCategorySchema);
