/* eslint-disable no-undef */
describe('App end to end test', () => {
  it('Should have a header', () => {
    cy.visit('/');
    cy.get('p')
      .should('have.text', 'Authors Haven by Coding Geeks');
  });
});
