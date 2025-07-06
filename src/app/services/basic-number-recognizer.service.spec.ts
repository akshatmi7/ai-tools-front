import { TestBed } from '@angular/core/testing';

import { BasicNumberRecognizerService } from './basic-number-recognizer.service';

describe('BasicNumberRecognizerService', () => {
  let service: BasicNumberRecognizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicNumberRecognizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
