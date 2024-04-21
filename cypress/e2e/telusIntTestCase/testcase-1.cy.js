import homePageElem from '../../support/elements/loginElement/homePage';
import loginPageElem from '../../support/elements/loginElement/loginPage';

describe('Test Case 1 - Verify Login Authentication', () => {
    it('Validated that the login authentication is working as expected', () => {
        //Going to the Login page
        cy.visit(loginPageElem.loginUrl);

        //Validates that the user is redirected to the correct url
        cy.url({ timeout: 6000 }).should('contains', loginPageElem.loginUrl);

        //Validates that the Logo is visible
        cy.get(loginPageElem.telusIntLogo).should('be.visible');

        //Validates that the Email input is visible
        cy.get(loginPageElem.inputPlaceholder)
            .filter(`:contains("${loginPageElem.emailInputStr}")`)
            .should('be.visible');

        //Typing the valid email
        cy.get(loginPageElem.inputPlaceholder)
            .filter(`:contains("${loginPageElem.emailInputStr}")`)
            .then((emailInput) => {
                cy.wrap(emailInput).type(loginPageElem.validEmailToType);
            });

        //Clicking the Continue button
        cy.get(loginPageElem.buttonLogin)
            .filter(':visible')
            .filter(`:contains("${loginPageElem.continueButtonStr}")`)
            .click();

        //Validates that the Password input is visible
        cy.get(loginPageElem.inputPlaceholder)
            .filter(`:contains("${loginPageElem.passwordInputStr}")`)
            .should('be.visible');

        //Typing the password in the input
        cy.get(loginPageElem.inputPlaceholder)
            .filter(`:contains("${loginPageElem.passwordInputStr}")`)
            .then((passwordInput) => {
                cy.wrap(passwordInput).clear();
                cy.wrap(passwordInput).type(loginPageElem.validPasswordToType);
            });

        //Clicking the Sign In button
        cy.get(loginPageElem.buttonLogin)
            .filter(':visible')
            .filter(`:contains("${loginPageElem.signInButtonStr}")`)
            .click();

        //Validates that the user profile icon is visible
        cy.get(homePageElem.profileLogoIcon, { timeout: 6000 })
            .scrollIntoView()
            .then((profileIcon) => {
                cy.wrap(profileIcon).should('be.visible');
            });
    });
});
