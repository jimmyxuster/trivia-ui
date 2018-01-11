/* eslint-disable */
export default {
  logout: jest.fn(
    () => new Promise((resolve => {
      resolve({
        status: 200,
        body: {}
      })
    }))
  )
}
