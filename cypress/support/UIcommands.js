/// <reference types="cypress" />
import {cookiesDialogBox, getAverageRevenue, companyNameInput, getPersonalData,
         addressInput, VATidInput, getContactInfo, completeBookingButton}
from "../support/POM/mainPage"
 
Cypress.Commands.add('intercepApiRequest', (url, alias) => {
    cy.intercept(url).as(alias)
})

Cypress.Commands.add('assertApiRequest', (alias, expectedStatusCode) => {
    cy.wait(`@${alias}`).then(interception => {
        expect(interception.response.statusCode).eq(expectedStatusCode)
    })
})

Cypress.Commands.add('acceptCookiesDialogBox', () => {
    cookiesDialogBox().click();
})

Cypress.Commands.add('assertCookies', () => {
   cy.getCookies()
     .should('have.length.least', 1)
        .then((cookies) => {
             expect(cookies[0]).to.exist  
     })
})

Cypress.Commands.add('assertUserIsInPage1', () => {
    cy.findByText(/Select Your Average Revenue/i).should('be.visible')
})

Cypress.Commands.add('selectAverageRevenue',(revenue)=>{
    getAverageRevenue(revenue).click();
})


Cypress.Commands.add('chooseStarterPackage',()=>{
    cy.get('.\_package__button_5qgvw_271:nth-child(3)').click()
})

Cypress.Commands.add('chooseOSSExportAddOn',()=>{
    cy.get('._addons_5qgvw_381 > :nth-child(2) > :nth-child(1)').click()
})

Cypress.Commands.add('clickOnNextButtonPage1',()=>{
    cy.get('._actions_izazj_71 ._button_g86ey_1 .notranslate').click()
})

Cypress.Commands.add('assertUserWasTakenToPage2', () => {
    cy.findByText(/Please enter your personal data/i).should('be.visible')
})

Cypress.Commands.add('typeCompanyName',(companyName)=>{
    companyNameInput().type(companyName)
})

Cypress.Commands.add('completePersonalData',(salutation, firstName, lasttName)=>{
    getPersonalData().salutation.select(salutation)
    getPersonalData().firstName.type(firstName)
    getPersonalData().lasttName.type(lasttName)
})

Cypress.Commands.add('typeAddress',(address)=>{
    addressInput().type(address)
    cy.get('.suggestion-item > span').click()
})

Cypress.Commands.add('typeVATid',(VAT)=>{
    VATidInput().type(VAT)
})

Cypress.Commands.add('completeContactInfo',(eMail, telephone)=>{
    getContactInfo().eMail.type(eMail)
    getContactInfo().telephone.type(telephone)
})

Cypress.Commands.add('clickOnNextButtonPage2',()=>{
    cy.get('.\_action_g86ey_69 > .notranslate').click()
})

Cypress.Commands.add('assertUserWasTakenToPage3', () => {    
    cy.findAllByText(/Please confirm your information is correct/i).should('be.visible')
})

Cypress.Commands.add('acceptTermsAndConditions', () => {
    cy.get('#accept').click()
})

Cypress.Commands.add('clickOnCompleteBookingButton', () => {
    completeBookingButton().click({force:true})
})

Cypress.Commands.add('assertBookingComplet', () => {
    cy.findAllByText(/Booking successful/i).should('be.visible')
})
