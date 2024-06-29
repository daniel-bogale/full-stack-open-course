const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((tot, blog) => tot + blog.likes, 0);

const favoriteBlog = (blogs) =>
  blogs.sort((a, b) => b.likes - a.likes)[0] || {};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  const authorScore = {};
  blogs.map(({ author }) => {
    if (authorScore?.[author]) {
      authorScore[author] += 1;
    } else {
      authorScore[author] = 1;
    }
  });
  const authorScoreArr = [];
  for (const [key, value] of Object.entries(authorScore)) {
    authorScoreArr.push({
      author: key,
      blogs: value,
    });
  }
  return authorScoreArr.sort((a, b) => b.blogs - a.blogs)[0];
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
