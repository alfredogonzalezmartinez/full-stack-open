import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import Blog from '../Blog'

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: {
    username: 'mluukkai',
    name: 'Matti Luukkain',
  },
}

describe('Component Blog', () => {
  test('renders only title and author in the beginning', () => {
    const component = render(
      <Blog blog={blog} />
    )

    const heading = component.queryByText(`${blog.title} by ${blog.author}`)
    const url = component.queryByText(blog.url)
    const likes = component.queryByText(`likes ${blog.likes}`)

    expect(heading).not.toBeNull()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('renders url and likes when view button is clicked', () => {
    const component = render(
      <Blog blog={blog} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const url = component.queryByText(blog.url)
    const likes = component.queryByText(`likes ${blog.likes}`)

    expect(url).not.toBeNull()
    expect(likes).not.toBeNull()
  })

  test('calls blog likes handler twice when like button is clicked twice', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} handleBlogLikes={mockHandler}/>
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
