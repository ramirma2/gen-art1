
const Palette = ({colors}) => {
    return (
        <div
            id="color-palette" className="flex flex-nowrap items-baseline">
            {colors.map((color, index) => (
                <div key={index} 
                    className="w-5 h-5 mr-0 border-0 border-gray-300 "
                    style={{backgroundColor: color}}>

                </div>
            ))}
        </div>
    )
}

export default Palette;