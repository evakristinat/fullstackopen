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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3000/api/login', {
        username: 'evakristinat',
        password: 'verysecret',
      }).then((response) => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.contains('add new blog').click()
      cy.get('#title').type('This is a test')
      cy.get('#author').type('The Tester')
      cy.get('#url').type('https://fullstackopen.com/osa5/end_to_end_testaus')
      cy.get('form').submit()
      cy.get('.success').should('contain', 'This is a test')
      cy.get('.bloghead').should('contain', 'This is a test, The Tester')
    })

    it('Created blog can be liked and unliked', function () {
      cy.request({
        url: 'http://localhost:3000/api/blogs',
        method: 'POST',
        body: {
          title: 'Testing, Testing',
          author: 'Test Author',
          url: 'https://docs.cypress.io/guides/overview/why-cypress',
        },
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem('loggedUser')).token
          }`,
        },
      })
      cy.visit('http://localhost:3000')
      cy.get('#showmore').click()
      cy.get('#likeinfo').should('contain', '0 likes')
      cy.get('#like').click()
      cy.get('#likeinfo').should('contain', '1 like')
      cy.get('#like').click()
      cy.get('#likeinfo').should('contain', '0 likes')
    })
  })
})
