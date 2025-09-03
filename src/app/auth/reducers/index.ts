import { isDevMode } from "@angular/core";
import { ActionReducer, createReducer, on } from "@ngrx/store";
import { User } from "../model/user.model";
import { AuthActions } from "../action-types";

export const authFeatureKey = "auth";

export interface AuthState {
  user: User;
}

const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer: ActionReducer<AuthState> = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action): AuthState => {
    return {
      user: action.user,
    };
  }),
  on(AuthActions.logout, (state, action): AuthState => {
    return {
      user: undefined,
    };
  })
);
