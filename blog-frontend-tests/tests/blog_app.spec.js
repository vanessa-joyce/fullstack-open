const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Vanessa Sutter',
        username: 'vsutter',
        password: '1234'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const username = await page.locator('input[name="Username"]')
    const password = await page.locator('input[name="Password"]')
    const button = await page.getByRole('button', { name: 'Login' })
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
    await expect(button).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'vsutter', '1234')
      await expect(page.getByText('Vanessa Sutter logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'vsutter', '12345')
      await expect(page.getByText('Vanessa Sutter logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'vsutter', '1234')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'My new blog', 'Vanessa', 'https://www.vanessa.com')
      await expect(page.getByText('a new blog My new blog by Vanessa added')).toBeVisible()
    })

    describe('When a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'My second blog', 'Vanessa', 'https://www.vanessa2.com')
      })
      test('a blog can be liked', async ({page}) => {
        await page.getByRole('button', { name: 'show' }).click();
        const likeSpan = page.getByTestId('likes')
        const initialLikes = await likeSpan.textContent()
        const initialLikeCount = parseInt(initialLikes);
        await page.getByRole('button', { name: 'like' }).click();
        await expect(likeSpan).toHaveText((initialLikeCount + 1).toString());
      })
    })
  })
})