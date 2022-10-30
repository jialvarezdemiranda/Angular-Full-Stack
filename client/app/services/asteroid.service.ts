import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Asteroid } from '../shared/models/asteroid.model';

@Injectable()
export class AsteroidService {

  constructor(private http: HttpClient) { }

  getAsteroids(): Observable<Asteroid[]> {
    return this.http.get<Asteroid[]>('/api/asteroids');
  }

  countAsteroids(): Observable<number> {
    return this.http.get<number>('/api/asteroids/count');
  }

  addAsteroid(asteroid: Asteroid): Observable<Asteroid> {
    return this.http.post<Asteroid>('/api/asteroid', asteroid);
  }

  getAsteroid(day: number|undefined): Observable<Asteroid> {
    return this.http.get<Asteroid>(`/api/asteroid/${day}`);
  }

  editAsteroid(asteroid: Asteroid): Observable<any> {
    return this.http.put(`/api/asteroid/${asteroid.day}`, asteroid, { responseType: 'text' });
  }

  deleteAsteroid(asteroid: Asteroid): Observable<any> {
    return this.http.delete(`/api/asteroid/${asteroid.day}`, { responseType: 'text' });
  }

}
