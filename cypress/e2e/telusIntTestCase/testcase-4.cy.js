import homePageElem from '../../support/elements/loginElement/homePage';
import loginPageElem from '../../support/elements/loginElement/loginPage';

describe('Test Case 4 - Test Logout Functionality', () => {
    it('Validated that the user can properly logout as expected', () => {
        //login process method
        cy.loginProcess();

        //Validates that the user profile icon is visible
        cy.get(homePageElem.profileLogoIcon, { timeout: 6000 })
            .scrollIntoView({ timeout: 6000 })
            .then((profileIcon) => {
                cy.wrap(profileIcon, { timeout: 6000 }).should('be.visible', { timeout: 6000 });
            });

        //Clicking the profile logo icon
        cy.get(homePageElem.profileLogoIcon, { timeout: 6000 }).click({ timeout: 6000 });

        //Clicking the Sign Out Navigation option
        cy.get(homePageElem.profilePopUp, { timeout: 6000 })
            .should('be.visible', { timeout: 6000 })
            .children({ timeout: 6000 })
            .filter(`:contains("${homePageElem.signOutNavStr}")`, { timeout: 6000 })
            .click({ timeout: 6000 });

        //Validates that the header test "Welcome back!" is visible
        cy.get(loginPageElem.welcomeTitleHeading, { timeout: 6000 })
            .filter(`:contains("${loginPageElem.welcomeTitleHeadingStr}")`)
            .should('be.visible', { timeout: 6000 });

        //Validates that the header test "Please sign in to continue." is visible
        cy.get(loginPageElem.pleaseSignInToContinueHelpertext, { timeout: 6000 })
            .filter(`:contains("${loginPageElem.pleaseSignInToContinueHelpertextStr}")`)
            .should('be.visible', { timeout: 6000 });
    });
});
