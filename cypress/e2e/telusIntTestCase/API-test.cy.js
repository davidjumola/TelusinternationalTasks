describe('API Testing with Cypress', () => {
    it('should retrieve user information', () => {
        cy.request({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users/1',
        }).then((response) => {
            expect(response.status).to.equal(200);

            const user = response.body;
            expect(user).to.have.property('id', 1);
            expect(user).to.have.property('name');
            expect(user).to.have.property('email');
            expect(user).to.have.property('username');
        });
    });

    it('should retrieve all users', () => {
        cy.request({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/users',
        }).then((response) => {
            expect(response.status).to.equal(200);

            expect(response.body).to.be.an('array');

            const firstUser = response.body[0];
            expect(firstUser).to.have.property('id', 1);
            expect(firstUser).to.have.property('name');
        });
    });
});
