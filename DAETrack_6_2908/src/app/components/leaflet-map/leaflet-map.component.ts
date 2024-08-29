import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, MapOptions, Marker, MarkerOptions, Icon, IconOptions } from "leaflet";
import { environment } from '../../../environments/environment'; 
import { DaeCardComponent } from '../dae-card/dae-card.component';
import { DAEparams } from '../../interfaces/DAEparams';
import { markerParams } from '../../interfaces/markerParams';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [DaeCardComponent],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss'
})
export class LeafletMapComponent implements OnInit{
  map: Map | undefined;
  selectedDae: DAEparams | undefined;
  clickCount: number = 0;
  selectedMarker!: HTMLElement;
  previousMarker: HTMLElement | undefined;

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

  options: MapOptions = {
    center: latLng(37.4922300, 15.0704100),
    zoom: 14,
  };

  /*
  iconOptions: IconOptions = {
    iconUrl: 'assets/icons/DAEpin-green.png',
    iconSize: [50, 50]
  }*/

  ngOnInit(): void {
    this.initMap();
  }

  private onMarkerClick(selectedDaeId: number, event: any): void {
    this.clickCount++;
    const DAEcard = document.querySelector('.dae-card') as HTMLElement;

    //const selectedMarker = this.markers.find(d => d.id === selectedDaeId);
    //setIcon Marker
    this.selectedDae = this.dae.find(d => d.id === selectedDaeId);

    if(this.previousMarker && this.clickCount > 1){
      // levare stile previousDae
      this.previousMarker.style.width = "35px";
      this.previousMarker.style.height = "35px";
      this.previousMarker.style.border = "none";
    }

    console.log(event.target.getElement());
    this.selectedMarker = event.target.getElement();
    this.previousMarker = this.selectedMarker;
    
    if(this.selectedMarker){
      this.selectedMarker.style.width = "50px";
      this.selectedMarker.style.height = "50px";
      this.selectedMarker.style.border = "4px solid #0A9BD8";
      this.selectedMarker.style.borderRadius = "35%";
    }

    if(DAEcard){
      DAEcard.classList.remove('dae-card-hidden');
    }
  }

  private changeZoomStyle(): void {
    const zoomInButton = document.querySelector('.leaflet-control-zoom-in') as HTMLElement;
    const zoomOutButton = document.querySelector('.leaflet-control-zoom-out') as HTMLElement;
    zoomInButton.style.color = '#0A9BD8';
    zoomOutButton.style.color = '#0A9BD8';
  }
  
  private initMap(): void {
    this.map = new Map('map', this.options);
    const key = environment.apiKey;
    
    const zoomControl = this.map.zoomControl;
    zoomControl.setPosition('bottomright');

    this.changeZoomStyle();

    // Markers
    this.markers.forEach(element => {
      let currentDae = this.dae.find(d => d.id === element.id);
      let currentIconUrl: string = '';
      
      switch(currentDae?.status){
        case 'OK':
          currentIconUrl = 'assets/icons/DAEpin-green.png';
          break;

        case 'YELLOW':
          currentIconUrl = 'assets/icons/DAEpin-yellow.png';
          break;

        case 'RED':
          currentIconUrl = 'assets/icons/DAEpin-red.png';
          break;
      }

      // Icon
      let leafIcon = new Icon({
        iconUrl: currentIconUrl,
        iconSize: [35, 35]
      });

      let marker = new Marker([element.latitude, element.langitude], {icon: leafIcon}).addTo(this.map!);
      marker.addEventListener("click", (event) => this.onMarkerClick(element.id, event));
    });

    tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`, {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      attribution: '',
      crossOrigin: true
    }).addTo(this.map!);
  }
}
