export function getSquare(x, y) {
    return document.querySelector(`[cordX="${x}"][cordY="${y}"]`)
}

export async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

export function rng(num) {
    return Math.ceil(Math.random() * num)
}

export function randomEl(arr) {
    return arr[rng(arr.length) - 1]
}