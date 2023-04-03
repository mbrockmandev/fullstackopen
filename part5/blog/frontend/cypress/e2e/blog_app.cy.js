describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'mike',
      username: 'mike',
      password: '12345',
    };
    cy.makeUser(user);
    cy.visit('');
  });

  it('Login Form Is Shown', function () {
    cy.contains('Username: ');
    cy.contains('Password: ');
    cy.contains('Login');
  });

  describe('Login', function () {
    it('can login with correct credentials', function () {
      cy.get('#username').type('mike');
      cy.get('#password').type('12345');
      cy.get('#btn-login').click();
      cy.contains('logged in');
      cy.visit('');
    });

    it('cannot login with incorrect credentials', function () {
      cy.get('#username').type('mikey');
      cy.get('#password').type('123456');
      cy.get('#btn-login').click();
      cy.contains('Incorrect username/password');
      cy.visit('');
    });
  });

  describe('When Logged In', function () {
    beforeEach(function () {
      //log in user
      const user = {
        username: 'mike',
        password: '12345',
      };
      // cy.request('POST', `${Cypress.env('BACKEND')}/login`, user);
      cy.login(user);
      cy.visit('');
    });

    it('blog can be created', function () {
      cy.createBlog({
        title: 'a new title',
        author: 'ME!',
        url: 'https://localhost.google.com/',
      });
      cy.contains('a new title -- ME!');
    });

    it('blog can be liked', function () {
      cy.createBlog({
        title: 'a new title',
        author: 'ME!',
        url: 'https://localhost.google.com/',
      });
      cy.contains('a new title -- ME!');
      // like blog
      cy.get('#btn-details').click();
      cy.contains('User: mike');
      cy.get('#btn-like').click();
      cy.contains('Likes: 1');
    });

    it('blog can be deleted by authorized user', function () {
      // delete blog
      cy.createBlog({
        title: 'a new title',
        author: 'ME!',
        url: 'https://localhost.google.com/',
      });
      cy.contains('a new title -- ME!').as('blogToBeDeleted');
      // like blog
      cy.get('#btn-details').click();
      cy.contains('User: mike');
      cy.get('#btn-delete').click();
      cy.on('window:confirm', () => true);
      cy.get('@blogToBeDeleted').should('not.exist');
    });

    it('blog does not show delete button for non-owners', function () {
      // create new user
      // login with new user
      const user = {
        name: 'mike',
        username: 'mike',
        password: '12345',
      };
      cy.login(user);
      // post a blog
      const newBlog = {
        title: 'A New Hope (title)',
        author: 'George Lucas',
        url: 'https://starwars.com/',
      };
      cy.createBlog(newBlog);
      cy.get('#btn-details').click();
      cy.get('#btn-delete').as('deleteButton');
      // logout
      cy.get('#btn-logout').click();

      // check that I am logged out
      cy.contains('Username: ');
      cy.contains('Password: ');
      cy.contains('Login');

      cy.intercept('POST', '/api/logout', (req) => {
        expect(req.headers.authorization).to.equal(null);
        req.reply(200);
      });

      // make new user
      const newUser = {
        name: 'rachel',
        username: 'rachel',
        password: 'whatsup',
      };
      cy.makeUser(newUser);
      // log back in as another user
      cy.login(newUser);
      // cy.visit('');
      // look for delete button on page which should be absent
      cy.get('#btn-details').click();
      cy.get('@deleteButton').should('not.exist');
    });

    it.only('clicking on the blog sort button changes sorting methods', function () {
      // lots of steps here...?
      cy.login({ name: 'mike', username: 'mike', password: '12345' });
      // add multiple blog posts

      const blogs = [
        {
          title: 'A Beginners Guide to JavaScript',
          author: 'John Smith',
          url: 'https://www.example.com/beginners-guide-to-javascript',
          likes: 12,
          user: '6424d92f387e05e6c8d3342e',
        },
        {
          title: '10 Tips for Writing Better Code',
          author: 'Jane Doe',
          url: 'https://www.example.com/10-tips-for-writing-better-code',
          likes: 25,
          user: '6424d92f387e05e6c8d3342e',
        },
        {
          title: 'The Future of Web Development',
          author: 'Alex Johnson',
          url: 'https://www.example.com/future-of-web-development',
          likes: 18,
          user: '6424d92f387e05e6c8d3342e',
        },
        {
          title: 'How to Build a RESTful API',
          author: 'Sarah Lee',
          url: 'https://www.example.com/building-a-restful-api',
          likes: 8,
          user: '6424d92f387e05e6c8d3342e',
        },
        {
          title: 'Introduction to React.js',
          author: 'Mike Brown',
          url: 'https://www.example.com/introduction-to-react-js',
          likes: 35,
          user: '6424d92f387e05e6c8d3342e',
        },
        {
          title: '10 Ways to Speed Up Your Website',
          author: 'Lisa Kim',
          url: 'https://www.example.com/10-ways-to-speed-up-your-website',
          likes: 17,
          user: '6424d92f387e05e6c8d3342e',
        },
        {
          title: 'Best Practices for Node.js Development',
          author: 'David Jones',
          url: 'https://www.example.com/best-practices-for-node-js-development',
          likes: 22,
          user: '6424d92f387e05e6c8d3342e',
        },
        {
          title: 'Creating Custom WordPress Themes',
          author: 'Emily Davis',
          url: 'https://www.example.com/creating-custom-wordpress-themes',
          likes: 11,
          user: '6424d92f387e05e6c8d3342e',
        },
        {
          title: 'Introduction to Machine Learning',
          author: 'Chris Lee',
          url: 'https://www.example.com/introduction-to-machine-learning',
          likes: 29,
          user: '6424d92f387e05e6c8d3342e',
        },
        {
          title: 'How to Secure Your Web Application',
          author: 'Brian Johnson',
          url: 'https://www.example.com/how-to-secure-your-web-application',
          likes: 14,
          user: '6424d92f387e05e6c8d3342e',
        },
      ];
      cy.createMultipleBlogs(blogs);

      cy.get('#btn-sort').as('sortButton').click().click();

      // select all the title author pairs
      cy.get('div.title-author').then(($elements) => {
        const strings = [...$elements].map((element) => element.innerText);
        expect(strings[0]).to.deep.equal(
          'Introduction to React.js -- Mike Brown',
        );
        expect(strings[9]).to.deep.equal(
          'How to Build a RESTful API -- Sarah Lee',
        );
      });
    });
  });
});
