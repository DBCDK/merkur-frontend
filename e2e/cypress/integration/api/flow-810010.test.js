const nextjsBaseUrl = Cypress.env("nextjsBaseUrl");
const endpoint = "/api/files/7511692/claimed";

describe("Tests /files/[id]/claimed endpoint", () => {
    it(`Call without authorization header to get realm`, () => {
        cy.request({
            url: nextjsBaseUrl + "/api/files/unclaimed",
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.headers).to.have.property("www-authenticate", 'Basic realm="DBC merkur"');
            expect(response.body).to.eq("Missing Authorization header");
        }).debug();
    });

    it("List files", () => {
        cy.request({
            url: nextjsBaseUrl + "/api/files/unclaimed",
            auth: {
                user: "810010",
                pass: "pass",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.lengthOf(5);
        });
    });

    it("Get file", () => {
        cy.request({
            url: nextjsBaseUrl + "/api/files/7511692",
            auth: {
                user: "810010",
                pass: "pass",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.eq("julemand\njulemand\n");
        });
    });

    it("Claim file", () => {
        cy.request({
            url: nextjsBaseUrl + "/api/files/7511692/claimed",
            method: "POST",
            auth: {
                user: "810010",
                pass: "pass",
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.eq("");
        });
    });
});
