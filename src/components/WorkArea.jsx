import { useEffect, useState, useMemo } from "react";
import Canvas from "./Canvas";
import { useRandomPalette } from "../hooks/useRandomPalette";
import { lerp } from "canvas-sketch-util/math";
import Controls from './Controls'
import { random } from "canvas-sketch-util";


export default function WorkArea() {

    const [dimensions, setDimesions] = useState([2048,2048]);
    const [ margin, setMargin ] = useState(400);
    const [points, setPoints ] = useState([]);
    const [paletteKey, setPaletteKey] = useState(0);//key to re-generate random palette
    const randomPalette = useRandomPalette(paletteKey);//hook to get random palette
    const [lockedPalette, setLockedPalette] = useState(false);
    const [selectedPalette, setSelectedPalette] = useState(randomPalette); // default
    const [showGrid, setShowGrid] = useState(false);
    const [totalFigures, setTotalFigures] = useState(10);
    const [gridSize, setGridSize] = useState([6,6]);
    //Seed to re-render canvas
    const [renderSeed, setRenderSeed] = useState(0);

    useEffect(()=>{
        calculatePointsForGrid(gridSize[0],gridSize[1]);
    },[gridSize, margin, dimensions]);

    // Update palette when paletteKey changes OR on initial load
    useEffect(() => {
        if (randomPalette) {
            setSelectedPalette(randomPalette);
            // console.log('Palette updated:', randomPalette);
        }
    }, [randomPalette, paletteKey]);

    const handleGridToggle = () => {
        setShowGrid(!showGrid);
    }

    const handleGridChange = (rows, cols) => {
        setGridSize([rows,cols]);
        calculatePointsForGrid(rows,cols);
    }

    const handleGenerateNew = (gridSize, margin, totalFigures) => {
        // console.log('Generate new - Locked:', lockedPalette);
        setMargin(margin);
        setTotalFigures(totalFigures);

        //update palette if not locked
        if(!lockedPalette){
            setPaletteKey(paletteKey + 1);
            // setSelectedPalette(randomPalette);
        }
        
        // Only generate new palette if not locked
        if (!lockedPalette) {
            console.log('Generating new palette');
            setPaletteKey(prev => prev + 1);
        }
        // } else {
        //     console.log('Palette locked, keeping current:', selectedPalette);
        // }

        //Trigger re-render of canvas
        setRenderSeed(renderSeed + 1);

        console.log(`Generating new with palette: ${selectedPalette} `);
    }

    const calculatePointsForGrid= (rows, cols) => {
        const my_points = []
        for (let x = 0; x < cols; x++) {
            for(let y =0; y < rows; y++) {
                const u = cols <= 1 ? 0.5 : x / (cols - 1);
                const v = rows <= 1 ? 0.5 : y / (rows - 1);
                my_points.push([u,v]);
            }}
        const lerped_points = my_points.map((point)=>{
            const x = lerp(margin, dimensions[0]- margin,point[0]);
            const y = lerp(margin,dimensions[1]- margin,point[1]);
            return [x,y];
        })
        setPoints(lerped_points);
        return my_points;
    }



    return(
        <div className="work-area grid grid-cols-[180px_minmax(900px,_2fr)_180px] gap-4 col-span-2">    
            <Canvas 
            showGrid={showGrid}
            margin={margin} 
            settings={{dimensions,
                canvas: null}}
                points={points}
                totalFigures = {totalFigures}
                palette = {selectedPalette}
                renderSeed={renderSeed}/>
            <Controls
                gridVisible={showGrid }
                toggleGrid={handleGridToggle}
                changeGridSize= {handleGridChange}
                handleGenerateNew={handleGenerateNew}
                gridSize={gridSize}
                setGridSize= {setGridSize}
                setMargin= {setMargin}
                margin={margin}
                totalFigures={totalFigures}
                setTotalFigures={setTotalFigures}
                selectedPalette={selectedPalette}
                setSelectedPalette={setSelectedPalette}
                lockedPalette={lockedPalette}
                setLockedPalette={setLockedPalette}
                /> 
        </div>
    )
}