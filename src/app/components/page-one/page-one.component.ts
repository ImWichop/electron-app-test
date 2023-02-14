import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpcRenderService } from 'src/app/services/ipc-render.service';

@Component({
  selector: 'app-page-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss']
})
export class PageOneComponent implements OnInit, AfterViewInit {
  text = 'Initial text'
  ipcRenderService = inject(IpcRenderService)

  ngOnInit(): void {
    this.listenReply()
  }

  ngAfterViewInit(): void {
    this.ipcRenderService.send('checkingForUpdates', '');
  }

  listenReply(): void{
    if (!this.ipcRenderService.isElectron()) {
      return;
    }
    this.ipcRenderService
      .on('onUpdates').subscribe({
        next: (res) => {
          console.log(res);
          this.text = res
        }
      })
  };
}
