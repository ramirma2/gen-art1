import { useRef, useEffect } from "react";
import canvasSketch from "canvas-sketch";
import random from "canvas-sketch-util/random";
import { lerp } from "canvas-sketch-util/math";


function Canvas({margin, settings, points, palette, showGrid, totalFigures, renderSeed}) {

    const canvasRef = useRef(null);

    useEffect(()=>{
        if (!canvasRef.current) return;
        
        
        const sketch = () => {
            
            return ({ context, width, height }) => {
                //Clear canvas
                context.fillStyle = 'white';
                context.fillRect(0, 0, width, height);
                
                //Draw grid points
                points.forEach(point =>{
                    context.beginPath();
                    context.arc(point[0],point[1],10,0,Math.PI*2);
                    context.fillStyle = showGrid ? 'gray' : 'white';
                    context.fill();
                })

                //Generate Shapes
                if(!points || points.length <2) return;

                const used_points = new Set();
                
                while (used_points.size < totalFigures * 2 && used_points.size < points.length) {
                    // console.log(used_points);
                    const [p1, p2] = random.shuffle(points).slice(0,2);
                    const key1 = `${p1[0]}, ${p1[1]}`;
                    const key2 = `${p2[0]}, ${p2[1]}`;

                    if (!used_points.has(key1) && !used_points.has(key2)) {
                        used_points.add(key1);
                        used_points.add(key2);
                        context.beginPath();
                        context.moveTo(p1[0],p1[1]);
                        context.lineTo(p2[0],p2[1]);
                        // console.log(p1,p2);
                        // console.log(points)
                        const [x3, y3] = [p2[0],lerp(margin, settings.dimensions[1] -margin, 1)];
                        context.lineTo(x3,y3);
                        const [x4, y4] = [p1[0],lerp(margin, settings.dimensions[1] -margin, 1)];
                        context.lineTo(x4,y4);
                        context.closePath();

                        //Apply fill style and opacity
                        context.fillStyle = random.pick(palette);
                        const opacity = random.value();
                        context.filter = `opacity(${opacity})`;
                        context.fill();
                    }
                }

            }
        }


        const sketchInstance = canvasSketch(sketch,{
            ...settings,
            canvas: canvasRef.current,});
        return () => sketchInstance.then((sketch) => sketch.unload()); // Cleanup on unmount

    },[settings, margin, points, totalFigures, renderSeed ]);




    return (
        <div className="canvas bg-white fill-white drop-shadow-lg col-start-2 rounded-md">
            <canvas id="canvas" 
            width="800" height="600"
            ref={canvasRef}
            className="mx-auto"
            />
        </div>
    );
}

export default Canvas;