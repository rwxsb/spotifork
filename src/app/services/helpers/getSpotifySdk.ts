import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const defaultClientId = "7de5348da8994d779c49e165017c1083";
const defaultRedirectUrl = "http://localhost:3000/search";
const defaultScopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
];

export async function getSpotifySdk(
  clientId: string = defaultClientId,
  redirectUrl: string = defaultRedirectUrl,
  scopes: string[] = defaultScopes,
): Promise<SpotifyApi> {
  const internalSdk = SpotifyApi.withUserAuthorization(
    clientId,
    redirectUrl,
    scopes,
  );

  try {
    const { authenticated } = await internalSdk.authenticate();
  } catch (e: Error | unknown) {
    const error = e as Error;
    if (
      error &&
      error.message &&
      error.message.includes("No verifier found in cache")
    ) {
      console.error(
        "If you are seeing this error in a React Development Environment it's because React calls useEffect twice. Using the Spotify SDK performs a token exchange that is only valid once, so React re-rendering this component will result in a second, failed authentication. This will not impact your production applications (or anything running outside of Strict Mode - which is designed for debugging components).",
        error,
      );
    } else {
      console.error(e);
    }
  }

  return internalSdk;
}
