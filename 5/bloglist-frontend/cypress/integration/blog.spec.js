describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'evakristinat',
      name: 'Eeva',
      password: 'verysecret',
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login to add blogs')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('evakristinat')
      cy.get('#password').type('verysecret')
      cy.get('form').submit()
      cy.wait(500)

      cy.contains('Logged in as Eeva')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('eva')
      cy.get('#password').type('very')
      cy.get('form').submit()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'background-color', 'rgb(233, 56, 56)')

      cy.get('html').should('not.contain', 'Logged in as Eeva')
    })
  })
})
