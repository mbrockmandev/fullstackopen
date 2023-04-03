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
    });
  });
});
