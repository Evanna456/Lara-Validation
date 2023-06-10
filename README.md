## lara-validationjs

Laravel Validation but in Javascript

## Usage

Installation
CDN: <script src="https://cdn.jsdelivr.net/gh/Evanna456/lara-validationjs@main/validator.js">

Supported Rule:

required, integer, number, min, max, email, regex, mimes
	
Basic Usage:
```js
const _validator = new Validator();
        var data = {
          name: $('#name').val(),
          email: $('#email').val(),
          username: $('#username').val()
        };
        _validator.make(data, {
          name: "required|min:3|max:20",
          username: "required|alphanum",
          email: "required|email"
        });
        if (_validator.fails()) {
          console.log(_validator.first().error);
          return;
        }
```
Custom Message:
	
<p>:attribute => name of the input</p>
<p>:rule => value of the input for example :min, :max</p>

```js
const _validator = new Validator();
        var data = {
          name: $('#name').val(),
          email: $('#email').val(),
          username: $('#username').val()
        };
        _validator.make(data, {
          name: "required|min:3|max:20",
          username: "required|alphanum",
          email: "required|email"
        }, messages = {
	  name: "The :attribute field is required", //apply to all with a required rule
	  email.required: "It is required to have an :attribute" //apply this message to a specific input
	});
        if (_validator.fails()) {
          console.log(_validator.first().error);
          return;
        }
```

## Javascript 

<p align="center"><img src="https://i.imgur.com/VVZKmC1.jpg" width="150px" height="auto" alt="Logo"></a></p>

JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.
It has dynamic typing, prototype-based object-orientation, and first-class functions.It is multi-paradigm, supporting event-driven, 
functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular 
expressions, standard data structures, and the Document Object Model (DOM).

* [Github](https://github.com/tc39)
* [Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## License

lara-validationjs is licensed under [MIT](https://choosealicense.com/licenses/mit/)
