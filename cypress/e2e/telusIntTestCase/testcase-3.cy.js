import basicInfoPageElem from '../../support/elements/loginElement/basicInfoPage';

describe('Test Case 3 - Add Language Preferences', () => {
    it('Validated that the user can update language as expected', () => {
        //login process method
        cy.loginProcess();

        //Moving from Homepage to Basic Infomation page
        cy.movingFromHomeToBasicInfoPage();

        //Clicking Language side bar navigation
        cy.get(basicInfoPageElem.languageNavSideBar).should('be.visible').click();

        //Clicking edit/pen button
        cy.get(basicInfoPageElem.languageSection)
            .should('be.visible')
            .find(basicInfoPageElem.languageEditButton)
            .click();

        //Validates that the language edit section is visible
        cy.get(basicInfoPageElem.languageEditSection).should('be.visible');

        // Determine which language to switch to and switch it
        cy.get(basicInfoPageElem.langPlaceholderInput)
            .should('be.visible')
            .first()
            .invoke('text')
            .then((inputValue) => {
                if (inputValue === basicInfoPageElem.filipinoLanguageStr) {
                    // If the current language is Filipino, switch to English
                    cy.get(basicInfoPageElem.langDropdownButton).first().click();
                    cy.get(basicInfoPageElem.dropdownMenuSection)
                        .children()
                        .children()
                        .filter(`:contains("${basicInfoPageElem.englishLanguageStr}")`)
                        .click();

                    // Get the new language and set 'newLanguageSelected'
                    cy.get(basicInfoPageElem.langPlaceholderInput)
                        .first()
                        .should('be.visible')
                        .invoke('text')
                        .then((newLanguage) => {
                            const newLanguageSelected = newLanguage;
                            cy.wrap(newLanguageSelected).as('newLanguage');
                        });

                    //Clicking the Save button
                    cy.get(basicInfoPageElem.buttonBasicInformation)
                        .filter(`:contains("${basicInfoPageElem.saveButtonStr}")`)
                        .then((saveButton) => {
                            cy.wrap(saveButton).should('be.visible');
                            cy.wrap(saveButton).click();
                            cy.wrap(saveButton).should('not.exist');
                        });

                    //Validates that the new language has been saved
                    cy.get('@newLanguage').then((newLanguageSelected) => {
                        cy.get(basicInfoPageElem.languageSection)
                            .children()
                            .children()
                            .eq(1)
                            .children()
                            .first()
                            .should('have.text', newLanguageSelected);
                    });
                } else {
                    // If the current language is not Filipino, switch to Filipino
                    cy.get(basicInfoPageElem.langDropdownButton).first().click();
                    cy.get(basicInfoPageElem.dropdownMenuSection)
                        .children()
                        .children()
                        .filter(`:contains("${basicInfoPageElem.filipinoLanguageStr}")`)
                        .click();

                    // Get the new language and set 'newLanguageSelected'
                    cy.get(basicInfoPageElem.langPlaceholderInput)
                        .first()
                        .should('be.visible')
                        .invoke('text')
                        .then((newLanguage) => {
                            const newLanguageSelected = newLanguage;
                            cy.wrap(newLanguageSelected).as('newLanguage');
                        });

                    //Clicking the Save button
                    cy.get(basicInfoPageElem.buttonBasicInformation)
                        .filter(`:contains("${basicInfoPageElem.saveButtonStr}")`)
                        .then((saveButton) => {
                            cy.wrap(saveButton).should('be.visible');
                            cy.wrap(saveButton).click();
                            cy.wrap(saveButton).should('not.exist');
                        });

                    //Validates that the new language has been saved
                    cy.get('@newLanguage').then((newLanguageSelected) => {
                        cy.get(basicInfoPageElem.languageSection)
                            .children()
                            .children()
                            .eq(1)
                            .children()
                            .first()
                            .should('have.text', newLanguageSelected);
                    });
                }
            });
    });
});
