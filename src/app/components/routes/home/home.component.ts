import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {

    miFormulario: FormGroup;
    imagePreviews: string[] = [];
    images: File[] = [];

    constructor(private fb: FormBuilder, private _homeService: HomeService) {
        this.miFormulario = this.fb.group({});
    }

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

    sendSliders() {
        if (this.images.length === 0) return; // Asegurarse de que al menos una imagen haya sido seleccionada


        if (this.images.length === 0) {
            console.log('Debes seleccionar al menos una imagen.')
            // this.message = 'Debes seleccionar al menos una imagen.';
            // this.messageType = 'error';
            return;
        }


        const secc1 = {
            images: this.images.filter(Boolean), // Filtrar archivos no seleccionados
        };

        this._homeService.sendSlider(secc1).subscribe({
            next: (data) => {
                if (data.success == true) {
                    console.log('Imágenes enviadas');
                }
                else {
                    console.log('Hubo un problema al enviar las imágenes.')
                    // this.message = 'Hubo un problema al enviar las imágenes.';
                    // this.messageType = 'error';
                }
            },
            error: (err) => {
                if (err.status === 400) {
                    console.log('Solicitud incorrecta. Verifica los datos enviados.')
                    // this.message = 'Solicitud incorrecta. Verifica los datos enviados.';
                } else if (err.status === 500) {
                    console.log('Error del servidor. Inténtalo más tarde.')
                    // this.message = 'Error del servidor. Inténtalo más tarde.';
                } else {
                    console.log('Error desconocido. Inténtalo de nuevo.')
                    // this.message = 'Error desconocido. Inténtalo de nuevo.';
                }
                // this.messageType = 'error';
                console.log(err);
            },
            complete: () => {
                console.log('complete');
            },
        });
    }

    sendHist() {
        if (this.miFormulario.invalid) return;
        const { titulo, subtitulo } = this.miFormulario.controls;
        console.log(titulo.value, subtitulo.value);
    }
}
