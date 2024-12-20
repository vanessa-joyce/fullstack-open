import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect } from 'chai'

test('Blog form calls the event handler with the right details', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()
  render(<BlogForm createBlog={createBlog}/>)

  const author = screen.getByTestId('author')
  const title = screen.getByTestId('title')
  const url = screen.getByTestId('url')
  const submitButton = await screen.findByTestId('submit')

  await user.type(author, 'Joyce')
  await user.type(title, 'The new blog')
  await user.type(url, 'https://www.newblog.com')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('Joyce')
  expect(createBlog.mock.calls[0][0].title).toBe('The new blog')
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.newblog.com')
})