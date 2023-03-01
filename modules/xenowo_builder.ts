enum categories {
  fun,
  utility,
  nsfw,
  image,
}
class xenoBuilder {
  name: string;
  description: string;
  category: categories;
  constructor(name: string, description: string, category: categories) {
    this.name = name;
    this.description = description;
    this.category = category;
  }
}
module.exports = {
  categories,
  xenoBuilder,
};
