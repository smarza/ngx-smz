import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';
import { FileUpload } from 'primeng/fileupload';


@Component({
    selector: 'smz-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent extends BaseFormControlComponent
{
    @ViewChild(FileUpload) public fileUpload: FileUpload;
    @Output() public selectChange: EventEmitter<File[]> = new EventEmitter<File[]>();

    public files: File[] = [];

    public accept = 'image/*,application/pdf';
    constructor() { super(); }

    public onFileSelect(): void
    {
        this.files = this.fileUpload.files;
        this.selectChange.emit(this.files);
    }

    public clear(): void
    {
        this.fileUpload.clear();
        this.files = [];
        this.selectChange.emit([]);
    }

}
