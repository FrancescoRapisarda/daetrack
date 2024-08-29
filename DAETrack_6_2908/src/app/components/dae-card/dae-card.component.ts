import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DAEparams } from '../../interfaces/DAEparams';
import { markerParams } from '../../interfaces/markerParams';

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

  dae: DAEparams[] = [
    {
      id: 123456,
      model: 'AB123-S',
      address: 'Via Esempio Esempio 156',
      site: 'Esterno',
      status: 'OK',
      last_maintenance: '17/07/2024',
      next_maintenance: '17/07/2027',
      notes: 'note note note'
    },

    {
      id: 789102,
      model: 'CD345-S',
      address: 'Via Esempio2 156',
      site: 'Esterno',
      status: 'YELLOW',
      last_maintenance: '17/07/2024',
      next_maintenance: '17/07/2027',
      notes: 'note note note'
    }
  ];

  markers: markerParams[] = [
    {
      id: 123456,
      latitude: 37.4922300,
      langitude: 15.0704100
    },

    {
      id: 789102,
      latitude: 37.5639,
      langitude: 15.1614
    }
  ];

  closeCard(){
    const DAEcard = document.querySelector('.dae-card') as HTMLElement;
    DAEcard.classList.add('dae-card-hidden');

    // The marker returns to it's original style
    this.selectedMarker.style.width = "35px";
    this.selectedMarker.style.height = "35px";
    this.selectedMarker.style.border = "none";
  }
}