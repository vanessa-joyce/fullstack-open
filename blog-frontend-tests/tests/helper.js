const loginWith = async (page, username, password)  => {
  await page.getByTestId('login').click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click();
  await page.getByTestId('title').fill(title);
  await page.getByTestId('author').fill(author);
  await page.getByTestId('url').fill(url);
  await page.getByTestId('submit-blog').click();
  await page.getByText(title).first().waitFor()
}

export { loginWith, createBlog }