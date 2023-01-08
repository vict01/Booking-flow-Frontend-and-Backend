/// <reference types="Cypress" />
import { appData, companyData, personalData } from "../fixtures/fixtures.json"

describe('Business Critical UI Scenario', () => {
    const expectedUrl = appData.urlUI
    var companyName = companyData.companyName
    var averageRevenue = companyData.averageRevenue
    var address = companyData.address
    var VATid = companyData.vatId
    var eMail = companyData.eMail
    var telephone = companyData.telephone
    var vatIdRequest = "vatIdRequest"

    before(() => {
        cy.visit('/')
        cy.acceptCookiesDialogBox()
        cy.assertCookies()
        cy.url('match', expectedUrl)
        cy.assertUserIsInPage1()
    })

    it('UI Happy Path | Do a basic booking', () => {
        cy.selectAverageRevenue(averageRevenue)
        cy.chooseStarterPackage()
        cy.chooseOSSExportAddOn()
        cy.clickOnNextButtonPage1()
        cy.assertUserWasTakenToPage2()

        cy.typeCompanyName(companyName)
        cy.completePersonalData(personalData.salutationMr, personalData.firstName, personalData.lasttName)
        cy.typeAddress(address)
        cy.typeVATid(VATid)
        cy.intercepApiRequest(appData.urlVATid, vatIdRequest)
        cy.completeContactInfo(eMail, telephone)
        cy.assertApiRequest(vatIdRequest, 200)
        cy.clickOnNextButtonPage2()
        cy.assertUserWasTakenToPage3()

        cy.acceptTermsAndConditions()
        cy.clickOnCompleteBookingButton()
        cy.assertBookingComplet()
    });

})