import { TestBed } from '@angular/core/testing';

import { MnistRecognizerService } from './mnist-recognizer.service';

describe('MnistRecognizerService', () => {
  let service: MnistRecognizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MnistRecognizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
