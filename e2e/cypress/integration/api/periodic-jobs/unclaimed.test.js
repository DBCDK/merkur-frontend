const nextjsBaseUrl = Cypress.env("nextjsBaseUrl");
const endpoint = "/api/periodic-jobs/unclaimed";

describe("Tests /periodic-jobs/unclaimed endpoint", () => {
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
