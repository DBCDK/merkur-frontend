const nextjsBaseUrl = Cypress.env("nextjsBaseUrl");
const endpoint = "/api/periodic-jobs";

describe("Tests /periodic-jobs endpoint", () => {
  it("OK", () => {
    cy.request({
      url: nextjsBaseUrl + endpoint,
      auth: {
        user: "810010",
        pass: "yukilo",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.lengthOf(0);
    });
  });
});
