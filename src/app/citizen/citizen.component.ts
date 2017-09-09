import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Response } from '@angular/http';
import { CitizenService } from './../appservice/citizen.service';
import { DialogService } from './../appservice/dialog.service';
import { SubscriptionService } from './../appservice/subscription.service';
import { Citizen } from './../appclass/citizen';
import { FullName } from './../appclass/fullname';
import { Dialog } from './../appclass/dialog';
import { Message } from './../appclass/message';
import { Subscription } from './../appclass/subscription';
import { StompService } from 'ng2-stomp-service';

@Component({
    selector: 'app-citizen',
    templateUrl: './citizen.component.html',
    styleUrls: ['./citizen.component.css'],
    providers: [CitizenService, DialogService, SubscriptionService]
})
export class CitizenComponent implements OnInit, OnDestroy {
    main: Citizen;
    citizen: Citizen;
    authorized: boolean;
    message: string;
    unredCount;
    isMsg: boolean;
    dialogShow: boolean;
    dialogs: Array<Dialog>;
    stompSub: any;
    subscriptions: Array<any>;
    checkSub: boolean;
    subscribed: Array<Citizen>;
    mysubShow: boolean;
    subscribers: Array<Citizen>;
    subShow: boolean;
    friendShow: boolean;
    friends: Array<Citizen>;

    constructor(private citizenService: CitizenService, private activatedRoute: ActivatedRoute, private stomp: StompService,
                private router: Router, private dialogService: DialogService, private subscriptionService: SubscriptionService) { 
            this.stomp.configure({
                host: 'http://localhost:8080/websocket',
                debug: true,
                queue: {'init':false}
            });
        }

    ngOnInit() {
        let params: any = this.activatedRoute.snapshot.params;
        this.citizenService.getCitizen(params.id).subscribe((response: Response) => {
            this.citizen = response.json().citizen;
            console.log("Citizen: " + this.citizen.id);
            let me = params['me'];
            if (me > 0) {
                this.citizenService.getCitizen(me).subscribe((response: Response) => {
                    this.main = response.json().citizen;
                    console.log("Main citizen: " + this.main.id);
                    if (this.main.id === this.citizen.id) this.authorized = true;
                    this.renderMsg();
                    this.openSocket();
                    this.updateSubscripts("not");
                });
            }
        });       
    }
    
    ngOnDestroy() {
        this. closeSocket();
    }
    
    openSocket() {
        this.stomp.startConnect().then(() => {
            this.stomp.done('init');
            console.log('connected');
            this.stompSub = this.stomp.subscribe('/queue/' + this.main.id, this.callback);
            this.router.events.subscribe(event => {
                if(event instanceof NavigationEnd) {
                    this.closeSocket();
                }
            });   
        });
    }
        
    closeSocket() {
        this.stompSub.unsubscribe();
        this.stomp.disconnect().then(() => {
            console.log('Connection closed')
        })
    }
    
    public callback = (data) => {
        console.log(data.key);
        if (data.key === "msg") {
            let visibles: Array<boolean> = [];
            let keys: string = '';
            let end = this.dialogs.length;
            for (var i = 0; i < end; i++) { 
                let visible: boolean = this.dialogs[i].visible;
                visibles.push(visible);
                if (visible === true) keys = keys + (keys !== '' ? '/' : '') + this.dialogs[i].pairKey
            }
            this.dialogService.getDialogs(this.main.id, keys).subscribe(resp => {
                this.dialogs = resp.json();
                this.unredCount = 0; 
                let len = this.dialogs.length;
                console.log(visibles);
                for (var i = 0; i < len; i++) {
                    this.unredCount = this.unredCount + this.dialogs[i].unredCount;
                    if (visibles[i] && visibles[i] === true) this.dialogs[i].visible = visibles[i];
                }
            });    
        } else if (data.key === "sub") {
            this.updateSubscripts("not");
        }
    }
    
    showMessage() {
        this.isMsg = !this.isMsg;
    }
    
    sendMessage() {
//        console.log(JSON.stringify(this.message, null, 4));
        this.citizenService.keyOf(this.citizen.id, this.main.id).subscribe(resp => {
            let msg: Message = new Message();
            msg.pairKey = resp.json().key;
            msg.sender = this.main;
            msg.receiver = this.citizen;
            msg.textContent = this.message;
            console.log(msg);
            this.dialogService.sendMessage(msg).subscribe(resp1 => {
                this.dialogService.getDialogs(this.main.id, '').subscribe(resp2 => {
                    this.dialogs = resp2.json();
                    this.message = '';
                    this.showMessage();
                });
            });
        });
    }
    
    dialogConvert() {
        if (this.main) {
            this.dialogShow = !this.dialogShow;
            this.renderMsg();
        }
    }
    
    reduce(count: number) {
        this.unredCount = this.unredCount - count;
    }
    
    renderMsg() {
        this.dialogService.getDialogs(this.main.id, '').subscribe(resp => {
            this.dialogs = resp.json();
            this.unredCount = 0;
            let len = this.dialogs.length;
            for (var i = 0; i < len; i++) {
                this.unredCount = this.unredCount + this.dialogs[i].unredCount;
            }
        });
    };
    
    updateSubscripts(param: string) {
        this.subscriptionService.subscriptionsOf(this.main.id).subscribe(resp => {
            this.subscriptions = resp.json();
            this.checkSub = false;
            this.subscribers = [];
            this.subscribed = [];
            console.log("PARAM: " + param);
            for(var i = 0; i < this.subscriptions.length; i++) { //, j = 0, k = 0
                let sub = this.subscriptions[i];
                if (sub.firstCitizen.id === this.main.id && sub.secondSubscriber === true) {
                    this.subscribers.push(sub.secondCitizen);
                } else if (sub.secondCitizen.id === this.main.id && sub.firstSubscriber === true) {
                    this.subscribers.push(sub.firstCitizen);
                } 
                if (sub.firstCitizen.id === this.main.id && sub.firstSubscriber === true) {
                    this.subscribed.push(sub.secondCitizen);
                    if (sub.secondCitizen.id === this.citizen.id) this.checkSub = true;
                } else if (sub.secondCitizen.id === this.main.id && sub.secondSubscriber === true) {
                    this.subscribed.push(sub.firstCitizen);
                    if (sub.firstCitizen.id === this.citizen.id) this.checkSub = true;
                }
            }
            if (param === "subscribed") {
                this.mysubShow = !this.mysubShow;
            } else if (param === "subscribers") {
                this.subShow = !this.subShow;
            }
        });
    }
    
    mysubConvert() {
        this.updateSubscripts("subscribed")
    }
    
    subConvert() {
        this.updateSubscripts("subscribers")
    }
    
    subscribeCitizen(on: boolean) {
        let subscript = null;
        let operation = "create";
        let len: number = this.subscriptions.length;
        for (var i = 0; i < len; i++) {
            let sub = this.subscriptions[i];
            if (sub.firstCitizen.id === this.citizen.id) {
                subscript = sub;
                subscript.secondSubscriber = on;
                if (on === true || subscript.firstSubscriber === true) {
                    operation = "update";
                } else {
                    operation = "delete";
                }
                break;
            }
            if (sub.secondCitizen.id === this.citizen.id) {
                subscript = sub;
                subscript.firstSubscriber = on;
                if (on === true || subscript.secondSubscriber === true) {
                    operation = "update";
                } else {
                    operation = "delete";
                }
                break;
            }
        }
        if (operation === "create") {
            let ids: number[] = [this.main.id, this.citizen.id];
            this.subscriptionService.createSubscript(ids).subscribe(resp => {
                console.log("NEW SUBSCRIPT: " + JSON.stringify(resp.json(), null, 4));
            }); 
        } else if (operation === "update") {
            this.subscriptionService.updateSubscript(subscript).subscribe(resp => {
                console.log("UPDATED SUBSCRIPT: " + JSON.stringify(resp.json(), null, 4));
            });
        } else if (operation === "delete") {
            this.subscriptionService.deleteSubscript(subscript).subscribe(resp => {
                console.log("DELETED SUBSCRIPT: " + resp);
            });
        }
    }
    
    friendConvert() {
        if (this.main) {
            this.friendShow = !this.friendShow;
            this.citizenService.searchFriends(this.main.id).subscribe(resp => {
                this.friends = resp.json();
            });
        }
    }
    
    toCitizen(id: number) { 
        if (this.router.navigated === false) {
            this.router.navigateByUrl(`/user/${this.main.id}/${id}`);
        } else {
            this.router.navigateByUrl(`/home`).then(() => {
                this.router.navigateByUrl(`/user/${this.main.id}/${id}`);
            });
        }
    }
    
    receiver(chat: Dialog): Citizen {
        let msg: Message = chat.dialog[0];
        if (msg) {
            if (msg.sender.id === this.main.id) {
                return msg.receiver;
            } else {
                return msg.sender;
            }
        } else {
            let receiver = new Citizen();
            receiver.citizenName = new FullName();
            return receiver;
        }
    }
    
    toCommunity() {
        this.router.navigateByUrl(`/community/${this.citizen.community.id}`);
    }

}
