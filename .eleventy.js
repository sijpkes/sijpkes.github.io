module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("h5p");
  eleventyConfig.addPassthroughCopy("luto");

  return {
    dir: {
      input: ".",
      includes: "src/_includes",
      data: "src/_data",
      output: "_site"
    }
  };
};
