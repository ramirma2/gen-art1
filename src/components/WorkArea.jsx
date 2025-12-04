import { useEffect, useState } from "react";
import Canvas from "./Canvas";
import { useRandomPalette } from "../hooks/useRandomPalette";
import { lerp } from "canvas-sketch-util/math";
import Controls from './Controls'


export default function WorkArea() {

    const [dimensions, setDimesions] = useState([2048,2048]);
    const [ margin, setMargin ] = useState(400);
    const [points, setPoints ] = useState([]);
    const palette = useRandomPalette();
    const [showGrid, setShowGrid] = useState(false);
    const [totalFigures, setTotalFigures] = useState(10);
    const [gridSize, setGridSize] = useState([6,6]);
    

    useEffect(()=>{
        calculatePointsForGrid(gridSize[0],gridSize[1]);
    },[gridSize, margin]);

    const handleGridToggle = () => {
        setShowGrid(!showGrid);
    }

    const handleGridChange = (rows, cols) => {
        calculatePointsForGrid(rows,cols);
    }

    const handleGenerateNew = (gridSize, margin, totalFigures, randomizeColors) => {
        setMargin(margin);
        calculatePointsForGrid(gridSize[0],gridSize[1]);
        setTotalFigures(totalFigures);
        console.log("Generate new artwork");
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
            settings={{
                dimensions:dimensions,
                canvas:null
            }}
                points={points}
                totalFigures = {totalFigures}
                randomizeColors = {true}
                palette = {palette}/>
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
                setTotalFigures={setTotalFigures}/> 
        </div>
    )
}