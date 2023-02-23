describe("rescue", () => {
  context("slack configuration", () => {
    it("Should be looged on rescue", function () {
      cy.visit("http://rescue.rc.adopets.com");
      cy.url().should('contain', 'fake error test')
    });
  });
});
