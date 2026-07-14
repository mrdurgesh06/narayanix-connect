// Applies a consistent JSON shape to a Mongoose schema:
// - Renames _id -> id (string)
// - Removes __v and (optionally) sensitive fields
function applyToJSON(schema, hideFields = []) {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      hideFields.forEach((field) => delete ret[field]);
      return ret;
    },
  });
}

module.exports = applyToJSON;
