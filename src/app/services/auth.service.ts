import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private apiUrl = 'https://your-api-endpoint.com/news';

    constructor(private _http: HttpClient) { }

    isLoggedIn(): boolean {
        return true;
    }

    // isLoggedIn(): boolean {
    //   return !!localStorage.getItem('usuario');
    // }

    login(email: string, password: string): Observable<any> {
        const body = {
            email: email,
            password: password
        }
        return this._http.post<any>(this.apiUrl + '/user/login', body, { observe: 'response' })
            .pipe(
                map((response: HttpResponse<any>) => {
                    if (response.status === 200) {
                        // Respuesta exitosa
                        return response.body;
                    } else {
                        throw new Error(`Error inesperado con código de estado: ${response.status}`);
                    }
                })
            )
    }
}
