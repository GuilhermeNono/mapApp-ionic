import { Component, ElementRef, ViewChild } from '@angular/core';

import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation, Position } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;

  constructor(){}

  //chama a função ao carregar a página
  ionViewWillEnter(){
    this.createMap();
  }


  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapsKey,
      config: {
        center: {
          lat:-15.528352, 
          lng: -53.990125,
        },
        zoom: 1
        ,
      },
    });
    this.buscarPosicao(); 
  }

  //metodo para pega a localização atual
  async buscarPosicao(){
    const coordinates = await Geolocation.getCurrentPosition();

  console.log('Current position:', coordinates);
  this.adicionarMarcador(coordinates);
  return coordinates;
  };

  //metodo que adiciona um marcador no mapa de acordo com a posicao
 async adicionarMarcador(coordinates: Position){
    // Add a marker to the map
const markerId = await this.newMap.addMarker({
  coordinate: {
    lat: coordinates.coords.latitude,
    lng: coordinates.coords.longitude
  },
});
this.zoomNoMarcador(coordinates)
  };

  //metodo que da zoom no marcador
  zoomNoMarcador(coordinates: Position){
    this.newMap.setCamera({
      coordinate: {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      },
      zoom: 15,
      animate: true
    })
  }
}
