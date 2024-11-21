import { TestBed } from '@angular/core/testing';

import { HomeHeaderService } from './home-header.service';

describe('HomeHeaderService', () => {
  let service: HomeHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
