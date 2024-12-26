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
    await page.pause()
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
        await createBlog(page, 'My second blog', 'Vanessa', 'https://www.vanessa.com')
        await expect(page.getByText('a new blog My second blog by Vanessa added')).toBeVisible()
      })
      test('a blog can be liked', async ({page}) => {
        await page.getByRole('button', { name: 'show' }).click();
        const likeSpan = page.getByTestId('likes')
        const initialLikes = await likeSpan.textContent()
        const initialLikeCount = parseInt(initialLikes);
        await page.getByRole('button', { name: 'like' }).click();
        await expect(likeSpan).toHaveText((initialLikeCount + 1).toString());
      })

      test('a blog can be deleted by the creator', async ({page}) => {
        await page.once('dialog', async (dialog) => {
          // Sicherstellen, dass es der erwartete Dialog ist:
          expect(dialog.type()).toBe('confirm')
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'show' }).click();
        await page.getByRole('button', { name: 'remove' }).click();
        await expect(page.getByText('Removed blog My second blog by Vanessa')).toBeVisible()
        //await page.getByRole('button').click();
      })

      test('the delete button is shown to the creator', async ({page}) => {
        await page.getByRole('button', { name: 'show' }).click();
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
      })

      describe('When a different user logged in', () => {
        beforeEach(async ({ page, request }) => {
          await request.post('/api/users', {
            data: {
              name: 'Max Mustermann',
              username: 'mmustermann',
              password: '5678'
            }
          });
        })
        test('the delete button is not shown', async ({page}) => {
          await page.getByRole('button', { name: 'logout' }).click();
          await loginWith(page, 'mmustermann', '5678')

          await page.getByRole('button', { name: 'show' }).click();
          await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
      })
    })
  })

})