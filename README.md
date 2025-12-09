# gen-art1

A generative art tool that celebrates the beauty of randomness by creating unique geometric compositions. Every generation is a one-of-a-kind piece where figure placement, color selection, and opacity are determined by chance—embracing the unexpected.



## Features

- 🎨 **Dynamic Grid System**: Customize grid dimensions to create various geometric patterns
- 🎲 **Randomized Generation**: Generate unique art pieces with a single click
- 🔒 **Palette Locking**: Lock your favorite color palettes while generating new compositions
- 📐 **Adjustable Parameters**: Control margin, grid size, and number of figures
- 💾 **High-Resolution Export**: Download your creations as PNG files (2048x2048)
- 👁️ **Grid Visualization**: Toggle grid points on/off for precise control
- 🌈 **Curated Color Palettes**: Utilizes nice-color-palettes for beautiful color combinations

## How It Works

The application generates abstract geometric compositions by:
1. Creating a grid of points based on your specified dimensions
2. Randomly connecting pairs of grid points
3. Forming quadrilateral shapes that extend to the bottom of the canvas
4. Applying random colors and opacity from the selected palette
5. Layering shapes to create depth and visual interest

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/art-playground-w-ai.git

# Navigate to project directory
cd art-playground-w-ai

# Install dependencies
npm install
```

### Running the Project

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## Usage

### Controls

- **Show Grid**: Toggle visibility of grid points
- **Grid Size**: Adjust the number of rows and columns (e.g., 6x6)
- **Margin**: Set the padding around the canvas edges
- **Figures**: Control how many geometric shapes to generate
- **Colors**: View the current color palette
- **Lock/Unlock Palette**: Keep the same colors when regenerating
- **Regenerate**: Create a new composition with current settings
- **Download**: Export your artwork as a high-resolution PNG

### Tips for Best Results

- Start with a 6x6 or 8x8 grid for balanced compositions
- Use 10-20 figures for detailed but not overcrowded results
- Lock palettes you like and regenerate to explore variations
- Adjust margins to create breathing room or edge-to-edge designs
- Experiment with asymmetric grids (e.g., 4x8) for unique layouts

## Tech Stack

- **Frontend**: React 19
- **Canvas Libraries**: canvas-sketch
- **Styling**: Tailwind CSS, Material-UI
- **Utilities**: canvas-sketch-util, nice-color-palettes
- **Build Tool**: Vite
- **HTTP Client**: Axios


## Future Enhancements

- [ ] AI-powered palette suggestions based on mood/theme
- [ ] Animation/time-based compositions
- [ ] Additional shape types (circles, triangles, curves)
- [ ] SVG export option
- [ ] Gallery view to save and compare multiple generations
- [ ] Undo/redo functionality



---

Made with ❤️ and creative code