import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root',
})
export class PersonalityService {
  private model!: tf.LayersModel;
  private modelLoaded = false;

  async loadModel() {
    try {
      this.model = await tf.loadLayersModel('/assets/personality-model/model.json');
      this.modelLoaded = true;
      console.log('Personality model loaded');
    } catch (error) {
      console.error('Failed to load personality model:', error);
    }
  }

  async predict(imgData: ImageData): Promise<string> {
    if (!this.modelLoaded) return 'Model not loaded';

    return tf.tidy(() => {
      const input = tf.browser.fromPixels(imgData)
        .resizeBilinear([224, 224])
        .expandDims(0)
        .toFloat()
        .div(255.0);

      const prediction = this.model.predict(input) as tf.Tensor;
      const scores = prediction.dataSync();
      console.log('Prediction scores:', scores);

      const index = prediction.argMax(-1).dataSync()[0];

      const categories = [
        'Calm Thinker', 'Bold Adventurer', 'Creative Soul', 'Energetic Explorer', 'Logical Planner',
        'Caring Friend', 'Focused Visionary', 'Playful Mind', 'Complex Problem Solver', 'Free Spirit'
      ];

      return `Personality Type: ${categories[index] ?? 'Unknown'}`;
    });
  }
}
