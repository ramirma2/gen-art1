import palettes from 'nice-color-palettes';
import random from 'canvas-sketch-util/random';
import { useMemo } from 'react';

export function useRandomPalette() {

    return useMemo( () => {
        const palette = random.pick(palettes);
        return palette;
    }, [] );
}