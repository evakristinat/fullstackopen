import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

/* Oikea komento Windowsille (powershell) kun testit ajetaan ilman watch-modea:
($env:CI = "true") -and (npm test) */

describe('<Blog/>', () => {
  let component
  const blog = {
    title: 'Testing is complicated',
    author: 'Eeva',
    url: 'https://fullstackopen.com/osa5/react_sovellusten_testaaminen',
    likes: 0,
    user: {
      username: 'eva',
      name: 'Eeva',
    },
  }
  const user = {
    username: 'eva',
  }

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} />)
  })

  test('renders correct initial content', () => {
    expect(component.container).toHaveTextContent(
      'Testing is complicated, Eeva'
    )

    expect(component.container).not.toHaveTextContent(
      'https://fullstackopen.com/osa5/react_sovellusten_testaaminen'
    )
    expect(component.container).not.toHaveTextContent('0 likes')
  })

  test('renders all content after plus is clicked', () => {
    expect(component.container).toHaveTextContent(
      'Testing is complicated, Eeva'
    )

    const plus = component.getByText('+')
    fireEvent.click(plus)

    expect(component.container).toHaveTextContent(
      'https://fullstackopen.com/osa5/react_sovellusten_testaaminen'
    )
    expect(component.container).toHaveTextContent('0 likes')

  })
})
