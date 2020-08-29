import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { FileUpload } from 'primeng/fileupload';
import { SmzFormsControl } from '../../models/controls';
import { SmzFileControl } from '../../models/control-types';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'smz-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent extends BaseFormControlComponent
{
    @ViewChild(FileUpload) public fileUpload: FileUpload;
    @Input() public input: SmzFormsControl<SmzFileControl>;
    @Input() public form: FormGroup;
    @Output() public selectChange: EventEmitter<File[]> = new EventEmitter<File[]>();

    public files: File[] = [];

    public accept = 'image/*,application/pdf';
    constructor() { super(); }

    public onFileSelect(): void
    {
        this.files = this.fileUpload.files;
        this.onFileChange(this.files);
    }

    public clear(): void
    {
        this.fileUpload.clear();
        this.files = [];
        this.selectChange.emit([]);
    }

    public onFileChange(event: File[]): void
    {
        if (event.length > 0)
        {
            const file = event[0];

            this.input._file = file;
            this.input['hasFile'] = file.name;
            this.form.controls[this.input.name].setValue(file);
        }
        else
        {
            this.input['hasFile'] = null;
            this.form.controls[this.input.name].setValue(null);
        }
    }

}
