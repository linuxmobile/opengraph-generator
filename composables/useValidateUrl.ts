export async function useValidateUrl(url: string): Promise<boolean> {
	try {
		const urlPattern =
			/^(https?:\/\/)?(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}(\/[a-zA-Z0-9@:%_\+.~#?&//=]*)?$/gi;
		if (!urlPattern.test(url)) {
			alert("The URL is not valid");
			return false;
		}

		if (!/^https?:\/\//i.test(url)) {
			url = "http://" + url;
		}

		const filePattern =
			/\/[^\/]+\.(md|txt|html|htm|pdf|doc|docx|xls|xlsx|ppt|pptx|json|xml|csv)$/i;
		if (filePattern.test(url)) {
			alert("The URL must not contain specific files");
			return false;
		}

		try {
			const response = await fetch(
				`/api/extract-metadata?url=${encodeURIComponent(url)}`,
			);
			const metadata = await response.json();

			if (metadata.error) {
				alert("The URL is not accessible or is not a valid web page");
				return false;
			}

			return true;
		} catch (error) {
			console.error("Error validating URL:", error);
			alert("Error al validar la URL");
			return false;
		}
	} catch (error) {
		console.error("Error validating URL:", error);
		alert("Error al validar la URL");
		return false;
	}
}
