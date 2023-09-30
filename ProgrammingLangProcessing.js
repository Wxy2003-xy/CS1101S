/*
definitions:
Processor: the hardware that reads machine code and does the actual execution of
    the program;
    Interpreter needed to convert program into machine code;

Interpreter: a program that execute another program
    from the source language(the language that the interpreter is written in)
    the targert language is the language the executed program is written in;

    interpreter converts the language that the program is written in to machine code
    Interpreters reuqire hardware to run

Compilers: a program that translates from one language (the from language)
    to another language(to language);

    which requires a hardware to run;

    Compilers do not do evaluation, ie no actual execution of the program

    e.g. TypeScript-to-JavaScript compiler is written in x86-64 machine code


        complie compier: Source => JS, (source language is translated to js) 
        by a compiler written in Typescript. The compiler convert source to js

        How to code the compiler since typescript cannot be used in web dev,
        Another compiler written in x86-64 compiles ts to js, 



*/