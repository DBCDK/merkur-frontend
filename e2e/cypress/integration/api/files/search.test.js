const nextjsBaseUrl = Cypress.env("nextjsBaseUrl");
const endpoint = "/api/files/search";
const conversionsOrigin = "dataio/sink/marcconv";
const periodicJobsOrigin = "dataio/sink/periodic-jobs";
const defaultCategory = "dataout";

describe("Tests /files/search endpoint", () => {
  it("OK - normal agency", () => {
    cy.request({
      method: "POST",
      url: nextjsBaseUrl + endpoint,
      body: JSON.stringify({
        category: defaultCategory,
        origin: conversionsOrigin,
      }),
      auth: {
        user: "810010",
        pass: "yukilo",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.lengthOf(7);
    });
  });

  it("OK - admin agency", () => {
    cy.request({
      method: "POST",
      url: nextjsBaseUrl + endpoint,
      body: JSON.stringify({
        category: defaultCategory,
        origin: conversionsOrigin,
      }),
      auth: {
        user: "010100",
        pass: "qwerty",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.lengthOf(7);
    });
  });
});
