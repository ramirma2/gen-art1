import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import canvasSketch from "canvas-sketch";
import random from "canvas-sketch-util/random";
import { lerp } from "canvas-sketch-util/math";


const Canvas = forwardRef(({margin, settings, points, palette, showGrid, totalFigures, renderSeed}, ref) => {

    const canvasRef = useRef(null);
    const managerRef = useRef(null);

    useEffect(() => {
    if (managerRef.current) {
        managerRef.current.render();
    }
    }, [renderSeed]);


    // Expose export function to parent component
    useImperativeHandle(ref, () => ({
        exportCanvas: async (options = {}) => {
            if (managerRef.current) {
                const defaultOptions = {
                    save: true,
                    prefix: 'generative-art',
                    ...options
                };
                // Use the current frame/render without triggering a new render
                await managerRef.current.exportFrame(defaultOptions);
            } else {
                console.warn('Canvas manager not ready for export');
            }
        }
    }), []); 

    useEffect(()=>{
        if (!canvasRef.current) return;        
        
        const sketch = () => {
            return ({ context, width, height }) => {
                try{
                    random.setSeed(renderSeed); //avoid rerendering
                    //Clear canvas
                    context.fillStyle = 'white';
                    context.fillRect(0, 0, width, height);
                    
                    //Draw grid points
                    points.forEach(point =>{
                        context.beginPath();
                        context.arc(point[0],point[1],5,0,Math.PI*2);
                        context.fillStyle = showGrid ? 'gray' : 'white';
                        context.fill();
                    })
    
                    //Generate Shapes
                    if(!points || points.length <2 || points.length < totalFigures ) {
                        console.warn('Not enough points to generate shapes');
                        return;
                    }
    
                    const used_points = new Set();
                    let attempts = 0;
                    const maxAttempts = totalFigures * 10; // Prevent infinite loops
                    
                    while (used_points.size < totalFigures * 2 && used_points.size < points.length && attempts < maxAttempts ) {
                        attempts++;
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

                      if (attempts >= maxAttempts) {
                        console.warn("Stopped early to prevent infinite loop");
                    }

                } catch (error) {
                    console.error('Error during sketch rendering:', error);
                }

            }
        }


        const sketchInstance = canvasSketch(sketch,{
            ...settings,
            canvas: canvasRef.current,});

        // Store the manager instance for exports
        sketchInstance.then((manager) => {
            managerRef.current = manager;
        });

        return () => sketchInstance.then((sketch) => sketch.unload()); // Cleanup on unmount

    },[settings, margin, points, totalFigures ]);



    return (
        <div className="canvas bg-white fill-white drop-shadow-lg col-start-2 rounded-md">
            <canvas id="canvas" 
            width="800" height="600"
            ref={canvasRef}
            className="mx-auto"
            />
        </div>
    );
})

export default Canvas;