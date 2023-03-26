const dummy = (blogs) => {
  if (blogs.length === 0) return 0;

  const totalLikes = blogs.reduce((acc, curr) => acc + curr.likes, 0);
  return totalLikes;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;

  const max = blogs.reduce((prev, curr) =>
    prev.likes > curr.likes ? prev : curr,
  );

  return max;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  const authors = blogs.reduce((acc, curr) => {
    const index = acc.findIndex((item) => item.author === curr.author);
    if (index > -1) {
      acc[index].blogs++;
    } else {
      acc.push({ author: curr.author, blogs: 1 });
    }
    return acc;
  }, []);

  const mostProlificAuthor = authors.reduce((max, author) =>
    max.blogs > author.blogs ? max : author,
  );

  return mostProlificAuthor;
};

const mostLiked = (blogs) => {
  if (blogs.length === 0) return {};

  const authors = blogs.reduce((acc, curr) => {
    const index = acc.findIndex((item) => item.author === curr.author);
    if (index > -1) {
      acc[index].likes += curr.likes;
    } else {
      acc.push({ author: curr.author, likes: curr.likes });
    }
    return acc;
  }, []);

  const mostLikedAuthor = authors.reduce((max, author) =>
    max.likes > author.likes ? max : author,
  );

  console.log(mostLikedAuthor);
  return mostLikedAuthor;
};

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLiked,
};
