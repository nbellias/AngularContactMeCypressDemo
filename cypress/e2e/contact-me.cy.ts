describe('ContactMeComponent Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('should load the form', () => {
    cy.get('h2').contains('Contact Me');
    cy.get('input#name').should('be.visible');
    cy.get('input#email').should('be.visible');
    cy.get('textarea#message').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    cy.get('button').contains('Reset').should('be.visible');
  });

  it('should validate form fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('input#name:invalid').should('exist');
    cy.get('input#email:invalid').should('exist');
    cy.get('textarea#message:invalid').should('exist');
  });

  it('should show error messages for invalid inputs', () => {
    cy.get('input#name').type('A');
    cy.get('input#email').type('invalid-email');
    cy.get('textarea#message').type('Short');
    cy.get('button[type="submit"]').click();

    cy.contains('Name is required and must be at least 3 characters');
    cy.contains('Valid email is required');
    cy.contains('Message is required and must be at least 10 characters');
  });

  it('should reset form inputs when Reset button is clicked', () => {
    cy.get('input#name').type('John Doe');
    cy.get('input#email').type('johndoe@example.com');
    cy.get('textarea#message').type('This is a test message.');
    cy.get('button').contains('Reset').click();

    cy.get('input#name').should('have.value', '');
    cy.get('input#email').should('have.value', '');
    cy.get('textarea#message').should('have.value', '');
  });

  it('should submit the form with valid data', () => {
    cy.get('input#name').type('John Doe');
    cy.get('input#email').type('johndoe@example.com');
    cy.get('textarea#message').type('This is a test message.');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Form Submitted Successfully!');
    });
  });

  it('should disable submit button if form is invalid', () => {
    cy.get('input#name').type('John');
    cy.get('button[type="submit"]').should('not.be.disabled');

    cy.get('input#name').clear();
    cy.get('button[type="submit"]').should('be.disabled');
  });
});
