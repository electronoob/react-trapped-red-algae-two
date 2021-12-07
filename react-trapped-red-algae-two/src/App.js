
import './App.css';
import React, { useEffect } from 'react';
import { FaHtml5, FaReact, FaServer, FaGithub } from 'react-icons/fa';
import { SiCsswizardry, SiJavascript } from 'react-icons/si';
import { IoGameControllerOutline } from 'react-icons/io5';

function App() {
  useEffect(() => {
    var the_canvas = document.getElementById("canvas");
    var ctx = the_canvas.getContext("2d");

    var width = the_canvas.width;
    var height = the_canvas.height;
    
    the_canvas.style.width = "100%";
    the_canvas.style.width = "100%";

    var foodMax = 50;
    var foodMass = 2;
    var playerStartMass = 15;
    var playerStartID = -1;
    var virusStartMass = 20;
    var cellNameTextMultiplier = 1;
    var cells = [];

    var playerNames = "abstract bio biography curriculum digest epitome history life précis recapitulation resume review rundown résumé story sum summary summation summing-up synopsis vita vitae work".split(" ");

    var colors = [
      "rgb(255,69,69)",
      "rgb(255,159,159)",
      "rgb(255,214,214)",
      "rgb(50,215,215)",
      "rgb(100,210,210)",
      "rgb(10,132,132)",
      "rgb(94,92,92)",
      "rgb(191,90,90)",
      "rgb(255,55,55)",
      /*vibrant*/
      "rgb(0,120,255)",
      "rgb(189,0,255)",
      "rgb(255,154,0)",
      "rgb(1,255,31)",
      "rgb(227,255,0)",
    ];

    ctx.imageSmoothingEnabled = false

    var i;
    for(i=0;i<foodMax;i++)
    cells.push(makeCell(
      // makeCell
      // type, x, y, radius, color, name, id
      'food',
      Math.abs(gri(foodMass, width  - foodMass)),
      Math.abs(gri(foodMass, height - foodMass)),
      foodMass,
      colors[gri(0,colors.length-1)],
      null,
      null
    ));

    cells.push(makeCell(
      // makeCell
      // type, x, y, radius, color, name, id
      'cell',
      gri(playerStartMass, width  - playerStartMass),
      gri(playerStartMass, height - playerStartMass),
      playerStartMass,
      colors[gri(0,colors.length-1)],
      playerNames[gri(0, playerNames.length -1)],
      playerStartID
    ));

    cells.push(makeCell(
      // makeCell
      // type, x, y, radius, color, name, id
      'virus',
      gri(virusStartMass, width  - virusStartMass),
      gri(virusStartMass, height - virusStartMass),
      virusStartMass,
      "green",
      null,
      null
    ));
    var localPlayerCells = getPlayerCellsByID(playerStartID);

    function makeCell(type, x, y, radius, color, name, id) {
      return {
        x: x,
        y: y,
        radius: radius,
        name: name,
        color: color,
        type: type,
        id: id,
      }
    }
    function render() {
      ctx.clearRect(0, 0, width, height);
      drawCells();
      doSomeBotStuff();
      window.requestAnimationFrame(render);
    }
    function drawCells() {
      cells.forEach((c) => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = c.color;
        ctx.lineWidth = c.radius / 10;
        if(c.type === "virus")
          ctx.setLineDash([2,4]);
        else
          ctx.setLineDash([])
        ctx.closePath();
        ctx.stroke();
        ctx.closePath();
        
        if(c.type === "virus")
            ctx.globalAlpha = 0.4;
        if(c.type !== "cell") {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.radius, 0, 2 * Math.PI);
            ctx.fillStyle = c.color;
            ctx.fill();
            ctx.closePath();
        }
        ctx.globalAlpha = 1.0;
        if(c.type === "cell") {
          var text = c.name;
          ctx.font = c.radius * cellNameTextMultiplier +  "px 'Segoe UI'";
          var width = ctx.measureText(text).width;
          
          ctx.fillStyle = "white";
          ctx.fillText(text,    c.x - width/2,   c.y + c.radius/3);
        }
      });
    }
    //get random inclusive
    function gri(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    function doSomeBotStuff() {
      // let's locate nearest food.
      //var localPlayerCells = getPlayerCellsByID(playerStartID);
      var i;
      var nearest = null;
      for(i=0;i<cells.length;i++) {
        var cell = cells[i];
        if( cell.type === "food" ) {
          if(nearest === null) {
              nearest = i;
          } else {
            var current = getDistance(localPlayerCells[0], cell);
            var old     = getDistance(localPlayerCells[0], cells[nearest]);
            if(current < old) { 
              nearest = i;
            }
          }
        }
      }
      var a = localPlayerCells[0];
      var b = cells[nearest];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "white";
      ctx.setLineDash([3,5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    function getPlayerCellsByID(id) {
      var playerCells = [];
      var i;
      for(i=0;i<cells.length;i++) {
        var cell = cells[i];
        if(cell.id === id)
          playerCells.push(cell);
      }
      return playerCells;
    }
    function getDistance(a, b){
      var x = b.x - a.x;
      var y = b.y - a.y;
      return Math.sqrt( (x*x) + (y*y) )
    }
    setInterval(()=>{
      localPlayerCells[0].x += Math.sin(Date.now() / 10000) /2 ;
      localPlayerCells[0].y += Math.sin(Date.now() / 1000)  /2;
    }, 8);
    window.requestAnimationFrame(render);
  });
  return (
    <div id="the-content">
      <div id="name-list-blurb">
        <div id="name">My Name</div>
        <div id="list">
          <ul>
            <li>Creative</li>
            <li>Versatile</li>
            <li>Efficient</li>
          </ul>
        </div>
        <div id="blurb">
            Full stack developer with over 25 years experience
            in a range of technologies and methodologies.
            Designed, implmented and succesfully supported
            systems for millions of end users.
        </div>
      </div>
      <canvas id="canvas" width="640px" height="150px"></canvas>
      <div id="tiles">
        <div class="tile tile-main"><FaReact /></div>
        <div class="tile"><FaGithub /></div>
        <div class="tile"><IoGameControllerOutline /></div>
        <div class="tile"><FaHtml5 /></div>
        <div class="tile"><FaServer /></div>
        <div class="tile"><SiCsswizardry /></div>
        <div class="tile"><SiJavascript /></div>
      </div>
      <div>proj inf</div>
      <div>about me</div>
    </div>
  ); 
}

export default App;
