"use client";
import { TokenActionTypes } from "../actions/tokenActions";
import { ignoreElements, map, tap, window } from "rxjs/operators";
import { Action } from "@reduxjs/toolkit";
import { Observable } from "rxjs";
import { ofType } from "redux-observable";
import Router from "next/router";
import { RedirectActionTypes } from "../actions/redirectActions";

export const redirectOnLoginSuccessEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(TokenActionTypes.SET_TOKEN_SUCEEDED), // replace with your success action type
    map(() => {
      return { type: RedirectActionTypes.REDIRECT, payload: "/search" };
    }),
  );
