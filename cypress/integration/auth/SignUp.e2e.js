const user = {
  firstname: 'someone',
  lastname: 'someone',
  username: 'someone',
  email: 'someone@someone.com',
  password: 'someone',
  confirmPassword: 'someone'
};

describe('Sign Up Component End-To-End Tests', () => {
  beforeEach(() => {
    cy.visit('/Signup');
  });
  it('should find the sign up heading', () => {
    cy.get('.heading__title').should('have.text', 'Sign Up');
  });
  it('should find the login link', () => {
    cy.get('.heading__link').should('have.text', 'Log In');
  });
  it('should find the social login buttons', () => {
    cy.get('.flex-container__google-btn').should(
      'have.text',
      'LOGIN WITH GOOGLE'
    );
    cy.get('.flex-container__twitter-btn').should(
      'have.text',
      'LOGIN WITH TWITTER'
    );
    cy.get('.flex-container__facebook-btn').should(
      'have.text',
      'LOGIN WITH FACEBOOK'
    );
  });
  it('should fillup the form and try to register the user', () => {
    cy.get('#firstName')
      .type(user.firstname)
      .should('have.value', user.firstname);
    cy.get('#lastName')
      .type(user.lastname)
      .should('have.value', user.username);
    cy.get('#userName')
      .type(user.username)
      .should('have.value', user.username);
    cy.get('#email')
      .type(user.email)
      .should('have.value', user.email);
    cy.get('#password')
      .type(user.password)
      .should('have.value', user.password);
    cy.get('#confirmPassword')
      .type(user.confirmPassword)
      .should('have.value', user.confirmPassword);
    cy.get('.flex-container__button').should('have.text', 'Sign Up');
    cy.get('form').submit();
    cy.location('pathname').should('eq', '/Signup');
  });
});
