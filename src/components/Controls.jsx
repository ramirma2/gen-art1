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
        <div className=" h-auto controls  bg-white fill-white shadow-md flex flex-col flex-nowrap gap-4 items-center m-2 p-4 rounded-lg">

            <div id="grid-display">
               {gridVisible ? 
               <GridOnIcon onClick={handleGridToggle}/> : 
               <GridOffIcon onClick={handleGridToggle}/>}

            </div>

            <div id="grid-size"
            className='flex flex-col  items-center gap-2'>
                <p className='sm:text-sm/6 text-left'>Grid Size:</p>
                <div className='flex flex-row justify-center items-center gap-2'>
                    <div>
                        <input type='number' 
                                onChange= {(e) => setGridSize([parseInt(e.target.value),gridSize[1]])}
                                value={gridSize[0]}
                                className=" w-10 py-.5 pl-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-200 rounded px-.5" />
                    </div> 
                    <span> x </span>
                    <div>
                        <input type='number'
                                onChange= {(e) => setGridSize([gridSize[0], parseInt(e.target.value)])}
                                value={gridSize[1]}
                                className=" w-10  py-.5 pl-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-200 rounded px-.5" />
                    </div>

                </div>
            </div>
            <div id="margin">
                <p className='sm:text-sm/6 text-left'>Margin:</p>
                <input type='number'
                    onChange= {((e) => setMargin(parseInt(e.target.value)))}
                    value={margin}
                    className = "w-12 py-.5 pl-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-200 rounded " />
            </div>
            <div id="total-shapes">
            <p className='sm:text-sm/6 text-left'>Figures:</p>
                <DashboardCustomizeIcon />
                <input type='number'
                        value={totalFigures}
                        onChange= {((e) => setTotalFigures(parseInt(e.target.value)))}
                        className = "w-12 py-.5 pl-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-gray-200 rounded" />
            </div>
            <div id="color-palette"
                className='flex flex-wrap gap-1 items-center'>
                <p className='w-full sm:text-sm/6 text-center'>Colors:</p>
                {lockedPalette ? 
                <LockOutlineIcon
                    className='w-1/2'
                    onClick={()=> {
                        setLockedPalette(!lockedPalette)}}
                    /> :
                <LockOpenIcon
                    className='w-1/2' 
                    onClick={()=> {
                        setLockedPalette(!lockedPalette)}}
                    />}
                
                    <Palette 
                        colors={selectedPalette}
                        className='w-1/2'/>
            </div>
            <div id="regenerate">
                <p className='sm:text-sm/6 text-left'>Regenerate:</p>
                <AutorenewIcon 
                onClick={generateNew}/>
            </div>
            <div id="download-canvas">
                <p className='sm:text-sm/6 text-left'>Download:</p>
                <DownloadIcon 
                    onClick={(e)=> {
                        e.preventDefault(); // Prevent any default behavior
                        e.stopPropagation(); // Stop event bubbling
                        console.log('Download icon clicked');
                        handleDownload();
                    }}/>
            </div>
        </div>
    )
}