import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Slider } from 'src/app/interfaces/send_news_slider';

import { HomeService } from 'src/app/services/home.service';

import { ShowtoastrService } from 'src/app/services/showtoastr.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {

    miFormulario: FormGroup = this.fb.group({
        subtitulo: [, [Validators.required]],
    })
    imagePreviews: string[] = [];
    images: File[] = [];

    constructor(private fb: FormBuilder, private _homeService: HomeService, private _toastr: ShowtoastrService) { }

    selectImage(index: number): void {
        const input = document.getElementById(`fileInput${index}`) as HTMLInputElement;
        input.click();
    }

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

    sendSliders() {
        if (this.miFormulario.invalid) return;

        if (this.images.length === 0) {
            this._toastr.showNotification('Error!', 'Debes seleccionar al menos una imagen.', 'error')
            return;
        }

        const { subtitulo } = this.miFormulario.controls;
        const secc1: Slider = {
            subtitulo: subtitulo.value,
            images: this.images.filter(Boolean), // Filtrar archivos no seleccionados
        };

        this._homeService.sendSlider(secc1).subscribe({
            next: (data) => {
                if (data.success === true) {
                    this._toastr.showNotification('Exito!', 'Slider enviado.', 'success')
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    sendHist() {
        // if (this.miFormulario.invalid) return;
        // const { titulo, subtitulo } = this.miFormulario.controls;
        // console.log(titulo.value, subtitulo.value);
    }

}
