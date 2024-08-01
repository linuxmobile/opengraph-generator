import { useGlobalGenericState } from "~/utils/useGlobalGenericState";

const gradientImages: { [key: string]: string } = {
	image1: "/assets/1.jpg",
	image2: "/assets/2.jpg",
	image3: "/assets/3.jpg",
	image4: "/assets/4.jpg",
	image5: "/assets/5.jpg",
	image6: "/assets/6.jpg",
	image7: "/assets/7.jpg",
	image8: "/assets/8.jpg",
	image9: "/assets/9.jpg",
	image10: "/assets/10.jpg",
};

interface GradientImage {
	id: number;
	gradient: string;
}

const getRandomGradients = (count: number): GradientImage[] => {
	const keys = Object.keys(gradientImages);
	const shuffled = keys.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count).map((key, index) => ({
		id: index + 1,
		gradient: gradientImages[key],
	}));
};

export const useGradients = () => {
	const [gradients, setGradients] = useGlobalGenericState<GradientImage[]>("gradients", []);

	if (!Array.isArray(gradients)) {
		setGradients([]);
	}

	const fetchGradients = (count: number) => {
		const newGradients = getRandomGradients(count);
		setGradients(newGradients);
	};

	return { gradients, fetchGradients };
};
