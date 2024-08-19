export async function useValidateUrl(url: string): Promise<boolean> {
	try {
		const urlPattern =
			/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,10}(\/[a-zA-Z0-9@:%_\+.~#?&//=]*)?$/gi;
		if (!urlPattern.test(url)) {
			alert("The URL is not valid");
			return false;
		}

		// Force HTTPS
		if (!/^https:\/\//i.test(url)) {
			url = url.replace(/^http:\/\//i, "https://");
			if (!/^https:\/\//i.test(url)) {
				url = "https://" + url;
			}
		}

		const filePattern =
			/\/[^\/]+\.(md|txt|html|htm|pdf|doc|docx|xls|xlsx|ppt|pptx|json|xml|csv)$/i;
		if (filePattern.test(url)) {
			alert("The URL must not contain specific files");
			return false;
		}

		interface ApiResponse {
			valid: boolean;
			message?: string;
		}

		const { valid, message }: ApiResponse = await $fetch(`/api/validate-url`, {
			params: { url },
		});

		if (!valid) {
			alert(message || "The URL is not accessible or is not a valid web page");
			return false;
		}

		return true;
	} catch (error) {
		alert("Error al validar la URL");
		return false;
	}
}
