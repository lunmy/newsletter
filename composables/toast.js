import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const toastOptions = {
    autoClose: 5000,
    position: toast.POSITION.TOP_CENTER,
    clearOnUrlChange: false,
    pauseOnHover: false,
    pauseOnFocusLoss: false
}

export function successToast(message) {
    toast.success('' + message,toastOptions);
}

export function errorToast(message) {
    toast.error(message, toastOptions);
}
