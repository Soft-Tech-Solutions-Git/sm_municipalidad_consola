import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { News } from 'src/app/interfaces/send_news_slider';

import { NewsService } from 'src/app/services/news.service';
import { ShowtoastrService } from 'src/app/services/showtoastr.service';

@Component({
    selector: 'app-noticias',
    templateUrl: './noticias.component.html',
    styleUrls: ['./noticias.component.css'],
})
export class NoticiasComponent {
    miFormulario: FormGroup = this.fb.group({
        titulo: [, [Validators.required]],
        descripcion: [, [Validators.required]],
        url: [, [Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i)]],
        category: [, [Validators.required]],
    });

    constructor(private fb: FormBuilder, private _newsService: NewsService, private _toastr: ShowtoastrService) { }

    categories: string[] = ['Cultura', 'Educación', 'Política', 'Salud', 'Seguridad', 'Transporte'];
    imagePreviews: string[] = [];
    images: File[] = [];
    video: File | null = null;

    selectImage(index: number): void {
        const input = document.getElementById(`fileInput${index}`) as HTMLInputElement;
        input.click();
    }

    selectVideo(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.video = file;
        }
    }

    // previewImage(event: any, index: number): void {
    //   const file = event.target.files[0];
    //   const reader = new FileReader();

    //   reader.onload = () => {
    //     this.imagePreviews[index - 1] = reader.result as string;
    //   };

    //   if (file) {
    //     reader.readAsDataURL(file);
    //   }
    // }
    previewImage(event: any, index: number): void {
        const file = event.target.files[0];
        const reader = new FileReader();

        if (file) {
            this.images[index - 1] = file; // Guardar el archivo seleccionado
            reader.onload = () => {
                this.imagePreviews[index - 1] = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    campoEsValido(campo: string) {
        return (
            this.miFormulario.controls[campo].errors &&
            this.miFormulario.controls[campo].touched
        );
    }

    onSubmit(): void {
        if (this.miFormulario.invalid) return;

        if (this.images.length === 0) {
            this._toastr.showNotification('Error!', 'Debes seleccionar al menos una imagen.', 'error')
            return;
        }

        const { titulo, descripcion, url, category } = this.miFormulario.controls;
        const news: News = {
            title: titulo.value,
            text: descripcion.value,
            images: this.images.filter(Boolean), // Filtrar archivos no seleccionados
            category: category.value,
        };

        if (url.value) {
            news.url = url.value;
        }

        if (this.video) {
            news.video = this.video; // Añadir el video si está presente
        }

        this._newsService.sendNews(news).subscribe({
            next: (data) => {
                if (data.success === true) {
                    this._toastr.showNotification('Exito!', 'Noticia enviada.', 'success')
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

}
