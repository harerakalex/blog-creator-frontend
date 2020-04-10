/* eslint-disable func-names */
/* eslint-disable no-undef */
describe('Knowledge Base Application', () => {
  beforeEach(() => {
    cy.fixture('users/LogIn').as('user');
  });
  it('Should be able to login: user', function () {
    cy.visit('/login');

    cy
      .get('input[name="email"]')
      .type(this.user.email)
      .should('have.value', this.user.email);
    cy
      .get('input[name="password"]')
      .type(this.user.password)
      .should('have.value', this.user.password);
    cy.get('form').submit();
    cy.location('pathname').should('eq', '/');
  });
});
