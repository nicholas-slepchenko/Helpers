/**
 * Fibonacci
 * How to use: use ID:Number to get necessary value from fibonacci
 *
 * To get 5th value of fibonacci
 * example: fibonacci[5];
 *
 * To get all already calculated values
 * example: fibonacci
 *
 * @type {Proxy}
 */
let fibonacci = new Proxy(Object.create(null, {0: {value: 0}, 1: {value: 1}}), {
    get: function (receiver, number) {
        let i = Object.keys(receiver).length + 1,
            previous = receiver[i - 1],
            current = receiver[i];

        number = parseInt(number);

        if (typeof number !== 'number' && number > 0) {
            throw 'Use number as id!';
        }

        if (receiver[number] !== undefined) {
            return receiver[number];
        }

        while (i++ < number) {
            [previous, current] = [current, previous + current];
            receiver[i] = current;
        }

        return current;
    }
});
