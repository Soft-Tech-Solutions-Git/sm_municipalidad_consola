import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NewsService } from 'src/app/services/news.service';

@Component({
    selector: 'app-noticias',
    templateUrl: './noticias.component.html',
    styleUrls: ['./noticias.component.css'],
})
export class NoticiasComponent {
    miFormulario: FormGroup = this.fb.group({
        titulo: [, [Validators.required]],
        descripcion: [, [Validators.required]],
    });

    constructor(private fb: FormBuilder, private _newsService: NewsService) { }

    imagePreviews: string[] = [];
    images: File[] = [];

    selectImage(index: number): void {
        const input = document.getElementById(`fileInput${index}`) as HTMLInputElement;
        input.click();
        // console.log(this.imagePreviews);
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

    // onSubmit() {
    //   if (this.miFormulario.invalid) return;
    //   const { titulo, descripcion } = this.miFormulario.controls;
    //   console.log(titulo.value, descripcion.value);
    // }
    onSubmit(): void {
        if (this.miFormulario.invalid) return;

        const { titulo, descripcion } = this.miFormulario.controls;
        const news = {
            title: titulo.value,
            text: descripcion.value,
            images: this.images.filter(Boolean), // Filtrar archivos no seleccionados
        };

        this._newsService.sendNews(news).subscribe({
            next: (data) => {
                if (data.success == true) {
                    console.log('Noticia enviada');
                }
            },
            error: (err) => {
                console.log(err);
            },
            complete: () => {
                console.log('complete');
            },
        });
    }
}
