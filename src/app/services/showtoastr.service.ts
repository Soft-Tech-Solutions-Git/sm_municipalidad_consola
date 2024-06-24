import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ShowtoastrService {

    constructor(private toastr: ToastrService) { }

    showNotification(title: string, message: string, type: 'error' | 'success') {
        if (type === 'error') {
            this.toastr.error(message, title, {
                timeOut: 4000,
                closeButton: true,
                progressBar: true,
                progressAnimation: 'decreasing',
                positionClass: 'toast-bottom-center'
            });
        }
        if (type === 'success') {
            this.toastr.success(message, title, {
                timeOut: 4000,
                closeButton: true,
                progressBar: true,
                progressAnimation: 'decreasing',
                positionClass: 'toast-bottom-center'
            });
        }
    }
}
