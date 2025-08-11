import { renderHook } from '@testing-library/react-native';
import { useMovieImages } from '../useMovieImages';
import { movieService } from '@/services';

/** @description Test suite for the useMovieImages hook */
jest.mock('@/services', () => ({
  movieService: {
    getPosterImage: jest.fn(),
    getBackdropImage: jest.fn(),
    getImageURL: jest.fn(),
  },
}));

const mockMovieService = movieService as jest.Mocked<typeof movieService>;

describe('useMovieImages hook test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return memoized image functions', () => {
    const { result } = renderHook(() => useMovieImages());

    expect(result.current.getPosterUrl).toBe(mockMovieService.getPosterImage);
    expect(result.current.getBackdropUrl).toBe(mockMovieService.getBackdropImage);
    expect(result.current.getImageUrl).toBe(mockMovieService.getImageURL);
  });

  it('should return the same functions on re-render (memoization)', () => {
    const { result, rerender } = renderHook(() => useMovieImages());

    const firstRender = {
      getPosterUrl: result.current.getPosterUrl,
      getBackdropUrl: result.current.getBackdropUrl,
      getImageUrl: result.current.getImageUrl,
    };

    rerender({});

    const secondRender = {
      getPosterUrl: result.current.getPosterUrl,
      getBackdropUrl: result.current.getBackdropUrl,
      getImageUrl: result.current.getImageUrl,
    };

    expect(firstRender.getPosterUrl).toBe(secondRender.getPosterUrl);
    expect(firstRender.getBackdropUrl).toBe(secondRender.getBackdropUrl);
    expect(firstRender.getImageUrl).toBe(secondRender.getImageUrl);
  });

  it('should call movieService.getPosterImage when getPosterUrl is called', () => {
    mockMovieService.getPosterImage.mockReturnValue('https://image.tmdb.org/t/p/w500/poster.jpg');

    const { result } = renderHook(() => useMovieImages());
    const posterUrl = result.current.getPosterUrl('/poster.jpg', 'w500');

    expect(mockMovieService.getPosterImage).toHaveBeenCalledWith('/poster.jpg', 'w500');
    expect(posterUrl).toBe('https://image.tmdb.org/t/p/w500/poster.jpg');
  });

  it('should call movieService.getBackdropImage when getBackdropUrl is called', () => {
    mockMovieService.getBackdropImage.mockReturnValue('https://image.tmdb.org/t/p/w1280/backdrop.jpg');

    const { result } = renderHook(() => useMovieImages());
    const backdropUrl = result.current.getBackdropUrl('/backdrop.jpg', 'w1280');

    expect(mockMovieService.getBackdropImage).toHaveBeenCalledWith('/backdrop.jpg', 'w1280');
    expect(backdropUrl).toBe('https://image.tmdb.org/t/p/w1280/backdrop.jpg');
  });

  it('should call movieService.getImageURL when getImageUrl is called', () => {
    mockMovieService.getImageURL.mockReturnValue('https://image.tmdb.org/t/p/w500/image.jpg');

    const { result } = renderHook(() => useMovieImages());
    const imageUrl = result.current.getImageUrl('/image.jpg', 'w500');

    expect(mockMovieService.getImageURL).toHaveBeenCalledWith('/image.jpg', 'w500');
    expect(imageUrl).toBe('https://image.tmdb.org/t/p/w500/image.jpg');
  });

  it('should handle null paths correctly', () => {
    mockMovieService.getPosterImage.mockReturnValue(null);
    mockMovieService.getBackdropImage.mockReturnValue(null);
    mockMovieService.getImageURL.mockReturnValue(null);

    const { result } = renderHook(() => useMovieImages());

    expect(result.current.getPosterUrl(null)).toBeNull();
    expect(result.current.getBackdropUrl(null)).toBeNull();
    expect(result.current.getImageUrl(null)).toBeNull();

    expect(mockMovieService.getPosterImage).toHaveBeenCalledWith(null);
    expect(mockMovieService.getBackdropImage).toHaveBeenCalledWith(null);
    expect(mockMovieService.getImageURL).toHaveBeenCalledWith(null);
  });

  it('should use default size parameters when not provided', () => {
    const { result } = renderHook(() => useMovieImages());

    result.current.getPosterUrl('/poster.jpg');
    result.current.getBackdropUrl('/backdrop.jpg');
    result.current.getImageUrl('/image.jpg');

    expect(mockMovieService.getPosterImage).toHaveBeenCalledWith('/poster.jpg');
    expect(mockMovieService.getBackdropImage).toHaveBeenCalledWith('/backdrop.jpg');
    expect(mockMovieService.getImageURL).toHaveBeenCalledWith('/image.jpg');
  });
});