import { TestBed } from '@angular/core/testing';

import { DataRestApiService } from './data-rest-api.service';

describe('DataRestApiService', () => {
  let service: DataRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
