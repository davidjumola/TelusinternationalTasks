/// <reference types="cypress" />
import loginPageElem from './elements/loginElement/loginPage';
import homePageElem from './elements/loginElement/homePage';
import basicInfoPageElem from './elements/loginElement/basicInfoPage';

Cypress.Commands.add('loginProcess', () => {
    //Going to the Login page
    cy.visit(loginPageElem.loginUrl);

    //Typing the valid email
    cy.get(loginPageElem.inputPlaceholder, { timeout: 6000 })
        .filter(`:contains("${loginPageElem.emailInputStr}")`, { timeout: 6000 })
        .then((emailInput) => {
            cy.wrap(emailInput, { timeout: 6000 }).type(loginPageElem.validEmailToType, {
                timeout: 6000,
            });
        });

    //Clicking the Continue button
    cy.get(loginPageElem.buttonLogin)
        .filter(':visible')
        .filter(`:contains("${loginPageElem.continueButtonStr}")`)
        .click();

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
});

Cypress.Commands.add('movingFromHomeToBasicInfoPage', () => {
    //Validates that the user profile icon is visible
    cy.get(homePageElem.profileLogoIcon, { timeout: 6000 })
        .scrollIntoView({ timeout: 6000 })
        .then((profileIcon) => {
            cy.wrap(profileIcon, { timeout: 6000 }).should('be.visible', { timeout: 6000 });
        });

    //Clicking the profile logo icon
    cy.get(homePageElem.profileLogoIcon, { timeout: 6000 }).click({ timeout: 6000 });

    //Clicking the My Profile Navigation option
    cy.get(homePageElem.profilePopUp, { timeout: 6000 })
        .should('be.visible', { timeout: 6000 })
        .children({ timeout: 6000 })
        .filter(`:contains("${homePageElem.myProfileNavStr}")`, { timeout: 6000 })
        .click({ timeout: 6000 });

    //Validates that the User is redirected to the Basic information Page
    cy.get(basicInfoPageElem.titleHeader, { timeout: 6000 })
        .filter(`:contains("${basicInfoPageElem.basicInfoTitleHeaderStr}")`, { timeout: 6000 })
        .should('be.visible', { timeout: 6000 });
});
