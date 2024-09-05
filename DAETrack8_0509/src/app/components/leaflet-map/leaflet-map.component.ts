import { Component, OnInit } from '@angular/core';
import { GetDAEByDistanceService } from '../../services/get-daeby-distance.service';
import { Map, latLng, tileLayer, MapOptions, Marker, MarkerOptions, Icon, IconOptions } from "leaflet";
import { environment } from '../../../environments/environment'; 
import { DaeCardComponent } from '../dae-card/dae-card.component';
import { DAEparams } from '../../interfaces/DAEparams';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [DaeCardComponent],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss'
})
export class LeafletMapComponent implements OnInit{
  map: Map | undefined;
  clickCount: number = 0;
  selectedDae: DAEparams | undefined; 
  selectedMarker!: HTMLElement; 
  previousMarker: HTMLElement | undefined; 

  constructor(private daeService: GetDAEByDistanceService){}

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

  options: MapOptions = {
    center: latLng(37.4922300, 15.0704100),
    zoom: 14
  };

  ngOnInit(): void {
    this.initMap();
  }

  private onMarkerClick(selectedDaeId: number, event: any): void {
    const DAEcard = document.querySelector('.dae-card') as HTMLElement;

    if(DAEcard){
      DAEcard.classList.remove('dae-card-hidden');
    }

    this.clickCount++;
    this.selectedDae = this.DAEList.find(d => d.id === selectedDaeId);

    if(this.previousMarker && this.clickCount > 1){
      // levare stile previousDae
      this.previousMarker.style.width = "45px";
      this.previousMarker.style.height = "35px";
      this.previousMarker.style.border = "none";
      this.previousMarker.style.borderRadius = "0";
    }

    this.selectedMarker = event.target.getElement();
    this.previousMarker = this.selectedMarker;
    
    if(this.selectedMarker){
      this.selectedMarker.style.width = "60px";
      this.selectedMarker.style.height = "auto";
      this.selectedMarker.style.border = "4px solid #0A9BD8";
      this.selectedMarker.style.borderRadius = "12px";
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
    this.map.locate({setView: true, maxZoom: 15});
    const key = environment.apiKey;
    
    const zoomControl = this.map.zoomControl;
    zoomControl.setPosition('bottomright');
    this.changeZoomStyle();

    const userLat = this.map.getCenter().lat;
    const userLng = this.map.getCenter().lng;

    // API request
    this.daeService.getDAEByDistance(userLat, userLng, 2000, "ACTIVE").subscribe((response: any) => {
      console.log(response);
    });

    // Markers
    this.DAEList.forEach(element => {
      let elementIconUrl: string = '';
      
      switch(element.status){
        case 'OK':
          elementIconUrl = 'assets/icons/DAEpin-green.png';
          break;

        case 'YELLOW':
          elementIconUrl = 'assets/icons/DAEpin-yellow.png';
          break;

        case 'RED':
          elementIconUrl = 'assets/icons/DAEpin-red.png';
          break;
      }

      // Icon
      let leafIcon = new Icon({
        iconUrl: elementIconUrl,
        iconSize: [45, 35]
      });

      let marker = new Marker([element.latitude, element.langitude], {icon: leafIcon}).addTo(this.map!);
      marker.addEventListener("click", (event) => this.onMarkerClick(element.id, event));
    });

    tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`, {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
      crossOrigin: true
    }).addTo(this.map!);
  }
}
