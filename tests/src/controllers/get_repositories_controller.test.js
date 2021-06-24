'use strict'

const sinon = require('sinon')
const proxyquire = require('proxyquire').noCallThru()

describe('get_repositories_controller', () => {
  const fake_search_provider = sinon.stub()

  const controller_under_test = proxyquire(
    '../../../src/controllers/get_repositories_controller',
    {
      '../adapters/external/github/search_provider': fake_search_provider,
    }
  )

  afterEach(() => {
    fake_search_provider.resetHistory()
    fake_search_provider.resetBehavior()
    sinon.restore()
  })

  describe('get_repository_controller', () => {
    it('Should run properly', async () => {
      fake_search_provider.get_repositories = sinon.stub().resolves()

      await controller_under_test('keyword', 'page')

      sinon.assert.calledOnceWithExactly(fake_search_provider.get_repositories, 'keyword', 'page')
    })
  })
})
