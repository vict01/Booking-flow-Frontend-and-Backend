import { appData} from "../fixtures/fixtures.json"
const urlApi = appData.urlApi

Cypress.Commands.add('createUser', (name, email, gender, status) => {
    cy
        .request({           
                url: `${urlApi}v2/users`,
                qs: {},
                method: 'POST',
                body: 
                    { "name": name,
                      "email": email,   
                      "gender": gender,                       
                      "status": status 
                    }
                ,
                headers: {
                    authorization: "Bearer 74493171aac0458cb0ade8ed08298594ed89634325ba5a2eb6eb5ae282d6dac5",
                    'content-type': "application/json"
                },
                failOnStatusCode: false                           
        })        
})

Cypress.Commands.add('getUserById',(userId)=>{
    cy.request({
        url: `https://gorest.co.in/public/v2/users/${userId}`,
        headers: {
            authorization: "Bearer 74493171aac0458cb0ade8ed08298594ed89634325ba5a2eb6eb5ae282d6dac5",
            'content-type': "application/json"
        },
        failOnStatusCode: false                           
    })    
})

Cypress.Commands.add('updateUser', (id, name, email, status) => {
    cy
        .request({           
                url: `${urlApi}v2/users/${id}`,
                qs: {},
                method: 'PUT',
                body: 
                    { "name": name,
                      "email": email,                      
                      "status": status 
                    }
                ,
                headers: {
                    authorization: "Bearer 74493171aac0458cb0ade8ed08298594ed89634325ba5a2eb6eb5ae282d6dac5",
                    'content-type': "application/json"
                },
                failOnStatusCode: false                           
        })        
})


Cypress.Commands.add('deleteUser', (id) => {
    cy
        .request({           
                url: `${urlApi}v2/users/${id}`,
                qs: {},
                method: 'DELETE',
                body: {},
                headers: {
                    authorization: "Bearer 74493171aac0458cb0ade8ed08298594ed89634325ba5a2eb6eb5ae282d6dac5",
                    'content-type': "application/json"
                },
                failOnStatusCode: false                           
        })        
})