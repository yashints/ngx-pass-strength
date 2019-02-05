import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NgxPassStrengthService {
  public pwnedPasswordsApiUrl = "https://api.pwnedpasswords.com";
  public RANGE_URL = 'range';

  constructor(private http: HttpClient) {}

  range(hash: string): Observable<string> {
    return this.http.get(
      `${this.pwnedPasswordsApiUrl}/${this.RANGE_URL}/${hash}`,
      { responseType: "text" }
    );
  }
}
