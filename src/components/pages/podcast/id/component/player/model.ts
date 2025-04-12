function secondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60); // Calculate minutes
  const remainingSeconds = Math.floor(seconds % 60); // Calculate remaining seconds
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`; // Return formatted string
}

const podcastPlayerModel = { secondsToMinutes };

export default podcastPlayerModel;
