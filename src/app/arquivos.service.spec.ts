/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArquivosService } from './arquivos.service';

describe('Service: Arquivos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArquivosService]
    });
  });

  it('should ...', inject([ArquivosService], (service: ArquivosService) => {
    expect(service).toBeTruthy();
  }));
});
