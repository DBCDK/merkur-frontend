const nextjsBaseUrl = Cypress.env("nextjsBaseUrl");
const endpoint = "/api/files/unclaimed";

describe("Tests /files/unclaimed endpoint", () => {
  it("OK", () => {
    cy.request({
      url: nextjsBaseUrl + endpoint,
      auth: {
        user: "810010",
        pass: "pass",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.lengthOf(5);
    });
  });
});
