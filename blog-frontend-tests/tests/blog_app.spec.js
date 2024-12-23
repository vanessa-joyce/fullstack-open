const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.locator('input[name="Username"]').fill('vsutter')
      await page.locator('input[name="Password"]').fill('1234')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('Vanessa Sutter logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('vsutter')
      await page.locator('input[name="Password"]').fill('12345')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('Vanessa Sutter logged-in')).not.toBeVisible()
    })
  })
})