import basicInfoPageElem from '../../support/elements/loginElement/basicInfoPage';
import homePageElem from '../../support/elements/loginElement/homePage';

describe('Test Case 2 - Update Profile and Contact Information', () => {
    it('Validated that the user can update profile and contact information', () => {
        //login process method
        cy.loginProcess();

        //Scenario for edit Phone Number

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

        //Clicking the Edit button in Contact Info Section
        cy.get(basicInfoPageElem.contactInfoSection).find(basicInfoPageElem.editButton).click();

        //Editing the phone number
        cy.get(basicInfoPageElem.phoneNumberSection)
            .find(basicInfoPageElem.phoneNumberInput)
            .invoke('val')
            .then((phoneNumber) => {
                const incrementedPhoneNumber = (parseInt(phoneNumber) + 1).toString();
                cy.wrap(incrementedPhoneNumber).as('newPhoneNumber');
            });

        //Typing the new phone number
        cy.get('@newPhoneNumber').then((newPhoneNumber) => {
            cy.get(basicInfoPageElem.phoneNumberSection)
                .find(basicInfoPageElem.phoneNumberInput)
                .clear()
                .type(newPhoneNumber);
        });

        //Clicking the Save button
        cy.get(basicInfoPageElem.buttonBasicInformation)
            .filter(`:contains("${basicInfoPageElem.saveButtonStr}")`)
            .then((saveButton) => {
                cy.wrap(saveButton).should('be.visible');
                cy.wrap(saveButton).click();
                cy.wrap(saveButton).should('not.exist');
            });

        // Validates that the phone number is edited
        cy.get('@newPhoneNumber').then((newPhoneNumber) => {
            cy.get(basicInfoPageElem.contactInfoSection)
                .children()
                .eq(3)
                .should('have.text', '+63' + newPhoneNumber);
        });

        //Scenario for edit Location

        //Clicking edit button in location section
        cy.get(basicInfoPageElem.locationSection).find(basicInfoPageElem.editButton).click();

        //Editing the location
        cy.get(basicInfoPageElem.locationSection)
            .find(basicInfoPageElem.streetAddressInput)
            .invoke('val')
            .then((address) => {
                const baseAddress = address.slice(0, -1);
                const addressNumber = parseInt(address.slice(-1), 10);
                const incrementedAddressNumber = baseAddress + (addressNumber + 1);

                cy.wrap(incrementedAddressNumber).as('newAddressNumber');
            });

        //Typing the new address number using the correct alias
        cy.get('@newAddressNumber').then((newAddressNumber) => {
            cy.get(basicInfoPageElem.locationSection)
                .find(basicInfoPageElem.streetAddressInput)
                .clear()
                .type(newAddressNumber);
        });

        //Clicking the Save button
        cy.get(basicInfoPageElem.buttonBasicInformation)
            .filter(`:contains("${basicInfoPageElem.saveButtonStr}")`)
            .then((saveButton) => {
                cy.wrap(saveButton).should('be.visible');
                cy.wrap(saveButton).click();
                cy.wrap(saveButton).should('not.exist', { timeout: 6000 });
            });

        //Validates that the Toast message title "Success" is visible
        cy.get(basicInfoPageElem.toastMessage, { timeout: 6000 })
            .find(basicInfoPageElem.toastTitle, { timeout: 6000 })
            .should('be.visible', { timeout: 6000 })
            .and('have.text', basicInfoPageElem.successToastTitleStr, { timeout: 6000 });

        //Validates that the Toast message description "Location successfully saved!" is visible
        cy.get(basicInfoPageElem.toastMessage)
            .find(basicInfoPageElem.toastDescription)
            .should('be.visible')
            .and('have.text', basicInfoPageElem.locationSuccesfullySavedToastDescStr);

        //Validates that the Address is edited
        cy.get('@newAddressNumber').then((newAddressNumber) => {
            cy.get(basicInfoPageElem.locationSection)
                .children()
                .children()
                .eq(1)
                .children()
                .children()
                .first()
                .children()
                .last()
                .should('have.text', newAddressNumber);
        });
    });
});
