export default class Validator {
    constructor() {
        this.isFailed = false;
        this.all_errors = [];
        this.all_error_names = [];
        this.first_errors = [];
        this.default_messages = {
            "required": "The :attribute field is required",
            "min": "The :attribute should be more than :min characters",
            "max": "The :attribute should be less than :max characters",
            "alpha": "The :attribute should only contain letters",
            "alphanum": "The :attribute should only contain letters and numbers",
            "integer": "The :attribute should be an integer",
            "number": "The :attribute should be a number",
            "email": "The :attribute should be an email address",
            "regex": "Invalid Input",
            "mimes": "The :attribute only accepts :mimes types",
            "size": "The :attribute should be lesser than :size kb"
        };
    }
    make(data, config, messages) {
        if (messages == null) {
            messages = this.default_messages;
        }
        Object.keys(config).forEach(key => {
            var name = key;
            var rules = config[key].split("|");
            for (var rule of rules) {
                rule = rule.split(":");
                switch (rule[0]) {
                    case "required":
                        if (data[key] != undefined) {
                            if (data[key].length == 0) {
                                this.isFailed = true;
                                this.insertError(messages, name, rule[0]);
                            }
                        } else {
                            this.isFailed = true;
                            this.insertError(messages, name, rule[0]);
                        }
                        break;
                    case "min":
                        if (isNaN(data[key]) && data[key] != "") {
                            if (data[key].length < rule[1] && data[key] != "") {
                                this.isFailed = true;
                                this.insertError(messages, name, rule[0], rule[1]);
                            }
                        } else {
                            if (Number(data[key]) < rule[1] && data[key] != "") {
                                this.isFailed = true;
                                this.insertError(messages, name, rule[0], rule[1]);
                            }
                        }
                        break;
                    case "max":
                        if (isNaN(data[key]) && data[key] != "") {
                            if (data[key].length > rule[1] && data[key] != "") {
                                this.isFailed = true;
                                this.insertError(messages, name, rule[0], rule[1]);
                            }
                        } else {
                            if (Number(data[key]) > rule[1] && data[key] != "") {
                                this.isFailed = true;
                                this.insertError(messages, name, rule[0], rule[1]);
                            }
                        }
                        break;
                    case "alpha":
                        var regex = new RegExp(/^[a-zA-Z]+$/);
                        var test = regex.test(data[key]);
                        if (test == false) {
                            this.isFailed = true;
                            this.insertError(messages, name, rule[0]);
                        }
                        break;
                    case "alphanum":
                        var regex = new RegExp(/^[a-zA-Z0-9]+$/);
                        var test = regex.test(data[key]);
                        if (test == false) {
                            this.isFailed = true;
                            this.insertError(messages, name, rule[0]);
                        }
                        break;
                    case "integer":
                        if (Number.isInteger(Number(data[key])) == false) {
                            this.isFailed = true;
                            this.insertError(messages, name, rule[0]);
                        }
                        break;
                    case "number":
                        if (isNaN(data[key])) {
                            this.isFailed = true;
                            this.insertError(messages, name, rule[0]);
                        }
                        break;
                    case "email":
                        var regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                        var test = regex.test(data[key]);
                        if (test == false) {
                            this.isFailed = true;
                            this.insertError(messages, name, rule[0]);
                        }
                        break;
                    case "regex":
                        var regex = new RegExp(rule[1]);
                        var test = regex.test(data[key]);
                        if (test == false) {
                            this.isFailed = true;
                            this.insertError(messages, name, rule[0]);
                        }
                        break;
                    case "mimes":
                        if (data[key] != undefined) {
                            if (typeof window === "undefined") {
                                var allowed_types = rule[1].split(",");
                                var file = data[key].filename;
                                file = file.split(".");
                                var extension = file[1];
                                if (allowed_types.includes(extension) == false) {
                                    this.isFailed = true;
                                    this.insertError(messages, name, rule[0], rule[1]);
                                }
                            } else {
                                var allowed_types = rule[1].split(",");
                                var file = data[key].name;
                                file = file.split(".");
                                var extension = file[1];
                                if (allowed_types.includes(extension) == false) {
                                    this.isFailed = true;
                                    this.insertError(messages, name, rule[0], rule[1]);
                                }
                            }
                        }
                        break;
                    case "size":
                        if (data[key] != undefined) {
                            if (typeof window === "undefined") {
                                var fs = require("fs");
                                var stats = fs.statSync(data[key]);
                                var kb = stats.size / 1024;
                                if (rule[1] < kb) {
                                    this.isFailed = true;
                                    this.insertError(messages, name, rule[0], rule[1]);
                                }
                            } else {
                                var kb = data[key].size / 1024;
                                if (rule[1] < kb) {
                                    this.isFailed = true;
                                    this.insertError(messages, name, rule[0], rule[1]);
                                }
                            }
                        }
                        break;
                }
            }
        });
    }
    insertError(messages, name, rule, value) {
        var new_message;
        if (name + "." + rule in messages == true) {
            new_message = messages[name + "." + rule];
        } else if (name + "." + rule in messages == false) {
            if (rule in messages == false) {
                new_message = this.default_messages[rule];
            } else if (rule in messages == true) {
                new_message = messages[rule];
            }
        }
        if (new_message != undefined) {
            new_message = new_message.replace(":attribute", name);
            new_message = new_message.replace(":" + rule, value);
        }
        this.all_errors.push({
            name: name,
            error: new_message
        });
    }
    fails() {
        return this.isFailed;
    }
    errors() {
        return this.all_errors;
    }
    first() {
        return this.all_errors[0];
    }
    firstErrors() {
        for (var all_error of this.all_errors) {
            this.all_error_names.push(all_error.name);
        }
        var uniqueSet = [...new Set(this.all_error_names)];
        for (var all_error_name of uniqueSet) {
            var x = this.all_errors.find(x => x.name === all_error_name);
            this.first_errors.push({
                name: x.name,
                error: x.error
            });
        }
        return this.first_errors;
    }
}

