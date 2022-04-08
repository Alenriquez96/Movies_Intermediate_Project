describe('Login form test with incorrect parms', () => {
    it('Login scenario', () => {
        cy.visit('https://desolate-wildwood-99118.herokuapp.com/')
        cy.get('#login-home').click()
        cy.url().should('include', 'login')
        cy.url().should('eq', "https://desolate-wildwood-99118.herokuapp.com/login")
        cy.get('[type="text"]').type("testuser@gmail.com")
        cy.get('[type="password"]').type("aslkjf32--gre23")
        cy.get('form').submit()
        cy.get('body').should('have.text', 'Email or password incorrect')
    })
})