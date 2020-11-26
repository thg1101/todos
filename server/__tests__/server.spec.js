const constants = require('../constants')
const Controller = require('../controller')

const listenSpy = jest.fn().mockImplementationOnce((port, cb) => cb())
const useSpy = jest.fn()
const getSpy = jest.fn()
const putSpy = jest.fn()
const textSpy = jest.fn().mockReturnValue('plaintext')
const logSpy = jest.spyOn(console, 'log')

jest.doMock('express', () => {
  const mockExpress = () => ({
    listen: listenSpy,
    use: useSpy,
    get: getSpy,
    put: putSpy
  })
  mockExpress.text = textSpy
  return mockExpress
})

describe('should test server configuration', () => {
  beforeAll(() => {
    require('../server.js')
  })

  it('should use CORS config', () => {
    expect(useSpy).toHaveBeenNthCalledWith(1, constants.corsConfig)
  })

  it('should use plaintext middleware', () => {
    expect(useSpy).toHaveBeenNthCalledWith(2, 'plaintext')
  })

  it('should test get POSTS', () => {
    expect(getSpy).toHaveBeenCalledWith('/', Controller.getTodos)
  })

  it('should test get POST', () => {
    expect(putSpy).toHaveBeenCalledWith('/', Controller.putTodos)
  })

  it('should call listen fn', () => {
    expect(listenSpy).toHaveBeenCalledWith(constants.port, expect.anything())
    expect(logSpy).toBeCalledWith(`A simple server listening at http://localhost:${constants.port}`)
  })
})
