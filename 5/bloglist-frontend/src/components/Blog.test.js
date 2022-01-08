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

  test('renders correct initial content', () => {
    component = render(<Blog blog={blog} user={user} />)
    expect(component.container).toHaveTextContent(
      'Testing is complicated, Eeva'
    )

    expect(component.container).not.toHaveTextContent(
      'https://fullstackopen.com/osa5/react_sovellusten_testaaminen'
    )
    expect(component.container).not.toHaveTextContent('0 likes')
  })

  test('renders all content after plus is clicked', () => {
    component = render(<Blog blog={blog} user={user} />)
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

  test('calls updateLikes twice when plus/minus is clicked twice', () => {
    //funktiokutsujen tutkimiseen tarkoitettu feikki funktio
    const updateLikes = jest.fn()

    component = render(<Blog blog={blog} user={user} updateLikes={updateLikes} />)

    const plus = component.getByText('+')
    fireEvent.click(plus)

    const like = component.container.querySelector('#like')
    fireEvent.click(like)
    fireEvent.click(like)

    //tarkistaa että updateLikes-funktiota kutsutaan kahdesti
    expect(updateLikes.mock.calls).toHaveLength(2)
  })
})
