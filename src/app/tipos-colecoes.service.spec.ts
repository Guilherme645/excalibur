/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TiposColecoesService } from './tipos-colecoes.service';

describe('Service: TiposColecoes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiposColecoesService]
    });
  });

  it('should ...', inject([TiposColecoesService], (service: TiposColecoesService) => {
    expect(service).toBeTruthy();
  }));
});
