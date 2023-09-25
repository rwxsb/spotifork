"use client";
import { authRequest } from "types";
import {
  AccessToken,
  SpotifyApi,
  emptyAccessToken,
} from "@spotify/web-api-ts-sdk";
import { getSpotifySdk } from "./helpers/getSpotifySdk";
import { Router, useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

const clientId = "7de5348da8994d779c49e165017c1083";
const clientSecret = "f132a6037a8b4a4191a16d48dc5de0d8";
const searchRedirectUrl = "http://localhost:3000/search";
const callbackRedirectUrl = "http://localhost:3000/callback";

export const authWithSpotify = async (req: authRequest): Promise<void> => {
  let codeVerifier = generateRandomString(128);

  generateCodeChallenge(codeVerifier).then((codeChallenge) => {
    let state = generateRandomString(16);
    let scopes = [
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-private",
      "playlist-modify-public",
    ];

    localStorage.setItem("code_verifier", codeVerifier);

    let args = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: scopes.join(" "),
      redirect_uri: callbackRedirectUrl,
      state: state,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });

    window.location.replace("https://accounts.spotify.com/authorize?" + args);
  });
};

export const exchangeCodeForToken = async (
  code: string,
): Promise<AccessToken> => {
  let codeVerifier = localStorage.getItem("code_verifier");
  console.log(codeVerifier);
  console.log("code " + code);

  let body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: callbackRedirectUrl,
    client_id: clientId,
    code_verifier: codeVerifier,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });

  const data = await response.json();

  return data;
};

function generateRandomString(length: number) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  function base64encode(buffer: ArrayBuffer): string {
    const byteArray = new Uint8Array(buffer);
    const str = Array.from(byteArray)
      .map((byte) => String.fromCharCode(byte))
      .join("");
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}
