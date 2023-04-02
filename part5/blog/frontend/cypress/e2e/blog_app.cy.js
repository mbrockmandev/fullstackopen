describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'mike',
      username: 'mike',
      password: '12345',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
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
      cy.contains('a new title -- ME!');
      // like blog
      cy.get('#btn-details').click();
      cy.contains('User: mike');
      cy.get('#btn-delete').click();
      cy.contains('');



      // it('Handling JS Confirm - Validate Confirm Text and Click OK', () => {
      //   cy.contains('Click for JS Confirm').click()
      //   cy.on('window:confirm', (str) => {
      //     expect(str).to.equal(`I am a JS Confirm`)
      //   })
      //   cy.on('window:confirm', () => true)
      //   cy.get('#result').should('have.text', 'You clicked: Ok')
      // })

    });

    it('blog does not show delete button for non-owners', function () {
      // create new user
      // login with new user
      // then post a blog
      // then logout
      // log back in as another user
      // look for delete button on page
    });

    it('clicking on the blog sort button changes sorting methods', function () {
      // lots of steps here...?
    });
  });
});
