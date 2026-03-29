using { my.school as db } from '../db/schema';

annotate db.Students with @(

    // List Report Columns
    UI: {LineItem: [
    {
        Value: firstName,
        Label: 'First Name'
    },
    {
        Value: lastName,
        Label: 'Last Name'
    },
    {
        Value: email,
        Label: 'Email'
    },
    {
        Value: age,
        Label: 'Age'
    }
],

 SelectionFields  : [
    firstName,
    email
]
    
    
});
