import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class DataRestApiService implements OnInit{
  url_statewise = 'https://api.corona-zahlen.org/states'
  url_germany ='https://api.corona-zahlen.org/germany'
  url_selectedstate = 'https://api.corona-zahlen.org/states'

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.getDataStateWise()
  }

  getDataStateWise(): Observable<any> {
    return this.http.get(this.url_statewise)
  }

  
  getSelectedStateData(id:string):Observable<any> {
    return this.http.get<any>(this.url_selectedstate + "/"+ id);  
  }

  getDataGermany(): Observable<any> {
    return this.http.get(this.url_germany)
  }

  getSelectedRegionDeathHistory(id:string, range:string):Observable<any> {
    return this.http.get<any>(this.url_selectedstate + "/"+ id + "/history/deaths/" + range);
  }

  getSelectedRegionRecoveryHistory(id:string, range:string):Observable<any> {
    return this.http.get<any>(this.url_selectedstate + "/"+ id + "/history/recovered/" + range);
  }

  getSelectedRegionCasesHistory(id:string, range:string):Observable<any> {
    return this.http.get<any>(this.url_selectedstate + "/"+ id + "/history/cases/" + range);
  }

  getData() {
    return this.http.get(`https://api.corona-zahlen.org/states`);
}


  
  
}


