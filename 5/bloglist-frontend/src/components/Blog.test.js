import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

/* Oikea komento Windowsille (powershell) kun testit ajetaan ilman watch-modea:
($env:CI = "true") -and (npm test) */

test('renders correct initial content', () => {
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

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('Testing is complicated, Eeva')

  expect(component.container).not.toHaveTextContent(
    'https://fullstackopen.com/osa5/react_sovellusten_testaaminen'
  )
  expect(component.container).not.toHaveTextContent(
    '0 likes'
  )
})
