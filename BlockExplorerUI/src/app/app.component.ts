import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { GridService } from './Services/Grid.service';
import { httpFactory } from '@angular/http/src/http_module';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import * as socketIo from 'socket.io-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'Xels Blockchain Explorer';
  private _hubConnection: HubConnection;
  subs: any;
  subaaa: any;
  constructor(public gridService: GridService , private http: HttpClient ,  ) {

  }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }

}


