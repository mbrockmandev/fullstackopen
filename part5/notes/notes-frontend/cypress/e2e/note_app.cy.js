describe('Note app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'mike',
      username: 'mike',
      password: 'whatsup',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Notes App');
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2023',
    );
  });

  it('login form can be opened', function () {
    cy.contains('Login').click();
  });

  it('user can login', function () {
    cy.contains('Login').click();
    cy.get('input.username').type('mike');
    cy.get('input.password').type('whatsup');
    cy.get('#login-button').click();

    cy.contains('mike logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('Login').click();
      cy.get('input.username').type('mike');
      cy.get('input.password').type('whatsup');
      cy.get('#login-button').click();
    });

    it('a new note can be created', function () {
      cy.contains('New Note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('Save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('New Note').click();
        cy.get('input').type('another note created by cypress');
        cy.contains('Save').click();
      });

      it('can be made unimportant', function () {
        cy.get('.btn-important').contains('make unimportant').click();

        cy.get('.btn-important').contains('make important');
      });
    });
  });

  it.only('login fails with incorrect credentials', function () {
    cy.contains('Login').click();
    cy.get('#username').type('mike');
    cy.get('#password').type('wrongPW');
    cy.get('#btn-login').click();

    cy.contains('Incorrect username/password.');
  });
});
