import {
    HttpClient,
    HttpErrorResponse,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { ShowtoastrService } from './showtoastr.service';
import { Slider } from '../interfaces/send_news_slider';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    private apiUrl = 'https://your-api-endpoint.com/news';

    constructor(private _http: HttpClient, private _toastr: ShowtoastrService) { }

    sendSlider(slider: Slider): Observable<any> {
        const formData = new FormData();
        formData.append('subtitulo', slider.subtitulo);
        slider.images.forEach((image, index) => {
            formData.append(`image${index + 1}`, image, image.name);
        });

        return this._http.post<any>(this.apiUrl, formData, { observe: 'response' })
            .pipe(
                map((response: HttpResponse<any>) => {
                    if (response.status === 200) {
                        // Respuesta exitosa
                        return response.body;
                    } else {
                        throw new Error(`Error inesperado con código de estado: ${response.status}`);
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    // Manejo de errores
                    if (error.status === 404) {
                        this._toastr.showNotification('Error (404)', 'Recurso no encontrado', 'error')
                        return of({ success: false, message: 'Recurso no encontrado (404).', });
                    } else {
                        this._toastr.showNotification('Ocurrió un error', error.message, 'error')
                        return of({ success: false, message: 'Error en la solicitud' });
                    }
                })
            )
    }

    sendStory() { }
}
