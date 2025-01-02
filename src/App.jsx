import { useEffect, useState, useRef } from 'react'
import { Box, Container, Paper, ButtonGroup, Button } from '@mui/material'
import './App.css'

function App() {
  const [canvas, setCanvas] = useState(null)
  const canvasRef = useRef(null)

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
        shape = new window.fabric.Text('Hello World', {
          left: 100,
          top: 100,
          fill: '#000000',
          fontSize: 24
        })
        break
    }

    if (shape) {
      canvas.add(shape)
      canvas.setActiveObject(shape)
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
        <ButtonGroup variant="contained" color="primary">
          <Button onClick={() => addShape('rectangle')}>Rectangle</Button>
          <Button onClick={() => addShape('circle')}>Circle</Button>
          <Button onClick={() => addShape('triangle')}>Triangle</Button>
          <Button onClick={() => addShape('text')}>Text</Button>
        </ButtonGroup>

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
