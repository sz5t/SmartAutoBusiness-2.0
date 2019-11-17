import { BSN_RELATION_SUBJECT, BSN_RELATION_TRIGGER } from './../../relations/bsn-relatives';
import { Injectable, Inject } from '@angular/core';
import { ApiService } from '../api/api-service';
import { CacheService } from '@delon/cache';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { BsnRelativesMessageModel } from '@core/relations/bsn-relatives';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class ComponentServiceProvider {

    public com=[];
    public apiService: ApiService;
    public cacheService: CacheService;
    public msgService: NzMessageService;
    public modalService: NzModalService;
    public activeRoute: ActivatedRoute;
    public commonRelationSubject: BehaviorSubject<BsnRelativesMessageModel>;
    public commonRelationTrigger: BehaviorSubject<BsnRelativesMessageModel>;
    constructor(
        private _apiService: ApiService,
        private _cacheService: CacheService,
        private _msgService: NzMessageService,
        private _modalService: NzModalService,
        private _activeRoute: ActivatedRoute,
        @Inject(BSN_RELATION_SUBJECT)
        private _commonRelationSubject: BehaviorSubject<BsnRelativesMessageModel>,
        @Inject(BSN_RELATION_TRIGGER)
        private _commonRelationTrigger: BehaviorSubject<BsnRelativesMessageModel>
    ) {
        this.apiService = _apiService;
        this.cacheService = _cacheService;
        this.msgService = _msgService;
        this.modalService = _modalService;
        this.activeRoute = _activeRoute;
        this.commonRelationSubject = _commonRelationSubject;
        this.commonRelationTrigger = _commonRelationTrigger;
    }
}