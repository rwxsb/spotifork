import { useState, useEffect } from "react";
import { createClient as createSupabaseClient } from "@/utils/supabase/component";
import { Session } from "@supabase/supabase-js";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export function useSpotifyClient() {
  const [supabase] = useState(() => createSupabaseClient());
  const [session, setSession] = useState<Session | null>(null);
  const [sdk, setSdk] = useState<SpotifyApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error);
          setError(error.message);
        } else {
          setSession(data.session);

          if (data.session?.provider_token) {
            const spotifySdk = SpotifyApi.withAccessToken(
              process.env.SPOTIFY_CLIENTID!,
              {
                access_token: data.session.provider_token,
                token_type: "Bearer", // Spotify uses Bearer type
                refresh_token: data.session.provider_refresh_token,
                expires_in: data.session.expires_in || 3600, // Default to 1 hour
                expires: data.session.expires_at
                  ? data.session.expires_at * 1000
                  : undefined,
              },
            );
            setSdk(spotifySdk);
          }
        }
      } catch (err) {
        console.error("Error initializing Spotify SDK:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [supabase]);

  return {
    supabase: supabase,
    session: session,
    sdk: sdk,
    loading: loading,
    error: error,
  };
}
