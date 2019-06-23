import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, tap, take } from 'rxjs/operators';

export class CrudService<T> {

  constructor(protected http: HttpClient, private API_URL) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return headers;
  }


  list() {
    return this.http.get<T[]>(this.API_URL)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  getComFiltros(filtros?) {
    return this.http.get<T[]>(this.API_URL, { params: filtros })
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  loadByID(id) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  create(record: T) {
    return this.http.post<any>(this.API_URL, record).pipe(take(1));
  }

  update(record: T) {
    return this.http.post<any>(`${this.API_URL}`, record).pipe(take(1));
  }

  remove(id: number) {
    return this.http.delete<any>(`${this.API_URL}/${id}`).pipe(take(1));
  }

}




