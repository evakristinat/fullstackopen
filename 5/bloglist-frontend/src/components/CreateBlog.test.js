import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from './CreateBlog'

describe('<CreateBlog/>', () => {
  test('the correct data is given to addNew on submit', () => {
    const addNew = jest.fn()
    const component = render(<CreateBlog addNew={addNew} />)

    const form = component.container.querySelector('form')

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'Testing Vol. 1' },
    })
    fireEvent.change(author, {
      target: { value: 'The Tester' },
    })
    fireEvent.change(url, {
      target: {
        value: 'https://fullstackopen.com/osa5/react_sovellusten_testaaminen',
      },
    })

    fireEvent.submit(form)
    expect(addNew.mock.calls).toHaveLength(1)
    expect(addNew.mock.calls[0][0].title).toBe('Testing Vol. 1')
    expect(addNew.mock.calls[0][0].author).toBe('The Tester')
    expect(addNew.mock.calls[0][0].url).toBe(
      'https://fullstackopen.com/osa5/react_sovellusten_testaaminen'
    )
  })
})
