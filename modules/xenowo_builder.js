var categories = ["fun", "image", "nsfw", "utility"];
class xenoBuilder {
  constructor(name, description, category) {
    if (!categories.includes(category))
      return { message: "Invalid Category", code: "ERR_INVALID_CATEGORY" };
    this.name = name;
    this.description = description;
    this.category = category;
  }
}
module.exports = {
  categories,
  xenoBuilder,
};
