import * as tf from '@tensorflow/tfjs';
import { ChangeDetectorRef, Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss'],
})
export class DrawComponent implements AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) {}
  recognizedNumber: number | string = '';

  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  result = '';
  private model!: tf.LayersModel;
  modelLoaded = false;

  async ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true })!;
    this.ctx.lineWidth = 15;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#fff';
    this.setupEvents();

    await tf.ready();
    await this.loadModel();
  }

  private setupEvents() {
    const canvas = this.canvas.nativeElement;
    canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
    canvas.addEventListener('mousemove', (e) => this.draw(e));
    canvas.addEventListener('mouseup', () => this.stopDrawing());
    canvas.addEventListener('mouseleave', () => this.stopDrawing());

    canvas.addEventListener('touchstart', (e) => this.startDrawing(e.touches[0]));
    canvas.addEventListener('touchmove', (e) => this.draw(e.touches[0]));
    canvas.addEventListener('touchend', () => this.stopDrawing());
  }

  private startDrawing(e: MouseEvent | Touch) {
    this.isDrawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(
      e.clientX - this.canvas.nativeElement.getBoundingClientRect().left,
      e.clientY - this.canvas.nativeElement.getBoundingClientRect().top
    );
  }

  private draw(e: MouseEvent | Touch) {
    if (!this.isDrawing) return;
    this.ctx.lineTo(
      e.clientX - this.canvas.nativeElement.getBoundingClientRect().left,
      e.clientY - this.canvas.nativeElement.getBoundingClientRect().top
    );
    this.ctx.stroke();
  }

  private stopDrawing() {
    this.isDrawing = false;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.result = '';
  }

  async loadModel() {
    try {
      this.model = await tf.loadLayersModel('/assets/model/model.json');
      this.modelLoaded = true;
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading model:', error);
      this.result = 'Failed to load the model. Check console for details.';
    }
  }

  async recognize() {
  if (!this.modelLoaded || !this.model) {
    this.result = 'Model not loaded yet. Please wait...';
    this.recognizedNumber = '';
    return;
  }

  const tensor = this.getImageTensorFromCanvas();
  const predictions = this.model.predict(tensor) as tf.Tensor;
  const predictedIndex = predictions.argMax(-1).dataSync()[0];

  this.result = `Recognized Number: ${predictedIndex}`;  // Optional: for debugging
  this.recognizedNumber = predictedIndex;                // ✅ This is for your HTML

  this.cdr.detectChanges();
}


  private getImageTensorFromCanvas() {
  const imgData = this.ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  return tf.tidy(() => {
    return tf.browser.fromPixels(imgData)
      .resizeBilinear([224, 224])   // Resize to 224x224
      .expandDims(0)                 // Add batch dimension → [1, 224, 224, 3]
      .toFloat()
      .div(255.0);                   // Normalize
  });
}


}
