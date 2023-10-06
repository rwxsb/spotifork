import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../constants/state";
import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { authUser } from "../state/actions/authActions";

const clientId = "7de5348da8994d779c49e165017c1083";
const redirectUrl = "http://localhost:3000/search";
const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
];

export function useSpotify() {
  const token = useSelector((state: IAppState) => state.token);
  const [sdk, setSdk] = useState<SpotifyApi>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasTokenExpired(token.token)) {
      dispatch(authUser({ clientId, redirectUrl, scopes }));
      let sdk = SpotifyApi.withAccessToken(clientId, token.token);
      setSdk(sdk);
    } else if (!hasTokenExpired(token.token)) {
      let sdk = SpotifyApi.withAccessToken(clientId, token?.token);
      setSdk(sdk);
    }
  }, [dispatch, token]);

  if (!isAuthenticatedSdk(sdk)) {
    return null;
  }

  return sdk;
}

export function hasTokenExpired(token: AccessToken) {
  return token.expires < new Date().getTime();
}

export function isAuthenticatedSdk(sdk: SpotifyApi) {
  if (!sdk) {
    return false;
  }

  return sdk.getAccessToken().then((res) => {
    if (res) {
      return true;
    }

    return false;
  });
}
