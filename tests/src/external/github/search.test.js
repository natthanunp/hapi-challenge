'use strict'

const sinon = require('sinon')
const { assert } = require('chai')
const proxyquire = require('proxyquire').noCallThru()

describe('external - github - search', () => {
  const fake_axios_request = sinon.stub()
  const fake_axios = sinon.stub().returns(fake_axios_request)
  const api_under_test = proxyquire('../../../../src/external/github/search', {
    '../../lib/request/github': fake_axios,
  })

  afterEach(() => {
    fake_axios.resetHistory()
    fake_axios_request.resetBehavior()
    fake_axios_request.resetHistory()
    fake_axios_request.resetBehavior()
    sinon.restore()
  })

  describe('Get Repositories', () => {
    it('Should run properly', async () => {
      fake_axios_request.request = sinon
        .stub()
        .resolves({ data: { key: 'value' } })
      const expected_request_options = {
        method: 'get',
        url: '/search/repositories?q=query&page=page&per_page=limit',
        responseType: 'json',
      }

      const result = await api_under_test.get_repository(
        'query',
        'page',
        'limit'
      )

      assert.deepEqual(result, { key: 'value' })
      sinon.assert.calledOnceWithExactly(
        fake_axios_request.request,
        expected_request_options
      )
    })

    it('Should throw when there is an error', async () => {
      const fake_error = new Error('github-error')
      let error_caught = false
      fake_axios_request.request = sinon.stub().rejects(fake_error)
      const expected_request_options = {
        method: 'get',
        url: '/search/repositories?q=query&page=page&per_page=limit',
        responseType: 'json',
      }

      try {
        await api_under_test.get_repository('query', 'page', 'limit')
      } catch (e) {
        assert.deepEqual(e, fake_error)
        sinon.assert.calledOnceWithExactly(
          fake_axios_request.request,
          expected_request_options
        )
        error_caught = true
      }

      assert(error_caught, 'Should throw error')
    })
  })
})
