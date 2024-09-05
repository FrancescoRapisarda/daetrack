import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DAEparams } from '../../interfaces/DAEparams';

@Component({
  selector: 'app-dae-card',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './dae-card.component.html',
  styleUrl: './dae-card.component.scss'
})
export class DaeCardComponent {
  @Input() data!: DAEparams; 
  @Input() selectedMarker!: HTMLElement;

  DAEList: DAEparams[] = [
    {
      id: 1,
      brand: 'brand1',
      model: 'AB123-S',
      codeNumber: '123456',
      address: 'Via Esempio Esempio 156',
      positionDescription: 'Esterno',
      latitude: 37.4922300,
      langitude: 15.0704100,
      status: 'OK',
      lastMaintenance: '17/07/2024',
      nextMaintenance: '17/07/2027',
      notes: 'note note note note note note note note note note note note note note note note note note note note note note note note note note note note note note note note note note notenote note '
    },

    {
      id: 2,
      brand: 'brand2',
      model: 'CD345-S',
      codeNumber: '789102',
      address: 'Via Esempio2 156',
      positionDescription: 'Esterno',
      latitude: 37.5639,
      langitude: 15.1614,
      status: 'YELLOW',
      lastMaintenance: '17/07/2024',
      nextMaintenance: '17/07/2027',
      notes: 'note note note'
    },

    {
      id: 3,
      brand: 'brand3',
      model: 'EF678-S',
      codeNumber: '345678',
      address: 'Via Esempio3 156',
      positionDescription: 'Esterno',
      latitude: 37.557089,
      langitude: 15.133226,
      status: 'RED',
      lastMaintenance: '17/07/2024',
      nextMaintenance: '17/07/2027',
      notes: 'note note note'
    }
  ]

  closeCard(){
    const DAEcard = document.querySelector('.dae-card') as HTMLElement;
    DAEcard.classList.add('dae-card-hidden');

    // The marker returns to it's original style
    this.selectedMarker.style.width = "45px";
    this.selectedMarker.style.height = "35px";
    this.selectedMarker.style.border = "none";
    this.selectedMarker.style.borderRadius = "0";
  }
}