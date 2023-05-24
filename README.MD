# Welcome to the Front End!

Hi! If you've found your way here, then you're most likely making some Front End updates. Please take a moment to read this **before making any updates**. In order to ensure and maintain code quality, PRs will be subject to the instructions of this Readme. Once you have read this, feel free to begin coding, or ask for advice!

# Languages

This repo offers support to code in both **ES6 (JavaScript)** and **TypeScript**. Preferably, where possible, if coding a large important chunk of work, we ask you code in **TypeScript**. TypeScript will help you write better, cleaner code, reducing the chances of introducing bugs.

For smaller pieces of work, **JavaScript** is fine but please try to stick to **ES6** with the exception of **jQuery** (where necessary: Ajax, Event Handlers, etc).

## Files and Folders

You will notice there are **2 main** folders:

1. _JavaScript_
2. _TypeScript_

Within each, there are **4 sub-folders**:

1.  _EnergyOnline_ - where all logic specifically for EnergyOnline (Registration, Payments, Meter Reads, etc) resides.
2.  _Change_ - where all logic specifically for Change of Tenancy and Change of Supplier resides.
3.  _Globals_ - where all logic shared across the project (Forms, etc) resides.
4.  _Non-Production_ - where all logic intended for either debugging or development aid with no intention of being deployed to production resides.

Beyond that, there are a further **2 sub-folders** within _EnergyOnline_ and _Change_:

1.  _Interface_ - where logic specifically for the UI (modals, tooltips, etc) resides.
2.  _Journey_ - where logic specifically for the User Journey resides.

## A Modular Approach

This is a huge codebase with a huge variation of user journeys and user types. To keep the Front End logic clean, we adopt a **modular** approach. This means that code should be **reusable** where absolutely possible. For example, if your Registration file contains logic that is not unique to Registration and can be used elsewhere, the code does not belong in the Registration file. **If your code is reusable**, it is probably best placed under _Globals/_ and **referenced** in your file, not **defined**.

## Writing a Module

To write a module, you will begin by naming your class. Choose something self descriptive and in uppercase. Once you have decided on a name, prepend the `export` to it, to export the class. For example:

    export class Example {

    }

You may want to define variables associated to this module. To do this, set the types within the class, like this:

    export class Example {

        someString: string;
        someBoolean: boolean;

    	init() {

            this.someBoolean = document.querySelector('#someValue').value;

    		if (this.someBoolean) {
    			this.someMethod();
    		} else {
    			this.someOtherMethod();
    		}
    	}

    	someMethod() {
    		console.log("true");
    	}

    	someOtherMethod() {
    		console.log("false");
    	}
    }

As you've declared that you are exporting this class, it can be imported and used in another module.

## Importing a Module

To import a module, at the top of the page, simply declare:

    import { Example } from './path/to/module';

You can access any of the properties or methods from the imported module by declaring a new instance of it, for example:

    const Ex = new Example();
    Ex.someString;
    Ex.someBoolean;
    Ex.init();
    Ex.someMethod();
    Ex.someOtherMethod();

Declaring a new instance makes sense when the logic in question is unique every time it gets executed. Think of a User module, where the property values are different depending on the journey in question.

Sometimes, you do not need to declare a new instance, and you can simply just import the module. But if you decide this is best, you must prepend your properties and methods with the `static` keyword in the original module declaration file (Example.ts).

    static someStaticMethod() {
        return "someValue";
    }

That way, you can directly access the properties and methods as such:

    import { Example } from './path/to/module';
    let someValue = Example.someStaticMethod();
