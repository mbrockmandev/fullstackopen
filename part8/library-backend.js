const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const Author = require("./schema/author");
const Book = require("./schema/book");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_LIBRARY_URI;
console.log("Connecting to...", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.log("Error Connecting to MongoDB:", error.message));

const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    born: Int
    numOfBooks: Int!
    name: String!
    books: [Book!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    bookCount: Int!
    authorCount: Int!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editBook(
      title: String!
      author: String!
      published: Int
      genres: [String]
    ): Book
    editAuthor(
      name: String!
      born: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }`;

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      return Book.find({});

      // // both are present
      // if (args.genre && args.author) {
      //   const results = [];
      //   if (b.author === args.author && b.genres.includes(args.genre)) {
      //     results.push(b);
      //   }
      //   return results;
      // }
      // // author is present
      // if (args.author && !args.genre) {
      //   return books.filter((b) => b.author === args.author);
      // }
      // // genres are present
      // if (args.genre && !args.author) {
      //   return books.filter((b) => b.genres.includes(args.genre));
      // }
      // // neither arg is present
      // if (!args.author && !args.genre) {
      //   return books;
      // }
      //
      // throw new Error("Whoops. Check the allBooks resolver.");
    },
    allAuthors: async () => {
      return Author.find({});

      // const authorsResult = [];
      //
      // authors.map((a) => {
      //   const existingAuthor = authorsResult.find(
      //     (author) => author.name === a.name
      //   );
      //
      //   if (!existingAuthor) {
      //     authorsResult.push({
      //       name: a.name,
      //       born: a.born,
      //       numOfBooks: 1,
      //       books: books.filter((b) => b.author === a.name),
      //     });
      //   }
      // });
      //
      // authorsResult.forEach(
      //   (author) => (author.numOfBooks = author.books.length)
      // );
      //
      // return authorsResult;
    },

    bookCount: async (root, args) => {
      return Book.collection.countDocuments();
    },
    authorCount: async (root, args) => {
      return Author.collection.countDocuments();
      // const checkSet = [];
      // for (let i = 0; i < books.length; i++) {
      //   const book = books[i];
      //   // console.log(book);
      //   if (!checkSet.includes(book.author)) {
      //     checkSet.push(book.author);
      //   }
      // }
      // // console.log(checkSet);
      // return checkSet.length;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    login: async (root, args) => {
      if (!args.username || args.password !== "secret") {
        throw new GraphQLError("Wrong Credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: args.username,
        id: uuid(),
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    addBook: async (root, args, context) => {
      const book = new Book({ ...args });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("Not Authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving Book Failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: { ...args },
            error,
          },
        });
      }

      return book.save;
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
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name);
      if (!author) {
        return null;
      }

      const updatedAuthor = {
        ...author,
        born: args.born,
      };
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));
      return updatedAuthor;
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
