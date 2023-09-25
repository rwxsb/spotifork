"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../state/actions/tokenActions";
import { useSelector } from "react-redux";
import { IAppState } from "../constants/state";
import { useRouter } from "next/navigation";

export default function Callback() {
  const dispatch = useDispatch();
  const router = useRouter();
  const redirectUrl = useSelector(
    (state: IAppState) => state.redirect?.redirectUrl,
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      dispatch(setToken(code));
    }
  }, []);

  useEffect(() => {
    if (redirectUrl) {
      router.push(redirectUrl);
    }
  }, [redirectUrl, router]);

  return <div>Handling redirect...</div>;
}
