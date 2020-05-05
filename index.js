"use strict";
document.addEventListener("DOMContentLoaded", start);


const endPoint = "https://kea-alt-del.dk/kata-distortion/";


function start() {
    console.log("start");
    fetchData();
    fetchSVG();
}

function fetchSVG() {
    fetch("svg/speeder.svg", {
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
    const inQueue = data.inQueue;

    document.querySelector("#speedometer").style.setProperty('--deg', inQueue * 6 + 'deg');


    document.querySelectorAll("#speeder > g:nth-child(1) text").forEach(t => {
        if (t.textContent === inQueue) {
            console.log(t.textContent);

            if (inQueue < 5) {
                t.style.fill = "limegreen";
            } else if (inQueue > 5 && inQueue < 15) {
                t.style.fill = "yellow";
            } else {
                t.style.fill = "red";
            }



        } else {
            t.style.fill = "white";
        }
    })
}