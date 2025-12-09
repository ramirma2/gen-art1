import { useState } from 'react';
import GridOnIcon from '@mui/icons-material/GridOn';
import GridOffIcon from '@mui/icons-material/GridOff';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import PaletteIcon from '@mui/icons-material/Palette';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import DownloadIcon from '@mui/icons-material/Download';
import Palette from './Palette';



export default function Controls({
    gridVisible, 
    toggleGrid, 
    gridSize,
    setGridSize,
    margin,
    setMargin,
    totalFigures,
    setTotalFigures,
    selectedPalette,
    setSelectedPalette,
    handleGenerateNew,
    lockedPalette,
    setLockedPalette,
    handleDownload}){



    const handleGridToggle = () => {
        toggleGrid();
    }

    const generateNew = () => {       
        handleGenerateNew(gridSize, margin, totalFigures);
    }

    return(
        <div className=" h-auto controls  bg-white fill-white shadow-md flex flex-col flex-nowrap gap-4 items-center m-2 p-4 rounded-lg"
        role="complementary"
        aria-label=" Art gerenation controls">

            {/* Grid Display Toggle */}
            <div id="grid-display"
                className='flex flex-col items-center mb-1'>
                <label  className='sm:text-sm/6 text-left'
                        htmlFor="grid-toggle">Show Grid:</label>
                <button
                    id="grid-toggle"
                    onClick={handleGridToggle}
                    aria-label={gridVisible ? "Hide grid" : "Show grid"}
                    aria-pressed={gridVisible}
                    className=" rounded-full
                                transition-colors
                                focus:outline-none 
                                focus-visible:outline-none
                                outline-none
                                outline-offset-2 "> 
                    {gridVisible ? 
                    <GridOnIcon /> : 
                    <GridOffIcon />}
               </button>
            </div>

            {/* Grid Size */}   
            <div id="grid-size"
                className='flex flex-col  items-center gap-1 mb-2'>
                <label className='sm:text-sm/6 text-left '>Grid Size:</label>
                <div className='flex flex-row justify-center items-center gap-2'>
                    <div>
                        <label className='sr-only' htmlFor='grid-cols'>Grid Columns</label>
                        <input  id="grid-cols"
                                type='number'
                                min="2"
                                max="20"
                                aria-label="Number of grid columns"
                                onChange= {(e) => setGridSize([gridSize[0], parseInt(e.target.value)])}
                                value={gridSize[1]}
                                className=" w-10  py-.5 pl-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-200 rounded px-.5" />
                    </div>
                    <span aria-hidden="true"> x </span>
                    <div>
                        <label className='sr-only' htmlFor='grid-rows'>Grid Rows</label>
                        <input id="grid-rows"
                                type='number'
                                min="2"
                                max="20"
                                aria-label="Number of grid rows" 
                                onChange= {(e) => setGridSize([parseInt(e.target.value),gridSize[1]])}
                                value={gridSize[0]}
                                className=" w-10 py-.5 pl-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-200 rounded px-.5" />
                    </div> 
                </div>
            </div>


            {/* Margin */}
            <div id="margin"
                className='flex flex-col  items-center gap-1 mb-2'>
                <label htlmFor="margin-input" className='sm:text-sm/6 text-left'>Margin:</label>
                <input id="margin-input" 
                    type='number'
                    min="0"
                    max="1000"
                    aria-label="Canvas margin in pixels"
                    onChange= {((e) => setMargin(parseInt(e.target.value)))}
                    value={margin}
                    className = "w-14 py-.5 pl-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-200 rounded " />
            </div>

            {/* Total Shapes */}
            <div id="total-shapes"
                className='flex flex-col items-center gap-1 mb-2'
                aria-label="Total number of figures to generate">
            <label htmlFor="total-figures-input" className='sm:text-sm/6 text-center'>Figures:</label>
            <div>
                    <DashboardCustomizeIcon aria-hidden="true"/>
                    <input id="total-figures-input"
                            type='number'
                            value={totalFigures}
                            min="1"
                            max="50"
                            onChange= {((e) => setTotalFigures(parseInt(e.target.value)))}
                            className = "w-12 py-.5 pl-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-200 rounded" />
            </div>
            </div>

            {/* Color Palette */}
            <div id="color-palette"
                className='flex flex-col items-center mb-2'
                role="region"
                aria-label="Color palette controls">
                <p className='w-full sm:text-sm/6 text-center'>Colors:</p>
                <div className='flex gap-0.5'>
                        <button
                        onClick={() => setLockedPalette(!lockedPalette)}
                        aria-label={lockedPalette ? "Unlock palette (allow changes)" : "Lock palette (prevent changes)"}
                        aria-pressed={lockedPalette}
                        className="p-0 rounded-ss-sm transition-colors focus:outline-none">
                        {lockedPalette ? <LockOutlineIcon /> : <LockOpenIcon />}
                    </button>
                    
                    <div className="w-3/2 self-center" aria-label="Current color palette">
                        <Palette colors={selectedPalette} />
                    </div>
                </div>
            </div>

            {/* Regenerate */}
            <div id="regenerate" className="flex flex-col items-center gap-1">
                <label htmlFor="regenerate-btn" className="sm:text-sm/6 text-left">
                    Regenerate:
                </label>
                <button
                    id="regenerate-btn"
                    onClick={generateNew}
                    aria-label="Generate new artwork with current settings"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                >
                    <AutorenewIcon />
                </button>
            </div>

            {/* Download */}
            <div id="download-canvas" className="flex flex-col items-center gap-1 mb-2">
                <label htmlFor="download-btn" className="sm:text-sm/6 text-left">
                    Download:
                </label>
                <button
                    id="download-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDownload();
                    }}
                    aria-label="Download current artwork as PNG"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2"
                >
                    <DownloadIcon />
                </button>
                {/* <div className="flex gap-2">
                    <button 
                        onClick={() => handleDownload(".png")}
                        className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
                    >
                        PNG
                    </button>
                    <button 
                        onClick={() => handleDownload(".jpg")}
                        className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
                    >
                        JPG
                    </button> */}
                {/* </div> */}
            </div>
        </div>
    )
}