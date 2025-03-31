export function uniqueIdGenerator() {
  // Use a combination of timestamp and random number for uniqueness
  const timestamp = Date.now().toString(36); // Convert timestamp to base36
  const randomString = Math.random().toString(36).substring(2, 9); // Get a random string
  console.log('timestamp + randomString ',timestamp + randomString);
  
  return timestamp + randomString;
}
