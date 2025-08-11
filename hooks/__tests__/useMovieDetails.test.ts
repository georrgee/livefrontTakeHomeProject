import { renderHook, waitFor } from '@testing-library/react-native';
import { useMovieDetails } from '../useMovieDetails';
import { movieService } from '@/services';
import { MovieDetails } from '@/types';

/** @description Test suite for the useMovieDetails hook */
jest.mock('@/services', () => ({
  movieService: {
    getMovieDetails: jest.fn(),
  },
}));

const mockMovieService = movieService as jest.Mocked<typeof movieService>;

const mockMovieDetails: MovieDetails = {
  id: 1,
  title: 'Test Movie',
  overview: 'A test movie overview',
  backdrop_path: '/test-backdrop.jpg',
  poster_path: '/test-poster.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  budget: 1000000,
  genres: [{ id: 1, name: 'Action' }],
  runtime: 120,
  production_companies: [{ logo_path: '/logo.jpg', name: 'Test Studios' }],
  status: 'Released',
  homepage: 'https://testmovie.com',
  revenue: 5000000,
};

/** @description Test suite for the useMovieDetails hook */
describe('useMovieDetails hook test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize to default values there is no movieID (null)', () => {
    const { result } = renderHook(() => useMovieDetails(null));

    expect(result.current.movieDetails).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.errorMessage).toBeNull();
    expect(typeof result.current.refetchMovieDetails).toBe('function');
  });

  it('should fetch movie details successfully', async () => {
    mockMovieService.getMovieDetails.mockResolvedValueOnce(mockMovieDetails);

    const { result } = renderHook(() => useMovieDetails(1));

    await waitFor(
      () => expect(result.current.isLoading).toBe(false),
      { timeout: 10000 }
    );

    expect(result.current.movieDetails).toEqual(mockMovieDetails);
    expect(result.current.errorMessage).toBeNull();
    expect(mockMovieService.getMovieDetails).toHaveBeenCalledWith(1);
  }, 15000);

  it('should handle API errors', async () => {
    const errorMessage = 'Failed to fetch movie details';
    mockMovieService.getMovieDetails.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useMovieDetails(1));

    await waitFor(
      () => expect(result.current.isLoading).toBe(false),
      { timeout: 10000 }
    );

    expect(result.current.movieDetails).toBeNull();
    expect(result.current.errorMessage).toBe(errorMessage);
  }, 15000);

  it('should clear details when movieID changes to null', async () => {
    mockMovieService.getMovieDetails.mockResolvedValueOnce(mockMovieDetails);

    const { result, rerender } = renderHook(
      ({ movieID }) => useMovieDetails(movieID),
      { initialProps: { movieID: 1 as number | null } }
    );

    await waitFor(
      () => expect(result.current.movieDetails).toEqual(mockMovieDetails),
      { timeout: 10000 }
    );

    rerender({ movieID: null });

    expect(result.current.movieDetails).toBeNull();
    expect(result.current.errorMessage).toBeNull();
  }, 15000);
});