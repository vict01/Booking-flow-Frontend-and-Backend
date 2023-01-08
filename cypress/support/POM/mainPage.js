
export function cookiesDialogBox() {
    return cy.get('.osano-cm-accept-all')
}

export function getAverageRevenue(revenue) {
    return cy.get(`[for="average-gross-${revenue}"`)
}

export function companyNameInput() {
    return cy.get('[name=company]')
}

export function getPersonalData() {
    const salutation = cy.get('[name=salutation]')
    const firstName = cy.get('[name=name]')
    const lasttName = cy.get('[name=surname]')
    return { salutation, firstName, lasttName }
}

export function addressInput() {
    return cy.get('.location-search-input')
}

export function VATidInput() {
    return cy.get('[name=vatNo]')
}

export function getContactInfo() {
    const eMail = cy.get('[name=email]')
    const telephone = cy.get('[name=tel]')
    return { eMail, telephone }
}

export function completeBookingButton() {
    return cy.get('._primary_g86ey_12')
}
