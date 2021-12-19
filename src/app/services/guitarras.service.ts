import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH_MICROSERVICE_GUITARRAS } from 'src/environments/environment';
import { IGuitarra } from '../models/guitarras';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuitarrasService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getGuitarras(): Observable<IGuitarra[]> {
    //Usando promise em vez de observable
    return this.httpClient.get<IGuitarra[]>(`${API_PATH_MICROSERVICE_GUITARRAS}`).pipe(
      tap(()=> console.log("Get todos registros!"))
    );
  }

  getGuitarById(id: number): Observable<IGuitarra> {
    return this.httpClient.get<IGuitarra>(`${API_PATH_MICROSERVICE_GUITARRAS}/${id}`).pipe();
  }

  postGuitar(newGuitar: IGuitarra): Observable<IGuitarra> {
    return this.httpClient.post<IGuitarra>(`${API_PATH_MICROSERVICE_GUITARRAS}`, newGuitar).pipe(
      take(1)
    );
  }

  putGuitar(guitarPut: IGuitarra): Observable<IGuitarra> {
    return this.httpClient.put<IGuitarra>(`${API_PATH_MICROSERVICE_GUITARRAS}/${guitarPut.id}`, guitarPut).pipe(
      take(1)
    ); 
  }

  deleteGuitarById(idSelected: number) {
    return this.httpClient.delete(`${API_PATH_MICROSERVICE_GUITARRAS}/${idSelected}`).pipe(
      //take(1),
      tap(()=> console.log(`Deletado! nivel service: ${idSelected}`))
    ); 
  }

}
