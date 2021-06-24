'use strict'

const sinon = require('sinon')
const { assert } = require('chai')
const proxyquire = require('proxyquire').noCallThru()

describe('lib - request - github', () => {
  let methods, fake_axios, fake_axios_defaults

  beforeEach(() => {
    fake_axios_defaults = {
      defaults: {
        baseURL: undefined,
      },
    }
    fake_axios = {
      create: sinon.stub().returns(fake_axios_defaults),
    }

    methods = proxyquire('../../../../src/lib/request/github', {
      'axios': fake_axios,
    })
  })

  afterEach(() => {
    fake_axios.create.resetHistory()
    fake_axios.create.resetBehavior()
    sinon.restore()
  })

  it('should setup request correctly', async () => {
    sinon.assert.calledOnceWithExactly(fake_axios.create, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })

  it('should return request correctly', async () => {
    let instance = methods()

    assert.deepEqual(instance.defaults.baseURL, 'https://api.github.com/')
  })
})
