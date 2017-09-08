import { Component, OnInit, Input } from '@angular/core';
import { Message } from './../appclass/message';
import { Dialog } from './../appclass/dialog';
import { Citizen } from './../appclass/citizen';
import { FullName } from './../appclass/fullname';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from './../appservice/dialog.service';
import { DialogComponent } from './../dialog/dialog.component';

@Component({
  selector: 'gruk-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [DialogService]
})
export class MessageComponent implements OnInit {
    @Input() dialogComponent: DialogComponent;
    @Input() message: Message;
    
    constructor(private router: Router, private dialogService: DialogService, private activatedRoute: ActivatedRoute) { }
    
    ngOnInit() {}
  
    toSender() {
        this.goto(this.message.sender.id);
    }
  
    toReceiver() {
        this.goto(this.message.receiver.id);
    }
      
    goto(id: number) {
        let mainId: any = this.activatedRoute.snapshot.params['me'];
        if (this.router.navigated === false) {
            this.router.navigateByUrl(`/user/${mainId}/${id}`);
        } else {
            this.router.navigateByUrl(`/home`).then(() => {
                this.router.navigateByUrl(`/user/${mainId}/${id}`);
            });
        }
    }
    
    deleteMsg() {
        this.dialogService.deleteMessage(this.message.id, this.dialogComponent.citizen.main.id).subscribe(resp => {
            this.dialogComponent.rerender();
        });
    }

}
