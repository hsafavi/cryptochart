/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {DataProviderService} from './dataProvider.service';


describe('Service: GetData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataProviderService]
    });
  });

  it('should ...', inject([DataProviderService], (service: DataProviderService) => {
    expect(service).toBeTruthy();
  }));
});
