class Validator {
    constructor() {
        this.isFailed = false;
        this.all_errors = new Array();
        this.default_messages = {
            "required": "The :attribute field is required",
            "integer": "The :attribute field should be an integer",
            "min": "The :attribute should be more than :min characters",
            "max": "The :attribute should be less than :max characters",
            "alphanum": "The :attribute should only contain letters and numbers",
            "email": "The :attribute should be an email address",
            "regex": "Invalid Input"
        };
    }
    make(data, config, messages) {
        if (messages == null) {
            messages = this.default_messages;
        }
        Object.keys(config).forEach(key => {
            var name = key;
            var rules = config[key].split("|");
            for (var item of rules) {
                item = item.split(":");
                switch (item[0]) {
                    case "required":
                        if (data[key].length == 0) {
                            this.isFailed = true;
                            if (name + "." + item[0] in messages == true) {
                                var new_message = messages[name + "." + item[0]];
                            } else if (name + "." + item[0] in messages == false) {
                                var new_message = messages[item[0]];
                            } else if (item[0] in messages == false) {
                                var new_message = this.default_messages[item[0]];
                            }
                            if (new_message != undefined) {
                                new_message = new_message.replace(":attribute", name);
                            }
                            this.all_errors.push({
                                name: name,
                                error: new_message
                            });
                        }
                        break;
                    case "integer":
                        if (Number.isInteger(Number(data[key])) == false) {
                            this.isFailed = true;
                            if (name + "." + item[0] in messages == true) {
                                var new_message = messages[name + "." + item[0]];
                            } else if (name + "." + item[0] in messages == false) {
                                var new_message = messages[item[0]];
                            } else if (item[0] in messages == false) {
                                var new_message = this.default_messages[item[0]];
                            }
                            if (new_message != undefined) {
                                new_message = new_message.replace(":attribute", name);
                            }
                            this.all_errors.push({
                                name: name,
                                error: new_message
                            });
                        }
                        break;
                    case "min":
                        if (item[0] == "min") {
                            if (data[key].length < item[1] && data[key] != "") {
                                this.isFailed = true;
                                if (name + "." + item[0] in messages == true) {
                                    var new_message = messages[name + "." + item[0]];
                                } else if (name + "." + item[0] in messages == false) {
                                    var new_message = messages[item[0]];
                                } else if (item[0] in messages == false) {
                                    var new_message = this.default_messages[item[0]];
                                }
                                if (new_message != undefined) {
                                    new_message = new_message.replace(":attribute", name);
                                    new_message = new_message.replace(":min", item[1]);
                                }
                                this.all_errors.push({
                                    name: name,
                                    error: new_message
                                });
                            }
                        }
                        break;
                    case "max":
                        if (data[key].length > item[1]) {
                            this.isFailed = true;
                            if (name + "." + item[0] in messages == true) {
                                var new_message = messages[name + "." + item[0]];
                            } else if (name + "." + item[0] in messages == false) {
                                var new_message = messages[item[0]];
                            } else if (item[0] in messages == false) {
                                var new_message = this.default_messages[item[0]];
                            }
                            if (new_message != undefined) {
                                new_message = new_message.replace(":attribute", name);
                                new_message = new_message.replace(":max", item[1]);
                            }
                            this.all_errors.push({
                                name: name,
                                error: new_message
                            });
                        }
                        break;
                    case "alphanum":
                        var regex = new RegExp(/^[a-zA-Z0-9]+$/);
                        var test = regex.test(data[key]);
                        if (test == false) {
                            this.isFailed = true;
                            if (name + "." + item[0] in messages == true) {
                                var new_message = messages[name + "." + item[0]];
                            } else if (name + "." + item[0] in messages == false) {
                                var new_message = messages[item[0]];
                            } else if (item[0] in messages == false) {
                                var new_message = this.default_messages[item[0]];
                            }
                            if (new_message != undefined) {
                                new_message = new_message.replace(":attribute", name);
                                new_message = new_message.replace(":min", item[1]);
                            }
                            this.all_errors.push({
                                name: name,
                                error: new_message
                            });
                        }
                        break;
                    case "email":
                        var regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                        var test = regex.test(data[key]);
                        if (test == false) {
                            this.isFailed = true;
                            if (name + "." + item[0] in messages == true) {
                                var new_message = messages[name + "." + item[0]];
                            } else if (name + "." + item[0] in messages == false) {
                                var new_message = messages[item[0]];
                            } else if (item[0] in messages == false) {
                                var new_message = this.default_messages[item[0]];
                            }
                            if (new_message != undefined) {
                                new_message = new_message.replace(":attribute", name);
                            }
                            this.all_errors.push({
                                name: name,
                                error: new_message
                            });
                        }
                        break;
                    case "regex":
                        var regex = new RegExp(item[1]);
                        var test = regex.test(data[key]);
                        if (test == false) {
                            this.isFailed = true;
                            if (name + "." + item[0] in messages == true) {
                                var new_message = messages[name + "." + item[0]];
                            } else if (name + "." + item[0] in messages == false) {
                                var new_message = messages[item[0]];
                            } else if (item[0] in messages == false) {
                                var new_message = this.default_messages[item[0]];
                            }
                            if (new_message != undefined) {
                                new_message = new_message.replace(":attribute", name);
                            }
                            this.all_errors.push({
                                name: name,
                                error: new_message
                            });
                        }
                        break;
                }
            }
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
}

