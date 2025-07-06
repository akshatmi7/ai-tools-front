import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class MnistRecognizerService {
  private model!: tf.LayersModel;
  private modelLoaded = false;

  async loadModel() {
    if (!this.modelLoaded) {
      this.model = await tf.loadLayersModel(
        'https://storage.googleapis.com/tfjs-models/tfjs/mnist_transfer_cnn_v1/model.json'
      );
      this.modelLoaded = true;
    }
  }

  async predictFromImageData(imageData: ImageData): Promise<number | null> {
    await this.loadModel();
    const tensor = tf.browser.fromPixels(imageData, 1)
      .resizeNearestNeighbor([28, 28])
      .toFloat()
      .div(255)
      .expandDims(0);

    const output = (this.model.predict(tensor) as tf.Tensor);
    const values = await output.data();
    const maxIndex = values.indexOf(Math.max(...values));
    return maxIndex;  // 0–9
  }
}
