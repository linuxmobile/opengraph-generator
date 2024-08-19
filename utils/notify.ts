import { toast, type ToastOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const notify = {
	default: (message: string, options: ToastOptions = {}) => {
		toast(message, options);
	},
	success: (message: string, options: ToastOptions = {}) => {
		toast.success(message, {
			position: toast.POSITION.TOP_RIGHT,
			theme: "dark",
			...options,
		});
	},
	error: (message: string, options: ToastOptions = {}) => {
		toast.error(message, {
			position: toast.POSITION.TOP_RIGHT,
			theme: "colored",
			...options,
		});
	},
	warn: (message: string, options: ToastOptions = {}) => {
		toast.warn(message, {
			position: toast.POSITION.TOP_RIGHT,
			theme: "dark",
			...options,
		});
	},
	info: (message: string, options: ToastOptions = {}) => {
		toast.info(message, {
			position: toast.POSITION.TOP_RIGHT,
			theme: "dark",
			...options,
		});
	},
};

export default notify;
