describe('Note app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'mike',
      username: 'mike',
      password: 'whatsup',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('');
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
    cy.get('#username').type('mike');
    cy.get('#password').type('whatsup');
    cy.get('#btn-login').click();

    cy.contains('mike logged in');
  });

  it('login fails with incorrect credentials', function () {
    cy.contains('Login').click();
    cy.get('#username').type('mike');
    cy.get('#password').type('wrongPW');
    cy.get('#btn-login').click();

    cy.get('.error').should('contain', 'Incorrect username/password.');
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    cy.get('.error').should('have.css', 'border-style', 'solid');
    cy.get('.error').should('have.css', 'border-radius', '5px');

    cy.get('html').should('not.contain', 'mike logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mike', password: 'whatsup' });
    });

    it('a new note can be created', function () {
      cy.contains('New Note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('Save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note created by cypress!',
          important: true,
        });
      });

      it('can be made unimportant', function () {
        cy.get('.btn-important').contains('make unimportant').click();

        cy.get('.btn-important').contains('make important');
      });
    });

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one note can be made important', function () {
        cy.contains('second note').parent().find('button').as('btn');
        cy.get('@btn').click();
        cy.get('@btn').should('contain', 'make unimportant');
      });
    });
  });
});
