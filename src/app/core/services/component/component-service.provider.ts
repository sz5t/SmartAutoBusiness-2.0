import { Injectable, Inject } from '@angular/core';
import { ApiService } from '../api/api-service';
import { CacheService } from '@delon/cache';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { BSN_RELATIVE_MESSAGE_SENDER, BsnRelativesMessageModel, BSN_RELATIVE_MESSAGE_RECEIVER, BSN_RELATIVE_MESSAGE_BEHAVIOR_SENDER, BSN_RELATIVE_MESSAGE_BEHAVIOR_RECEIVER } from '@core/relations/bsn-relatives';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class ComponentServiceProvider {

    public apiService: ApiService;
    public cacheService: CacheService;
    public msgService: NzMessageService;
    public modalService: NzModalService;
    public activeRoute: ActivatedRoute;
    public commonRelationSender: Subject<BsnRelativesMessageModel>;
    public commonRelationReceiver: Subject<BsnRelativesMessageModel>;
    public behavoirRelationSender: BehaviorSubject<BsnRelativesMessageModel>;
    public behavoirRelationReceiver: BehaviorSubject<BsnRelativesMessageModel>;
    constructor(
        private _apiService: ApiService,
        public _cacheService: CacheService,
        public _msgService: NzMessageService,
        public _modalService: NzModalService,
        public _activeRoute: ActivatedRoute,
        @Inject(BSN_RELATIVE_MESSAGE_SENDER)
        public _commonRelationSender: Subject<BsnRelativesMessageModel>,
        @Inject(BSN_RELATIVE_MESSAGE_RECEIVER)
        public _commonRelationReceiver: Subject<BsnRelativesMessageModel>,
        @Inject(BSN_RELATIVE_MESSAGE_BEHAVIOR_SENDER)
        public _behavoirRelationSender: BehaviorSubject<BsnRelativesMessageModel>,
        @Inject(BSN_RELATIVE_MESSAGE_BEHAVIOR_RECEIVER)
        public _behavoirRelationReceiver: BehaviorSubject<BsnRelativesMessageModel>
    ) {
        this.apiService = _apiService;
        this.cacheService = _cacheService;
        this.msgService = _msgService;
        this.modalService = _modalService;
        this.activeRoute = _activeRoute;
        this.commonRelationReceiver = _commonRelationReceiver;
        this.commonRelationSender = _commonRelationSender;
        this.behavoirRelationReceiver = _behavoirRelationReceiver;
        this.behavoirRelationSender = _behavoirRelationSender;
    }
}