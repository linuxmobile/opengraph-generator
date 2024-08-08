export function useValidateUrl(url: string): boolean {
	try {
		const urlPattern =
			/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
		if (!urlPattern.test(url)) {
			alert("La URL no es válida");
			return false;
		}

		// Añade el protocolo si falta
		if (!/^https?:\/\//i.test(url)) {
			url = "http://" + url;
		}

		return true;
	} catch (error) {
		console.error("Error al validar la URL:", error);
		alert("Error al validar la URL");
		return false;
	}
}
