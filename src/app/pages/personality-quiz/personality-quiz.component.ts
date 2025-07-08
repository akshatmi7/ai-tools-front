import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PersonalityService } from '../../services/personality.service';

@Component({
  selector: 'app-personality-quiz',
  templateUrl: './personality-quiz.component.html',
  styleUrls: ['./personality-quiz.component.scss'],
})
export class PersonalityQuizComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  result = '';
  loading = false;

  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;

  constructor(private personalityService: PersonalityService) {}

  async ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true })!;
    this.clearCanvas();

    await this.personalityService.loadModel();

    const screenWidth = window.innerWidth;
    this.ctx.lineWidth = screenWidth < 480 ? 8 : screenWidth < 768 ? 6 : 4;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#fff';

    this.setupDrawingEvents();
  }

  private setupDrawingEvents() {
    const canvasEl = this.canvas.nativeElement;
    canvasEl.addEventListener('mousedown', e => this.startDrawing(e));
    canvasEl.addEventListener('mousemove', e => this.draw(e));
    canvasEl.addEventListener('mouseup', () => this.stopDrawing());
    canvasEl.addEventListener('mouseleave', () => this.stopDrawing());
    canvasEl.addEventListener('touchstart', e => this.startDrawing(e.touches[0]));
    canvasEl.addEventListener('touchmove', e => this.draw(e.touches[0]));
    canvasEl.addEventListener('touchend', () => this.stopDrawing());
  }

  private getCanvasPos(e: MouseEvent | Touch) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const scaleX = this.canvas.nativeElement.width / rect.width;
    const scaleY = this.canvas.nativeElement.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  private startDrawing(e: MouseEvent | Touch) {
    this.isDrawing = true;
    this.ctx.beginPath();
    const pos = this.getCanvasPos(e);
    this.ctx.moveTo(pos.x, pos.y);
  }

  private draw(e: MouseEvent | Touch) {
    if (!this.isDrawing) return;
    const pos = this.getCanvasPos(e);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  private stopDrawing() {
    this.isDrawing = false;
    this.playCompleteAnimation();
  }

  private playCompleteAnimation() {
    const canvasEl = this.canvas.nativeElement;
    canvasEl.classList.add('drawing-complete');
    setTimeout(() => canvasEl.classList.remove('drawing-complete'), 600);
  }

  clearCanvas() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.result = '';
  }

  async predictPersonality() {
    this.loading = true;
    const imgData = this.ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    const prediction = await this.personalityService.predict(imgData);
    this.result = `🎯 You seem to be a <strong>${prediction}</strong>!`;
    this.loading = false;
  }
}
