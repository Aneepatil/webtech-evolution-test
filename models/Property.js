import { Schema, model } from "mongoose";

const propertySchema = new Schema(
  {
    propertyName: {
      type: String,
      required: true,
    },
    availableDates: [
      {
        from:{
        type: Date,
        required: true,
      },
      to:{
        type: Date,
        required: true,
      }
    }
    ],
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    maxGuests:{
      type: Number,
      min:1,
      max:10,
      required: true,
    },
    isDeleted: { type: Boolean, required: true, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },  
  { timestamps: true }
);

export const Property = model("Property", propertySchema);
