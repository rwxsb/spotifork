"use client";
import { authRequest } from "types";
import {
  AccessToken,
  SpotifyApi,
  emptyAccessToken,
} from "@spotify/web-api-ts-sdk";

export const authWithSpotify = async (
  req: authRequest,
): Promise<AccessToken> => {
  const sdk = SpotifyApi.withUserAuthorization(
    req.clientId,
    req.redirectUrl,
    req.scopes,
  );
  const token = (await sdk.authenticate()).accessToken;
  return token;
};
