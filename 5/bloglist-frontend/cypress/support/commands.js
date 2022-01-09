Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3000/api/blogs',
    method: 'POST',
    body: {
      title: title,
      author: author,
      url: url,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
  })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3000/api/login', {
    username: username,
    password: password,
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})
