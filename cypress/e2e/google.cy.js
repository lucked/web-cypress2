describe("rescue", () => {
  context("login", () => {
    it("passes a test", function () {
      cy.visit("http://google.com");
      cy.url().should('contain', 'google')
    });
  });
});
