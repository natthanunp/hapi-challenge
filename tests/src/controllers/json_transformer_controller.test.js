'use strict'

const sinon = require('sinon')
const proxyquire = require('proxyquire').noCallThru()

describe('json_transformer_controller', () => {
  const fake_transformer_service = sinon.stub()

  const controller_under_test = proxyquire(
    '../../../src/controllers/json_transformer_controller',
    {
      '../services/transformer_service': fake_transformer_service,
    }
  )

  afterEach(() => {
    fake_transformer_service.resetHistory()
    fake_transformer_service.resetBehavior()
    sinon.restore()
  })

  describe('json_transformer_controller', () => {
    it('Should run properly', async () => {
      fake_transformer_service.transform = sinon.stub().resolves()

      await controller_under_test('json_input')

      sinon.assert.calledOnceWithExactly(
        fake_transformer_service.transform,
        'json_input'
      )
    })
  })
})
