import { SimpleEntity } from 'ngx-smz-dialogs';

export const OPTIONS_BOOLEAN: SimpleEntity<boolean>[] = [
    { id: false, name: 'No' },
    { id: true, name: 'Yes' },
];

export const OPTIONS_STRING: SimpleEntity<string>[] = [
    { id: '1', name: 'Red' },
    { id: '2', name: 'Blue' },
    { id: '3', name: 'Green' },
];
