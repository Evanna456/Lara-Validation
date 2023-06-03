## lara-validationjs

Laravel Validation but in Javascript

## Usage
```
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
