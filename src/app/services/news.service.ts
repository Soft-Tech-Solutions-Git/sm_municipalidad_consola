import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

interface News {
    title: string;
    text: string;
    images: File[];
}

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    private apiUrl = 'https://your-api-endpoint.com/news';

    constructor(private http: HttpClient) { }

    sendNews(news: News): Observable<any> {
        const formData = new FormData();
        formData.append('title', news.title);
        formData.append('text', news.text);
        news.images.forEach((image, index) => {
            formData.append(`image${index + 1}`, image);
        });

        const headers = new HttpHeaders({
            // 'Content-Type': 'multipart/form-data' // No se necesita, Angular lo maneja automáticamente
        });

        return this.http
            .post<any>(this.apiUrl, formData, { headers, observe: 'response' })
            .pipe(
                map((response: HttpResponse<any>) => {
                    if (response.status === 200) {
                        // Respuesta exitosa
                        return response.body;
                    } else {
                        throw new Error(
                            `Error inesperado con código de estado: ${response.status}`
                        );
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    // Manejo de errores
                    if (error.status === 404) {
                        console.error('Recurso no encontrado (404).');
                        return of({
                            success: false,
                            message: 'Recurso no encontrado (404).',
                        });
                    } else {
                        console.error('Ocurrió un error:', error);
                        return of({ success: false, message: 'Error en la solicitud' });
                    }
                })
            );
    }
}
