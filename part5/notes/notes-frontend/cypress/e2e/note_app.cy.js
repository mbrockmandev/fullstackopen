describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
  });
});

describe('Note app', () => {
  beforeEach(function () {
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
  });
});
