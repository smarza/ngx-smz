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

export const OPTIONS_STRING_DEPENDENCY: { id: string, name: string, data: string[] }[] = [
    {
        id: "1",
        name: "Red",
        data: ["Red 1", "Red 2", "Red 3"]
    },
    {
        id: "2",
        name: "Blue",
        data: ["Blue 1", "Blue 2", "Blue 3"]
    },
    {
        id: "3",
        name: "Green",
        data: ["Green 1", "Green 2", "Green 3"]
    },
]