import { describe, it, expect } from 'vitest';
import nock from 'nock';
import { getLocalCity } from "../src/services/ipService.js";

describe('ipService', () => {
  it('return a city data of location', async() => {
    const mock = {
      city: 'Essen'
    };

    nock('http://ip-api.com')
      .get('/json')
      .query(true)
      .reply(200, mock);

    const result = await getLocalCity();
    expect(result).toBeDefined();
  })
})
