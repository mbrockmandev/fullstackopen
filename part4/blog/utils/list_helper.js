const dummy = (blogs) => {
  if (blogs.length === 0) return 0;

  const totalLikes = blogs.reduce((acc, curr) => acc + curr.likes, 0);
  return totalLikes;
};

module.exports = { dummy };
