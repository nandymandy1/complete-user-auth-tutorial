import { check } from "express-validator";

const title = check("title", "Title is required").not().isEmpty();
const content = check("content", "Content for the post is required.")
  .not()
  .isEmpty();

export const postValidations = [title, content];
