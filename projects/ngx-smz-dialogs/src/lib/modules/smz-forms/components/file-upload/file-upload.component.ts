import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { FileUpload } from 'primeng/fileupload';
import { SmzFileControl } from '../../models/control-types';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'smz-file-upload',
    templateUrl: './file-upload.component.html',
})
export class FileUploadComponent extends BaseFormControlComponent
{
    @ViewChild(FileUpload) public fileUpload: FileUpload;
    @Input() public input: SmzFileControl;
    @Input() public form: FormGroup;
    @Output() public selectChange: EventEmitter<File[]> = new EventEmitter<File[]>();

    public files: File[] = [];
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
        this.input._file = null;
        this.input._fileName = null;
        this.input._base64 = null;
        this.selectChange.emit([]);
        this.form.controls[this.input.propertyName].setValue(null);
    }

    public onFileChange(event: File[]): void
    {
        if (event.length > 0)
        {
            const file = event[0];

            const reader = new FileReader();

            reader.onload = (event: ProgressEvent<FileReader>): void => {
                this.input._base64 = event.target.result as string
            };

            reader.readAsDataURL(file);

            this.input._file = file;
            this.input._fileName = file.name;
            this.input['hasFile'] = file.name;
            this.form.controls[this.input.propertyName].setValue(file);
        }
        else
        {
            this.input['hasFile'] = null;
            this.input._file = null;
            this.input._fileName = null;
            this.input._base64 = null;
            this.form.controls[this.input.propertyName].setValue(null);
        }
    }

}
