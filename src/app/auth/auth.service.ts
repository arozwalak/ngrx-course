import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./model/user.model";

@Injectable()
export class AuthService {
  #http = inject(HttpClient);

  login(email: string, password: string): Observable<User> {
    return this.#http.post<User>("/api/login", { email, password });
  }
}
