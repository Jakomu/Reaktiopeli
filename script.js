const punainenNappi = document.getElementById("puna")
const keltainenNappi = document.getElementById("kelt")
const vihreäNappi = document.getElementById("vihr")
const oranssiNappi = document.getElementById("oran")
const aloitusNappi = document.getElementById("aloitus")
const tulos = document.getElementById("tulos")

punainenNappi.addEventListener("click", () => {napinPainallus(0)})
keltainenNappi.addEventListener("click", () => {napinPainallus(1)})
vihreäNappi.addEventListener("click", () => {napinPainallus(2)})
oranssiNappi.addEventListener("click", () => {napinPainallus(3)})
aloitusNappi.addEventListener("click", aloitaPeli)

let lista = []
let virhe = false
let tulosluku = 0
//let valoaika
let nopeus = 1500

async function aloitaPeli() {
    lockScroll()
    aloitusNappi.disabled = true
    nollaa()
    //valoaika = 300
    nopeus = 1500
    //punainenNappi.addEventListener("click", () => {napinPainallus(0)})
    //keltainenNappi.addEventListener("click", () => {napinPainallus(1)})
    //vihreäNappi.addEventListener("click", () => {napinPainallus(2)})
    //oranssiNappi.addEventListener("click", () => {napinPainallus(3)})
    while (lista.length < 11 && virhe == false) {
        arvotaanNappula()
        console.log(lista)
        nopeutus(tulosluku)
        await pause(nopeus)
    }
}

async function arvotaanNappula() {
    switch (getRandomInt(4)) {
        case 0:
            lista.push(0)
            await valo("puna")
            break
        case 1:
            lista.push(1)
            await valo("kelt")
            break
        case 2:
            lista.push(2)
            await valo("vihr")
            break
        case 3:
            lista.push(3)
            await valo("oran")
            break
    }
}

function nollaa() {
    lista = []
    tulosluku = 0
    virhe = false
    updateScore()
}

function gameOver() {
    virhe = true
    alert("Peli päättyi!")
    //punainenNappi.removeEventListener("click", napinPainallus)
    //keltainenNappi.removeEventListener("click", napinPainallus)
    //vihreäNappi.removeEventListener("click", napinPainallus)
    //oranssiNappi.removeEventListener("click", napinPainallus)
    aloitusNappi.disabled = false
    unlockScroll()
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function valo(color) {
    document.getElementById(color).classList.add("valo")
    await pause(350)
    document.getElementById(color).classList.remove("valo")
    return "valot"
}

function nopeutus(tulosluku) {
    if (tulosluku > 5 && tulosluku <= 10) {
        nopeus = 1250
    }
    else if (tulosluku > 10 && tulosluku <= 15) {
        nopeus = 1000
    }
    else if (tulosluku > 15 && tulosluku <= 20) {
        nopeus = 850
    }
    else if (tulosluku > 20 && tulosluku <= 25) {
        nopeus = 700
    }
    else if (tulosluku > 25 && tulosluku <= 30) {
        nopeus = 600
    }
    else if (tulosluku > 30) {
        nopeus = 500
    }
    return nopeus
}

function napinPainallus(color) {
    if (color == lista[0]) {
        lista.shift()
        tulosluku++
        updateScore()
    }
    else gameOver()
}

function updateScore() {
    tulos.innerHTML = `Tulos: ${tulosluku}`
    return tulosluku
}

function lockScroll(){
    document.querySelector("html").style.overflow = "hidden"
} 

function unlockScroll(){
    document.querySelector("html").style.overflow = "auto"
}