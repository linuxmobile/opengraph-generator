import { useGlobalGenericState } from "~/utils/useGlobalGenericState";
import gradients from '~/assets/gradients.json'

interface Gradient {
  id: number;
  gradient: string;
}

function shuffleArray(array: Gradient[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const useGradients = () => {
  const allGradientsShuffled = shuffleArray([...gradients]);
  const [allRandomGradients] = useGlobalGenericState<Gradient[]>('allRandomGradients', allGradientsShuffled);

  const fewGradientsShuffled = allGradientsShuffled.slice(0, 9)

  const [fewRandomGradients] = useGlobalGenericState<Gradient[]>('fewRandomGradients', fewGradientsShuffled);

  const [orderedGradients, setOrderedGradientsState] = useGlobalGenericState<Gradient[]>('orderedGradients', []);

  const setOrderedGradients = (gradients: Gradient[]) => {
    setOrderedGradientsState(gradients);
  };

  return { allRandomGradients, fewRandomGradients, orderedGradients, setOrderedGradients };
}
