import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicNumberRecognizerService {

  recognize(imageData: ImageData): string {
    const totalBrightness = this.calculateBrightness(imageData);
    // Mock logic: brightness ranges (this is just an example, replace with ML later)
    if (totalBrightness > 8000000 && totalBrightness < 15000000) return 'Predicted Number: 1';
    else if (totalBrightness > 15000000 && totalBrightness < 25000000) return 'Predicted Number: 7';
    else if (totalBrightness > 25000000) return 'Predicted Number: 8';
    else return 'Unrecognized Shape';
  }

  private calculateBrightness(data: ImageData): number {
    let brightness = 0;
    for (let i = 0; i < data.data.length; i += 4) {
      brightness += data.data[i] + data.data[i + 1] + data.data[i + 2];
    }
    return brightness;
  }
}
