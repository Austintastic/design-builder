import { useEffect, useState, useRef } from 'react'
import { 
  Box, 
  Container, 
  Paper, 
  ButtonGroup, 
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel 
} from '@mui/material'
import './App.css'

function App() {
  const [canvas, setCanvas] = useState(null)
  const [selectedFont, setSelectedFont] = useState('Avenir Roman')
  const canvasRef = useRef(null)

  // Add array of common fonts
  const fontOptions = [
    'Avenir Light',
    'Avenir Light Oblique',
    'Avenir Book',
    'Avenir Book Oblique',
    'Avenir Roman',
    'Avenir Oblique',
    'Avenir Medium',
    'Avenir Medium Oblique',
    'Avenir Heavy',
    'Avenir Heavy Oblique',
    'Avenir Black',
    'Avenir Black Oblique',
  ]

  // Handle font change
  const handleFontChange = (event) => {
    const newFont = event.target.value
    setSelectedFont(newFont)
    
    const activeObject = canvas.getActiveObject()
    if (activeObject && activeObject instanceof window.fabric.Textbox) {
      activeObject.set('fontFamily', newFont)
      canvas.renderAll()
    }
  }

  const addShape = (shapeType) => {
    if (!canvas) return

    let shape
    switch (shapeType) {
      case 'rectangle':
        shape = new window.fabric.Rect({
          left: 100,
          top: 100,
          fill: '#ff0000',
          width: 100,
          height: 100
        })
        break
      case 'circle':
        shape = new window.fabric.Circle({
          left: 100,
          top: 100,
          fill: '#00ff00',
          radius: 50
        })
        break
      case 'triangle':
        shape = new window.fabric.Triangle({
          left: 100,
          top: 100,
          fill: '#0000ff',
          width: 100,
          height: 100
        })
        break
      case 'text':
        shape = new window.fabric.Textbox('Lorem ipsum', {
          left: 100,
          top: 100,
          fill: '#000000',
          fontSize: 24,
          width: 200,
          editable: true,
          cursorColor: '#000000',
          fontFamily: selectedFont // Use the selected font
        })
        break
    }

    if (shape) {
      canvas.add(shape)
      canvas.setActiveObject(shape)
      if (shape instanceof window.fabric.Textbox) {
        shape.enterEditing()
        shape.selectAll()
      }
      canvas.renderAll()
    }
  }

  useEffect(() => {
    if (!canvasRef.current || !window.fabric) return

    const width = 3.5 * 300
    const height = 2 * 300

    const fabricCanvas = new window.fabric.Canvas(canvasRef.current, {
      width: width,
      height: height,
      backgroundColor: '#ffffff',
    })

    // Enable text editing on double click
    fabricCanvas.on('mouse:dblclick', (options) => {
      if (options.target && options.target instanceof window.fabric.Textbox) {
        options.target.enterEditing()
        options.target.selectAll()
      }
    })

    // Update selected font when selecting a text object
    fabricCanvas.on('selection:created', (options) => {
      if (options.selected[0] instanceof window.fabric.Textbox) {
        setSelectedFont(options.selected[0].fontFamily)
      }
    })

    fabricCanvas.on('selection:updated', (options) => {
      if (options.selected[0] instanceof window.fabric.Textbox) {
        setSelectedFont(options.selected[0].fontFamily)
      }
    })

    // Deselect on canvas click (outside objects)
    fabricCanvas.on('mouse:down', (options) => {
      if (!options.target) {
        fabricCanvas.discardActiveObject()
        fabricCanvas.renderAll()
      }
    })

    setCanvas(fabricCanvas)

    return () => {
      fabricCanvas.dispose()
    }
  }, [])

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        mt: 4, 
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
      }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          alignItems: 'center'
        }}>
          <ButtonGroup variant="contained" color="primary">
            <Button onClick={() => addShape('rectangle')}>Rectangle</Button>
            <Button onClick={() => addShape('circle')}>Circle</Button>
            <Button onClick={() => addShape('triangle')}>Triangle</Button>
            <Button onClick={() => addShape('text')}>Text</Button>
          </ButtonGroup>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="font-family-label">Font</InputLabel>
            <Select
              labelId="font-family-label"
              value={selectedFont}
              onChange={handleFontChange}
              label="Font"
            >
              {fontOptions.map((font) => (
                <MenuItem key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Paper 
          elevation={3} 
          sx={{ 
            p: 2,
            backgroundColor: '#f5f5f5',
          }}
        >
          <div className="canvas-container">
            <canvas ref={canvasRef} />
          </div>
        </Paper>
      </Box>
    </Container>
  )
}

export default App
