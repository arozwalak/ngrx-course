import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import { AuthService } from "../auth.service";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";
import { Router } from "@angular/router";
import { AppState } from "../../reducers";
import { AuthActions } from "../action-types";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: false,
})
export class LoginComponent {
  form: FormGroup;

  #fb = inject(FormBuilder);
  #auth = inject(AuthService);
  #router = inject(Router);
  #store = inject(Store<AppState>);

  constructor() {
    this.form = this.#fb.group({
      email: ["test@angular-university.io", [Validators.required]],
      password: ["test", [Validators.required]],
    });
  }

  login() {
    const val = this.form.value;

    this.#auth
      .login(val.email, val.password)
      .pipe(
        tap((user) => {
          console.log("user: ", user);
          this.#store.dispatch(AuthActions.login({ user }));
          this.#router.navigateByUrl("/courses");
        })
      )
      .subscribe(noop, () => alert("Login Failed"));
  }
}
