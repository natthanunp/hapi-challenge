'use strict'

const sinon = require('sinon')
const { assert } = require('chai')
const proxyquire = require('proxyquire').noCallThru()

describe('Search Provider', () => {
  const fake_search_api = sinon.stub()
  const fake_config = {
    config: {
      PAGINATE_LIMIT_PER_PAGE: 'paginate_limit_per_page',
    },
  }
  const provider = proxyquire(
    '../../../../../src/adapters/external/github/search_provider',
    {
      '../../../external/github/search': fake_search_api,
      '../../../config': fake_config,
    }
  )

  afterEach(() => {
    fake_search_api.resetHistory()
    fake_search_api.resetBehavior()
    sinon.restore()
  })

  describe('Get repositories', () => {
    it('Should return repositories from api', async () => {
      fake_search_api.get_repository = sinon.stub().resolves({ key: 'value' })

      const result = await provider.get_repositories('query', 'page')

      assert.deepEqual(result, { key: 'value' })
      sinon.assert.calledOnceWithExactly(
        fake_search_api.get_repository,
        'query',
        'page',
        'paginate_limit_per_page'
      )
    })
  })
})
