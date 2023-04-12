const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v4: uuid } = require("uuid");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  }

  type Author {
    born: Int!
    bookCount: Int!
    name: String!
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [String!]!
    bookCount: Int!
    authorCount: Int!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editBook(
      title: String!
      author: String!
      published: Int
      genres: [String]
    ): Book
  }`;

const resolvers = {
  Query: {
    allBooks: (root, args) => {
      // both are present
      if (args.genre && args.author) {
        const results = [];
        if (b.author === args.author && b.genres.includes(args.genre)) {
          results.push(b);
        }
        return results;
      }
      // author is present
      if (args.author && !args.genre) {
        return books.filter((b) => b.author === args.author);
      }
      // genres are present
      if (args.genre && !args.author) {
        return books.filter((b) => b.genres.includes(args.genre));
      }
      // neither arg is present
      if (!args.author && !args.genre) {
        return books;
      }

      throw new Error("Whoops. Check the allBooks resolver.");
    },
    allAuthors: () => {
      const authorsResult = [];

      authors.map((a) => {
        if (!authorsResult.includes(a.id)) {
          const newAuthor = {
            born: a.born,
            name: a.name,
            bookCount: 1,
          };
        } else {
          // increment bookCount
        }
      });

      books.map((b) => {
        if (!authorsResult.includes(b.author)) {
          // need to add logic to grab born, name, and bookCount -- bookCount should be 1 up here
          const newAuthor = {};
          authorsResult.push(b.author);
        } else {
          // increment the book count
        }
      });
      return authors;
    },
    bookCount: (root, args) => books.length,
    authorCount: (root, args) => {
      const checkSet = [];
      for (let i = 0; i < books.length; i++) {
        const book = books[i];
        // console.log(book);
        if (!checkSet.includes(book.author)) {
          checkSet.push(book.author);
        }
      }
      // console.log(checkSet);
      return checkSet.length;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      if (books.find((b) => b.title === args.title)) {
        throw new GraphQLError(`Duplicate entry for ${args.title}.`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }

      const book = { ...args, id: uuid() };
      books = books.concat(book);
      return book;
    },
    editBook: (root, args) => {
      const book = books.find((b) => b.title === args.title);
      if (!book) {
        return null;
      }

      const updatedBook = {
        ...book,
        title: args.title,
        author: args.author,
        published: args.published,
        genres: args.genres,
      };
      books = books.map((b) => (b.title === args.title ? updatedBook : b));
      return updatedBook;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
