/**
 * @param { number } minutes The runtime of a movie in minutes
 * @description Formats the movie's runtime from minutes to hours and minutes (i.e: 2h 30m)
 */
export const formatMovieRunTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

/**
 * @param { string } dateString Date string in ISO format
 * @description Formats the movie's release date from a date string in ISO format to a year number (i.e: 2023)
 */
export const formatYear = (dateString: string): number => {
  return new Date(dateString).getFullYear();
};