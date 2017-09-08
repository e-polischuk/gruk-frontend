import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Dialog } from './../appclass/dialog';
import { Citizen } from './../appclass/citizen';
import { FullName } from './../appclass/fullname';
import { Message } from './../appclass/message';
import { DialogService } from './../appservice/dialog.service';
import { CitizenComponent } from './../citizen/citizen.component';

@Component({
  selector: 'gruk-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [DialogService]
})
export class DialogComponent implements OnInit, OnDestroy {
    @Input() chat: Dialog;
    @Input() receiver: Citizen;
    @Input() citizen: CitizenComponent;
//    visible: boolean;
    textContent: string;
    
    constructor (private dialogService: DialogService) {
    }
    
    ngOnInit() {}
    
    ngOnDestroy() {}
    
    convert() {
        let visible: boolean = !this.chat.visible;
        let red: boolean = (this.chat.holder === this.chat.dialog[this.chat.dialog.length-1].receiver.id);
        if (red === true) this.citizen.reduce(this.chat.unredCount);
        this.dialogService.getDialog(this.chat.pairKey, red , this.citizen.main.id).subscribe(resp => {
            this.chat = resp.json();
            this.chat.visible = visible;
            let len = this.citizen.dialogs.length;
            for (var i = 0; i < len; i++) {
                let key = this.citizen.dialogs[i].pairKey;
                if (this.chat.pairKey === key) {
                    this.citizen.dialogs[i] = this.chat;
                    break;
                }
            }
        });
    }
    
    rerender() {
        let visible = this.chat.visible;
        this.dialogService.getDialog(this.chat.pairKey, false, this.citizen.main.id).subscribe(resp => {
            this.chat = resp.json();
            this.chat.visible = visible;
            let len = this.citizen.dialogs.length;
            for (var i = 0; i < len; i++) {
                let key = this.citizen.dialogs[i].pairKey;
                if (this.chat.pairKey === key) {
                    this.citizen.dialogs[i] = this.chat;
                    break;
                }
            }
        });
    }
    
    send() {
        let msg: Message = new Message();
        let m: Message = this.chat.dialog[0];
        msg.pairKey = this.chat.pairKey;
        if (m.receiver.id === this.receiver.id) {
            msg.sender = m.sender;
            msg.receiver = m.receiver;
        } else {
            msg.sender = m.receiver;
            msg.receiver = m.sender;
        }
        msg.textContent = this.textContent;
        this.dialogService.sendMessage(msg).subscribe(resp => {
            this.chat.dialog.push(resp.json());
            this.textContent = '';
//            this.mail.embeddedFile = null;
        });
    }
}
