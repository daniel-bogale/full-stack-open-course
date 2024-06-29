const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((tot, blog) => tot + blog.likes, 0);

module.exports = { dummy, totalLikes };
