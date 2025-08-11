import tmdbAPI, { IMAGE_BASE_URL } from '../tmdbAPI';
import MockAdapter from 'axios-mock-adapter';

/** @description Mock the tmdbAPI to control the behavior of the API calls in tests */
const mockAxios = new MockAdapter(tmdbAPI);

describe('tmdbAPI', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should have correct base URL', () => {
    expect(tmdbAPI.defaults.baseURL).toBe('https://api.themoviedb.org/3');
  });

  it('should have API key in default params', () => {
    expect(tmdbAPI.defaults.params).toHaveProperty('api_key');
  });

  it('should have correct image base URL', () => {
    expect(IMAGE_BASE_URL).toBe('https://image.tmdb.org/t/p/');
  });

  it('should have a timeout of 10 seconds', () => {
    expect(tmdbAPI.defaults.timeout).toBe(10000);
  });

  it('should create successful requests', async () => {
    const mockData = { test: 'data' };
    mockAxios.onGet('/test').reply(200, mockData);

    const response = await tmdbAPI.get('/test');
    expect(response.data).toEqual(mockData);
  });

  it('should handle request errors', async () => {
    mockAxios.onGet('/error').reply(500, { message: 'Server error' });

    await expect(tmdbAPI.get('/error')).rejects.toThrow();
  });
});