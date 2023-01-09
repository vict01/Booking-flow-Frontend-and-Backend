import { appData, HTTP_Method as method } from "../fixtures/fixtures.json"
const urlApi = appData.urlApi

Cypress.Commands.add('createUser', (name, email, gender, status) => {
    cy
        .request({
            url: `${urlApi}`,
            qs: {},
            method: method.POST,
            body:
            {
                "name": name,
                "email": email,
                "gender": gender,
                "status": status
            }
            ,
            headers: {
                authorization: appData.apiToken,
                contentType: appData.contentTypeAppJSON
                
            },
            failOnStatusCode: false
        })
})

Cypress.Commands.add('getUserById', (userId) => {
    cy.request({
        url: `${urlApi}/${userId}`,
        headers: {
            authorization: appData.apiToken,
            contentType: appData.contentTypeAppJSON
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('updateUser', (id, name, email, status) => {
    cy
        .request({
            url: `${urlApi}/${id}`,
            qs: {},
            method: method.PUT,
            body:
            {
                "name": name,
                "email": email,
                "status": status
            }
            ,
            headers: {
                authorization: appData.apiToken,
                contentType: appData.contentTypeAppJSON
            },
            failOnStatusCode: false
        })
})

Cypress.Commands.add('deleteUser', (id) => {
    cy
        .request({
            url: `${urlApi}/${id}`,
            qs: {},
            method: method.DELETE,
            body: {},
            headers: {
                authorization: appData.apiToken,
                contentType: appData.contentTypeAppJSON
            },
            failOnStatusCode: false
        })
})