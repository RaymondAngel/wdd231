# W02 Learning Activity: JSON

## Assignment file

`data/new_ward_members.json` contains one fictional new ward family, following the structure in the assignment's example solution. These are invented learning records, not Raymond's personal or real ward information. JSON belongs in the data subfolder; no site styling or JavaScript changes are needed for this activity.

The file includes every required field: family name, move-in date, number of people, bishopric-visit status, and an array of individual records with name, gender, and birthdate. Dates use YYYY-MM-DD strings because JSON has no native date type. Names and keys use double quotes, numbers and booleans are unquoted, and there are no comments or trailing commas.

## Identify the structure

Examples of key/value pairs and types in the new file:

| Key | Example value | JSON type |
| --- | --- | --- |
| family_name | "Parker" | string |
| move_in_date | "2026-09-01" | string |
| number_of_people | 4 | number |
| visited_by_bishopric | false | boolean |
| family_members | four individual member objects | array of objects |
| name | "Daniel Parker" | string |
| gender | "Male" | string |
| birthdate | "1989-05-15" | string |

The pasted preparation example also lists strings, numbers, booleans, and arrays of objects; its original example-file hyperlink was not included in the pasted text, so that external file could not be inspected.

## Verification

Validated locally using JavaScript JSON.parse(), a strict JSON parser. Checks cover all required keys and data types, a positive integer family count matching the array length, three properties per member, nonempty string values, and valid calendar dates. A JSON.stringify()/JSON.parse() round trip preserves the data.

No browser is connected, so the requested browser review remains pending. In VS Code Live Server, open `/data/new_ward_members.json` and confirm the formatted family data loads without a parsing error. A local strict parser fulfills the assignment's “another JSON validator/formatter” option without sending member records to an external service. No publishing or submission was performed.
