describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'evakristinat',
      name: 'Eeva',
      password: 'verysecret',
    }

    const user1 = {
      username: 'late',
      name: 'Lauri',
      password: 'nopassword',
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user1)

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

    it('Login fails with wrong credentials', function () {
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
      cy.createBlog({
        title: 'Testing',
        author: 'Test Author',
        url: 'https://docs.cypress.io/guides/overview/why-cypress',
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
      cy.createBlog({
        title: 'Now This',
        author: 'The Author',
        url: 'https://docs.cypress.io',
      })
      /*tykkäys on mahdollista jo ennen lisätietojen avausta,
      joten oikea blogi on haettava aina ennen sen painamista*/
      cy.contains('Now This').parent().find('#showmore').click()
      cy.contains('Now This').parent().find('#like').click()
      cy.get('#likeinfo').should('contain', '1 like')
      cy.contains('Now This').parent().find('#like').click()
      cy.get('#likeinfo').should('contain', '0 likes')
    })

    it('A blog can be deleted by creator', function () {
      cy.contains('Testing').parent().find('#showmore').click()
      /*tässä ei ole pakollista enää hakea ensin 'Testing', koska vain se on avattu
      ja näin ollen vain se sisältää poistonapin*/
      cy.get('html').should('contain', 'delete blog')
      cy.get('.deletebutton').click()
      cy.get('html').should('not.contain', 'Testing')
    })

    it('A blog cannot be deleted by other users', function () {
      cy.login({ username: 'late', password: 'nopassword' })
      cy.contains('Testing').parent().find('#showmore').click()
      cy.get('html').should('not.contain', 'delete blog')
    })

    /*Testissä on kolme blogia. Viimeisenä luodusta, eli listan viimeisestä, tykätään
    kahdesti ja odotetaan sen sivun päivityksen jälkeen olevan listan ensimmäinen.*/
    it.only('Blogs are shown in order of likes', function () {
      cy.createBlog({
        title: 'Now This',
        author: 'The Author',
        url: 'https://docs.cypress.io',
      })
      cy.createBlog({
        title: 'Hello',
        author: 'World',
        url: 'https://fullstackopen.com/osa5/end_to_end_testaus',
      })
      cy.get('.bloghead').last().should('contain', 'Hello, World')
      cy.contains('Now This').parent().find('#like').click()
      cy.contains('Hello').parent().find('#like').click()
      /*Sivu päivitetään, jotta lisää tykkäyksiä voidaan antaa, koska kahdesti
      tykkääminen muuten poistaa tykkäyksen*/
      cy.visit('http://localhost:3000')
      cy.contains('Hello').parent().find('#like').click()
      //blogit sortataan kun sivu ladataan uudestaan
      cy.visit('http://localhost:3000')
      //avataan kaikki lisätiedot tykkäyksien tarkastelua varten
      cy.get('.bloghead').parent().find('#showmore').as('plus')
      cy.get('@plus').click({ multiple: true })

      cy.get('.bloghead').first().should('contain', 'Hello, World')
    })
  })
})
