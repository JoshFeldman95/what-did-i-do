# /api/answers

## GET

params:

- date: a date to get IDs for

returns:

- answerIDs: all the answer IDs for a given date as an array

## POST

params:

- date: the date of the new answers

returns:

- answerID: new ID

register a new answer and return the ID

## DELETE

params:

- date: the date of the new answers
- answerID: the answerID to delete

returns:

- answerID: the deleted ID

delete an answer with a given ID and return the ID

# /api/answer/text

## GET

params:

- answerID
- contentType: the type of the answer (either activity or commentary)

returns:

- text: the last saved text for this response

## PUT

params:

- answerID
- contentType: the type of the answer (either activity or commentary)
- text: the new text

updates the text in specified part of answer
