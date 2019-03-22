import { Component } from '@angular/core';
import { GridService } from 'src/app/Services/Grid.service';

@Component({
  selector: 'app-transaction-grid',
  templateUrl: './TransactionGrid.component.html',
  styleUrls: ['./TransactionGrid.component.css']
})
export class TransactionGridComponent {
  constructor(public gridService: GridService) {
  }
}
