import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { DAEparams } from '../interfaces/DAEparams';

@Injectable({
  providedIn: 'root'
})
export class GetDAEByDistanceService {
  private baseUrl = environment.baseUrl;
  private apiUrl = 'api/DAE/GetDAEByDistance';

  constructor(private http: HttpClient) { }

  public getDAEByDistance(lat: number, lng: number, distance: number, status: string): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/${this.apiUrl}`,
      // body
      {
        "StartingPoint":
        {
            "Latitude": lat,
            "Longitude": lng
        },
        "Distance": distance,
        "Status": status
      },
      // options
      {
        headers: {
          "RequestSource": "Web"
        },
        /*
        headers: new HttpHeaders({
          "RequestSource": "Web" // o web?
        }),*/
        observe: "response"
      }
    )
  }
}
