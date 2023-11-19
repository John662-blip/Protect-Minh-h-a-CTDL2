import React from "react";

class Stack {
    constructor() {
        this.arr = [];
        this.top = -1;
    }
    isEmpty() {
        return this.top == -1;
    }
    push(value) {
        this.top++;
        this.arr[this.top] = value
    }
    pop() {
        if (!this.isEmpty())
            return this.arr[this.top--];
    }
    peek() {
        if (!this.isEmpty())
            return this.arr[this.top];
    }
    toArr() {
        if (!this.isEmpty()) {
            let Arr = [];
            for (let i = 0; i <= this.top; i++) {
                Arr = [...Arr, this.arr[i]];
            }
            return Arr;
        }
        return [];
    }
}
export default Stack;