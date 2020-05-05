"use strict";
document.addEventListener("DOMContentLoaded", start);


const endPoint = "https://kea-alt-del.dk/kata-distortion/";


function start() {
    console.log("start");
    fetchData();
    fetchSVG();
}

function fetchSVG() {
    fetch("svg/speed.svg", {
            method: "get"
        })
        .then(e => e.text())
        .then(e => {
            document.querySelector("#speedometer").innerHTML = e;
        });
}

function fetchData() {
    fetch(endPoint, {
            method: "get"
        })
        .then(e => e.json())
        .then(e => {
            console.log(e);
            showData(e);
            setTimeout(fetchData, 10000);
        });
}

function showData(data) {
    document.querySelector("h1").textContent = "In queue: " + data.inQueue;

    document.querySelector("#needle").style.setProperty('--deg', data.inQueue * 6 + 'deg');
}