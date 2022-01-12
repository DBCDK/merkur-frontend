const nextjsBaseUrl = Cypress.env("nextjsBaseUrl");
const endpoint = "/api/files";

describe("Tests /files endpoint", () => {
  it("OK - 810010", () => {
    cy.request({
      url: nextjsBaseUrl + endpoint,
      auth: {
        user: "810010",
        pass: "yukilo",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.lengthOf(7);
    });
  });

  it("OK - 820030", () => {
    cy.request({
      url: nextjsBaseUrl + endpoint,
      auth: {
        user: "820030",
        pass: "yukilo",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.lengthOf(3);
    });
  });
});
