import MockAdapter from 'axios-mock-adapter';
import tmdbAPI from '../tmdbAPI';
import { movieService } from '../movieService';
import { MovieDetails, PopularMovieResponse } from '@/types';

/** @description Mock the tmdbAPI to control the behavior of the API calls in tests */
const mockAxios = new MockAdapter(tmdbAPI);

const mockPopularMoviesResponse: PopularMovieResponse = {
  page: 1,
  results: [
    {
      id: 1,
      title: 'Test Movie',
      overview: 'Test overview',
      poster_path: '/test.jpg',
      backdrop_path: '/backdrop.jpg',
      release_date: '2024-01-01',
      vote_average: 8.5,
    },
  ],
  total_pages: 5,
};

const mockMovieDetails: MovieDetails = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test.jpg',
  backdrop_path: '/backdrop.jpg',
  release_date: '2024-01-01',
  vote_average: 8.5,
  genres: [{ id: 28, name: 'Action' }],
  runtime: 120,
  budget: 1000000,
  revenue: 5000000,
  status: 'Released',
  homepage: 'https://test.com',
  production_companies: [],
};

describe('movieService', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  describe('getPopularMovies', () => {
    it('should fetch popular movies successfully', async () => {
      mockAxios.onGet('/movie/popular').reply(200, mockPopularMoviesResponse);

      const result = await movieService.getPopularMovies();

      expect(result).toEqual(mockPopularMoviesResponse);
      expect(mockAxios.history.get[0].params).toEqual({
        language: 'en-US',
        page: 1,
      });
    });

    it('should fetch popular movies with custom page', async () => {
      mockAxios.onGet('/movie/popular').reply(200, mockPopularMoviesResponse);

      await movieService.getPopularMovies(2);

      expect(mockAxios.history.get[0].params).toEqual({
        language: 'en-US',
        page: 2,
      });
    });

    it('should handle API errors', async () => {
      mockAxios.onGet('/movie/popular').reply(500, { message: 'Server error' });

      await expect(movieService.getPopularMovies()).rejects.toThrow();
    });
  });

  describe('getMovieDetails', () => {
    it('should fetch movie details successfully', async () => {
      mockAxios.onGet('/movie/1').reply(200, mockMovieDetails);

      const result = await movieService.getMovieDetails(1);

      expect(result).toEqual(mockMovieDetails);
      expect(mockAxios.history.get[0].params).toEqual({
        language: 'en-US',
      });
    });

    it('should handle movie not found', async () => {
      mockAxios.onGet('/movie/999').reply(404, { message: 'Movie not found' });

      await expect(movieService.getMovieDetails(999)).rejects.toThrow();
    });
  });

  describe('image URL helpers', () => {
    it('should generate correct poster image URL', () => {
      const result = movieService.getPosterImage('/test.jpg');
      expect(result).toBe('https://image.tmdb.org/t/p/w500/test.jpg');
    });

    it('should generate correct backdrop image URL', () => {
      const result = movieService.getBackdropImage('/backdrop.jpg');
      expect(result).toBe('https://image.tmdb.org/t/p/w1280/backdrop.jpg');
    });

    it('should return null for null paths', () => {
      expect(movieService.getPosterImage(null)).toBe(null);
      expect(movieService.getBackdropImage(null)).toBe(null);
    });

    it('should handle custom sizes', () => {
      const result = movieService.getPosterImage('/test.jpg', 'w300');
      expect(result).toBe('https://image.tmdb.org/t/p/w300/test.jpg');
    });
  });
});