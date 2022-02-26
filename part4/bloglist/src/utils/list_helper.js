const dummy = () => 1;

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs)) return 0;
  let total = 0;
  blogs.forEach(({ likes }) => {
    total += likes;
  });
  return total;
};

const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return {};
  let favouriteIndex = 0;
  let favouriteLikes = 0;
  blogs.forEach(({ likes }, index) => {
    if (likes > favouriteLikes) {
      favouriteIndex = index;
      favouriteLikes = likes;
    }
  });
  const favourite = blogs[favouriteIndex];
  const { title, author, likes } = favourite;
  return { title, author, likes };
};

const mostBlogs = (listOfBlogs) => {
  if (!Array.isArray(listOfBlogs) || listOfBlogs.length === 0) return {};

  const authors = new Map();
  listOfBlogs.forEach(({ author }) => {
    if (authors.has(author)) {
      authors.set(author, authors.get(author) + 1);
    } else {
      authors.set(author, 1);
    }
  });

  let author = '';
  let blogs = 0;
  authors.forEach((number, name) => {
    if (number > blogs) {
      author = name;
      blogs = number;
    }
  });
  return { author, blogs };
};

const mostLikes = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return {};

  const authors = new Map();
  blogs.forEach(({ author, likes }) => {
    if (authors.has(author)) {
      authors.set(author, authors.get(author) + likes);
    } else {
      authors.set(author, likes);
    }
  });

  let author = '';
  let likes = 0;
  authors.forEach((number, name) => {
    if (number >= likes) {
      author = name;
      likes = number;
    }
  });
  return { author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
