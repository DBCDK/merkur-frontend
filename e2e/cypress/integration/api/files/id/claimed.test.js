const nextjsBaseUrl = Cypress.env("nextjsBaseUrl");
const endpoint = "/api/files/7511692/claimed";

describe("Tests /files/[id]/claimed endpoint", () => {
    it("OK", () => {
        cy.request({
            url: nextjsBaseUrl + endpoint,
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

    it("Attempt to download file owned by another agency", () => {
        cy.request({
            url: nextjsBaseUrl + endpoint,
            method: "POST",
            auth: {
                user: "test",
                pass: "test",
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body).to.eq(
                "Attempt to claim file owned by another agency"
            );
        });
    });
});
