import { TestBed } from '@angular/core/testing';

import { CardRouterListenerService } from './card-router-listener.service';

describe('CardRouterListenerService', () => {
  let service: CardRouterListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardRouterListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
