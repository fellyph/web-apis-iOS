describe('Check exercises links', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('check if the page loads', () => {
    cy.get('[data-cy=site-logo]')
      .invoke('text')
      .should('equal', 'PWA');
  })
})
