import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import BlogForm from '../BlogForm'

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
}

describe('Component BlogForm', () => {
  test('calls new blog creation handler with right values', () => {
    const mockHandler = jest.fn()

    const component = render(
      <BlogForm handleNewBlogCreation={mockHandler} />
    )

    const titleInput = component.container.querySelector('#title')
    fireEvent.change(titleInput,{ target: { value: blog.title } })

    const authorInput = component.container.querySelector('#author')
    fireEvent.change(authorInput,{ target: { value: blog.author } })

    const urlInput = component.container.querySelector('#url')
    fireEvent.change(urlInput,{ target: { value: blog.url } })

    const createButton = component.getByText('create')
    fireEvent.click(createButton)

    expect(mockHandler.mock.calls).toHaveLength(1)

    expect(mockHandler).toBeCalledWith(
      expect.objectContaining({
        title: expect.stringMatching(blog.title),
        author: expect.stringMatching(blog.author),
        url: expect.stringMatching(blog.url),
      })
    )
  })
})
