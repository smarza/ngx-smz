import { Injectable } from '@angular/core';
import { SimpleNamedEntity } from 'projects/ngx-smz/src/lib/common/models/simple-named-entity';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  public getPeople(): SimpleNamedEntity[]
  {
      return [
        { id: '5ea41bb07bca51fe9846afa2', name: 'Meredith Olsen' },
        { id: '5ea41bb0ac29c48310c5759f', name: 'Brandy Bryan' },
        { id: '5ea41bb0045fd29fdb911e7c', name: 'Livingston Melendez' },
        { id: '5ea41bb0f849138226795789', name: 'Janis Hickman' },
        { id: '5ea41bb0cdbf21cf2f3d73d0', name: 'Marquita Trujillo' },
        { id: '5ea41bb0d86c2cc3f170ae6f', name: 'Brown Stein' },
        { id: '5ea41bb01a217b47bc2b148e', name: 'Ramirez Levine' },
        { id: '5ea41bb096db88ccdc700638', name: 'Camacho Ramsey'},
        { id: '5ea41bb0e3f2a34b45721f22', name: 'Mollie Mendez' }
      ];
  }
}
