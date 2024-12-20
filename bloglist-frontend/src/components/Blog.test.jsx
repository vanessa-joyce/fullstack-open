import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author', () => {
  const blog = {
    title: "Neues Leben 2.0",
    author: "Vanessa Joyce",
    url: "https://www.google.ch",
    likes: 6,
    createdBy: {
      username: "vsutter",
      name: "Vanessa Sutter",
      id: "6754b4b9309f32ddf3496153"
    },
    id: "67605aef48f43ca52c26b584"
  }

  const addLike = vi.fn()
  const removeBlog = vi.fn()
   //const showDetailsButton = Container.querySelector('.show-details')
  //const hideDetailsButton = Container.querySelector('.hide-details')


  render(<Blog blog={blog} addLike={addLike} removeBlog={removeBlog} />)

  const element = screen.findByText('Neues Leben 2.0 - Vanessa Joyce')
  expect(element).toBeDefined()
  const url = screen.queryByText('https://www.google.ch')
  expect(url).toBeNull()
  const likes = screen.queryByText('likes')
  expect(likes).toBeNull()
})