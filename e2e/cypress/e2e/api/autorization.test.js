const nextjsBaseUrl = Cypress.env("nextjsBaseUrl");
const endpoints = [
  "/api/conversions",
  "/api/conversions/unclaimed",
  "/api/files/1/claimed",
  "/api/files/1",
  "/api/files",
  "/api/files/search",
  "/api/files/unclaimed",
  "/api/periodic-jobs",
  "/api/periodic-jobs/unclaimed",
];

describe("Test authorization for all endpoints", () => {
  endpoints.forEach((endpoint) => {
    it(`${endpoint}: Missing Authorization header`, () => {
      cy.request({
        url: nextjsBaseUrl + endpoint,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.headers).to.have.property(
          "www-authenticate",
          'Basic realm="DBC merkur"',
        );
        expect(response.body).to.eq("Missing Authorization header");
      });
    });

    it(`${endpoint}: Authorization header must include both type and credentials`, () => {
      cy.request({
        url: nextjsBaseUrl + endpoint,
        headers: {
          Authorization: "Basic",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.headers).to.have.property(
          "www-authenticate",
          'Basic realm="DBC merkur"',
        );
        expect(response.body).to.eq(
          "Authorization header must include both type and credentials",
        );
      });
    });

    it(`${endpoint}: Authorization type must be Basic`, () => {
      cy.request({
        url: nextjsBaseUrl + endpoint,
        auth: {
          bearer: "bearerToken",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.headers).to.have.property(
          "www-authenticate",
          'Basic realm="DBC merkur"',
        );
        expect(response.body).to.eq("Authorization type must be Basic");
      });
    });

    it(`${endpoint}: Apikey must include both user and secret`, () => {
      cy.request({
        url: nextjsBaseUrl + endpoint,
        headers: {
          Authorization: "Basic test",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.headers).to.have.property(
          "www-authenticate",
          'Basic realm="DBC merkur"',
        );
        expect(response.body).to.eq("Apikey must include both user and secret");
      });
    });

    it(`${endpoint}: Unknown agency ID or apikey - only user set`, () => {
      cy.request({
        url: nextjsBaseUrl + endpoint,
        auth: {
          user: "user",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.headers).to.have.property(
          "www-authenticate",
          'Basic realm="DBC merkur"',
        );
        expect(response.body).to.eq("Unknown agency ID or apikey");
      });
    });

    it(`${endpoint}: Unknown agency ID or apikey - wrong credentials`, () => {
      cy.request({
        url: nextjsBaseUrl + endpoint,
        auth: {
          user: "user",
          pass: "wrongpassword",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.headers).to.have.property(
          "www-authenticate",
          'Basic realm="DBC merkur"',
        );
        expect(response.body).to.eq("Unknown agency ID or apikey");
      });
    });
  });
});
