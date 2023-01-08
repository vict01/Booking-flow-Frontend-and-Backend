/// <reference types="Cypress" />
import { personalData } from "../fixtures/fixtures.json"

describe('Business Critical API Scenario', () => {
    var userId
    var name = personalData.userTest
    var email = personalData.userTest + new Date().getTime() + '@test.com'
    var gender = personalData.genderMale
    var status = personalData.statusActive

    it('API test | Create user and consult it thereafter', () => {
        cy.createUser(name, email, gender, status)
            .then((resp) => {
                expect(resp.status).to.eq(201)
                userId = resp.body.id
                cy.task('log', `The created user has the id: ${userId}`)
                expect(resp.body).to.contain.property('id');
                expect(resp.body).to.contain.property('name');
                expect(resp.body).to.contain.property('email');
                expect(resp.body).to.contain.property('gender');
                expect(resp.body).to.contain.property('status');

                cy.getUserById(userId).then((resp) => {
                    expect(resp.status).to.eq(200)
                    cy.task('log', `\nThe info about the user obtained is:\n ${JSON.stringify(resp.body)} \n`)
                    expect(resp.body.id).to.eq(userId)
                })
            })
    });

    it('API test | Consult users and update the first one thereafter', () => {
        name = "updatedName"
        email = name + new Date().getTime() + '@updated.test'
        status = personalData.statusActive

        cy.getUserById("").then((resp) => {
            expect(resp.status).to.eq(200)
            userId = resp.body[0].id
            gender = resp.body[0].gender
            cy.task('log', `\nThis user will be updated:\n ${JSON.stringify(resp.body[0])}`)

            cy.updateUser(userId, name, email, status).then((resp) => {
                expect(resp.status).to.eq(200)
                cy.task('log', `\nNow the info about the user updated is:\n ${JSON.stringify(resp.body)} \n`)
                // This should remain the same:
                expect(resp.body.gender).to.eq(gender);
                // These should change accordingly the method:
                expect(resp.body.name).to.eq(name);
                expect(resp.body.email).to.eq(email);
                expect(resp.body.status).to.eq(status);
            })
        })
    });

    it('API test | Consult users and delete the first one thereafter', () => {
        cy.getUserById("").then((resp) => {
            expect(resp.status).to.eq(200)
            userId = resp.body[0].id

            cy.task('log', `\nThis user will be deleted:\n ${JSON.stringify(resp.body[0])}`)

            cy.deleteUser(userId).then((resp) => {
                expect(resp.status).to.eq(204)
                expect(resp.body).to.eq(undefined)

                cy.getUserById(userId).then((resp) => {
                    expect(resp.status).to.eq(404)
                    cy.task('log', `\nResult trying to consult the deleted user:\n ${JSON.stringify(resp.body)} \n`)
                    expect(resp.body.message).to.eq("Resource not found")
                })
            })
        })
    });

})