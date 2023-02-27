import Swal from 'sweetalert2';

export default class AlertService {

    async confirmation(cb, title, description) {

        Swal.fire({
            title: title,
            text: description,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'CONFIRM',
            cancelButtonText: 'CANCEL',
            allowOutsideClick: false
        }).then((result) => {
            console.log(result.isConfirmed);
            if (result.isConfirmed) {
                cb();
            }
        })
    }

    async loading() {

        Swal.fire({
           imageUrl: "/images/loading.gif",
            showConfirmButton: false,
            allowOutsideClick: false
        });
    }
    async close() {

        Swal.close();
    }

    async success(title, description) {

        Swal.fire({
            icon: 'success',
            title: title,
            text: description,
            allowOutsideClick: false
        })
    }

    async error(title, description) {

        Swal.fire({
            icon: 'error',
            title: title,
            text: description,
            allowOutsideClick: false
        })
    }
}

export const alertService = new AlertService();
