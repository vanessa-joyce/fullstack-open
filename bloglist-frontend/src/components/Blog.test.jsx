import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Display blog', () => {
  let container
  const mockHandlers = {
    addLike: null,
    removeBlog: null
  }

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


  beforeEach(() => {
    mockHandlers.addLike = vi.fn()
    mockHandlers.removeBlog = vi.fn()
    container = render(
      <Blog blog={blog} addLike={mockHandlers.addLike} removeBlog={mockHandlers.removeBlog} />
    ).container
  })


  test('without details', () => {
    const element = screen.findByText('Neues Leben 2.0 - Vanessa Joyce')
    expect(element).toBeDefined()
    const url = screen.queryByText('https://www.google.ch')
    expect(url).toBeNull()
    const likes = screen.queryByText('likes')
    expect(likes).toBeNull()
  })

  test('with details after the details button was clicked', async () => {
    const user = userEvent.setup()
    const showDetailsButton = container.querySelector('.show-details-btn')

    await user.click(showDetailsButton)

    const url = screen.findByText('https://www.google.ch')
    expect(url).toBeDefined()
    const likes = screen.findByText('6 likes')
    expect(likes).toBeDefined()
  })

  test('with a working like button',async () => {
    const user = userEvent.setup()
    const showDetailsButton = container.querySelector('.show-details-btn')
    await user.click(showDetailsButton)

    const likeButton = container.querySelector('.like-btn')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandlers.addLike.mock.calls).toHaveLength(2)
  })
})