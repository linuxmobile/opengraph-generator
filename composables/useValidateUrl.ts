export async function useValidateUrl(url: string): Promise<boolean> {
	try {
		const urlPattern =
			/^(https?:\/\/)?(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}(\/[a-zA-Z0-9@:%_\+.~#?&//=]*)?$/gi;
		if (!urlPattern.test(url)) {
			alert("La URL no es válida");
			return false;
		}

		// Añade el protocolo si falta
		if (!/^https?:\/\//i.test(url)) {
			url = "http://" + url;
		}

		// Verificar si la URL contiene un archivo específico
		const filePattern =
			/\/[^\/]+\.(md|txt|html|htm|pdf|doc|docx|xls|xlsx|ppt|pptx|json|xml|csv)$/i;
		if (filePattern.test(url)) {
			alert("La URL no debe contener archivos específicos");
			return false;
		}

		try {
			const response = await fetch(
				`/api/extract-metadata?url=${encodeURIComponent(url)}`,
			);
			const metadata = await response.json();

			if (metadata.error) {
				alert("La URL no es accesible o no es una página web válida");
				return false;
			}

			return true;
		} catch (error) {
			console.error("Error al validar la URL:", error);
			alert("Error al validar la URL");
			return false;
		}
	} catch (error) {
		console.error("Error al validar la URL:", error);
		alert("Error al validar la URL");
		return false;
	}
}
