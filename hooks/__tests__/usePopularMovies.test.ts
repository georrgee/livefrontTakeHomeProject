import { renderHook, waitFor, act } from '@testing-library/react-native';
import { usePopularMovies } from '../usePopularMovies';
import { movieService } from '@/services';
import { PopularMovieResponse } from '@/types';

/** @description Mock the movie service to control the behavior of the API calls in tests */
jest.mock('@/services', () => ({
  movieService: {
    getPopularMovies: jest.fn(),
  },
}));

const mockMovieService = movieService as jest.Mocked<typeof movieService>;

const mockPopularMoviesResponse: PopularMovieResponse = {
  page: 1,
  results: [
    {
      id: 1,
      title: 'Test Movie 1',
      overview: 'Test overview 1',
      poster_path: '/test1.jpg',
      backdrop_path: '/backdrop1.jpg',
      release_date: '2024-01-01',
      vote_average: 8.5,
    },
  ],
  total_pages: 5,
};

describe('usePopularMovies hook test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('When it is mounted, it should fetch popular movies', async () => {
    mockMovieService.getPopularMovies.mockResolvedValue(mockPopularMoviesResponse);

    const { result } = renderHook(() => usePopularMovies());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.popularMovies).toBe(null);

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.popularMovies).toEqual(mockPopularMoviesResponse);
    expect(result.current.errorMessage).toBe(null);
    expect(mockMovieService.getPopularMovies).toHaveBeenCalledWith(1);
  });

  it('should handle errors when fetching movies', async () => {
    const errorMessage = 'Network error';
    mockMovieService.getPopularMovies.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => usePopularMovies());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.popularMovies).toBe(null);
    expect(result.current.errorMessage).toBe(errorMessage);
  });

  it('When loadMorePopularMovies is called, it should load more movies', async () => {
    const page2Response = {
      ...mockPopularMoviesResponse,
      page: 2,
      results: [
        {
          ...mockPopularMoviesResponse.results[0],
          id: 2,
          title: 'Test Movie 2',
        },
      ],
    };

    mockMovieService.getPopularMovies
      .mockResolvedValueOnce(mockPopularMoviesResponse)
      .mockResolvedValueOnce(page2Response);

    const { result } = renderHook(() => usePopularMovies());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    await act(async () => {
      await result.current.loadMorePopularMovies();
    });

    await waitFor(
      () => {
        expect(result.current.isLoadingMore).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.popularMovies?.results).toHaveLength(2);
    expect(mockMovieService.getPopularMovies).toHaveBeenCalledTimes(2);
    expect(mockMovieService.getPopularMovies).toHaveBeenNthCalledWith(2, 2);
  });

  it('When refetchPopularMovies is called, it should refetch movies', async () => {
    mockMovieService.getPopularMovies.mockResolvedValue(mockPopularMoviesResponse);

    const { result } = renderHook(() => usePopularMovies());

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    await act(async () => {
      await result.current.refetchPopularMovies();
    });

    expect(mockMovieService.getPopularMovies).toHaveBeenCalledTimes(2);
    expect(mockMovieService.getPopularMovies).toHaveBeenLastCalledWith(1);
  });

  it('When it is mounted with a total_pages value, it should calculate hasNextPage correctly', async () => {
    mockMovieService.getPopularMovies.mockResolvedValue({
      ...mockPopularMoviesResponse,
      page: 5,
      total_pages: 5,
    });

    const { result } = renderHook(() => usePopularMovies(5));

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.hasNextPage).toBe(false);
  });
});