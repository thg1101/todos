const fs = require('fs')

jest.mock('fs')

describe('should test controller methods', () => {
  let controller
  const mockRes = {
    send: jest.fn(),
    sendStatus: jest.fn()
  }
  const mockError = 'mock error'

  fs.readFile
    .mockImplementationOnce((fileName, cb) => cb(null, '[]'))
    .mockImplementationOnce((fileName, cb) => cb(mockError, ''))
  fs.writeFile
    .mockImplementationOnce((fileName, payload, cb) => cb(null))
    .mockImplementationOnce((fileName, payload, cb) => cb(mockError))

  beforeAll(() => {
    controller = require('../controller.js')
  })

  beforeEach(() => {
    mockRes.send.mockReset()
  })

  it('should read the store file', () => {
    controller.getTodos(null, mockRes)
    expect(fs.readFile).toHaveBeenCalled()
    expect(mockRes.send).toHaveBeenCalledWith('[]')

    // second call should fail
    try {
      controller.getTodos(null, mockRes)
    } catch (e) {
      expect(e).toBe(mockError)
    }
  })

  it('should write the store file', () => {
    controller.putTodos({ body: 'mockpayload' }, mockRes)
    expect(fs.writeFile).toHaveBeenCalled()
    expect(mockRes.sendStatus).toHaveBeenCalledWith(200)

    // second call should fail
    try {
      controller.putTodos({ body: 'mockpayload' }, mockRes)
    } catch (e) {
      expect(e).toBe(mockError)
    }
  })
})
