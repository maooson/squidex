/*
 * Squidex Headless CMS
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {
    AccessTokenDto,
    AppContext,
    AppClientDto,
    AppClientsService,
    fadeAnimation,
    ModalView
} from 'shared';

const ESCAPE_KEY = 27;

@Component({
    selector: 'sqx-client',
    styleUrls: ['./client.component.scss'],
    templateUrl: './client.component.html',
    providers: [
        AppContext
    ],
    animations: [
        fadeAnimation
    ]
})
export class ClientComponent {
    @Output()
    public renaming = new EventEmitter<string>();

    @Output()
    public revoking = new EventEmitter();

    @Output()
    public updating = new EventEmitter<boolean>();

    @Input()
    public client: AppClientDto;

    public clientPermissions = [ 'Developer', 'Editor', 'Reader' ];

    public isRenaming = false;

    public token: AccessTokenDto;
    public tokenDialog = new ModalView();

    public renameForm =
        this.formBuilder.group({
            name: ['',
                Validators.required
            ]
        });

    public get hasNewName() {
        return this.renameForm.controls['name'].value !== this.client.name;
    }

    constructor(public readonly ctx: AppContext,
        private readonly appClientsService: AppClientsService,
        private readonly formBuilder: FormBuilder
    ) {
    }

    public cancelRename() {
        this.isRenaming = false;
    }

    public startRename() {
        this.renameForm.controls['name'].setValue(this.client.name);

        this.isRenaming = true;
    }

    public onKeyDown(keyCode: number) {
        if (keyCode === ESCAPE_KEY) {
            this.cancelRename();
        }
    }

    public createToken(client: AppClientDto) {
        this.appClientsService.createToken(this.ctx.appName, client)
            .subscribe(dto => {
                this.token = dto;
                this.tokenDialog.show();
            }, error => {
                this.ctx.notifyError(error);
            });
    }
}

