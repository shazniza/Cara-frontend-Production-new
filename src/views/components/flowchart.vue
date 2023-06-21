<template>
    <div id="sample">
      <div style="width: 100%; display: flex; justify-content: space-between">
        <div id="myPaletteDiv" style="width: 100px; margin-right: 2px; background-color: #282c34;"></div>
        <div id="myDiagramDiv" style="flex-grow: 1; height: 750px; background-color: white;"></div>

      </div>
     
      <button id="SaveButton" @click="save">Save</button>
      <button @click="load">Load</button>
      Diagram Model saved in JSON format:
      <textarea id="mySavedModel" style="width:100%;height:300px">{ "class": "go.GraphLinksModel",
      "linkFromPortIdProperty": "fromPort",
      "linkToPortIdProperty": "toPort",
      "nodeDataArray": [
    {"category":"Comment", "loc":"360 -10", "text":"Kookie Brittle", "key":-13},
    {"key":-1, "category":"Start", "loc":"175 0", "text":"Start"},
    {"key":0, "loc":"-5 75", "text":"Preheat oven to 375 F"},
    {"key":1, "loc":"175 100", "text":"In a bowl, blend: 1 cup margarine, 1.5 teaspoon vanilla, 1 teaspoon salt"},
    {"key":2, "loc":"175 200", "text":"Gradually beat in 1 cup sugar and 2 cups sifted flour"},
    {"key":3, "loc":"175 290", "text":"Mix in 6 oz (1 cup) Nestle's Semi-Sweet Chocolate Morsels"},
    {"key":4, "loc":"175 380", "text":"Press evenly into ungreased 15x10x1 pan"},
    {"key":5, "loc":"355 85", "text":"Finely chop 1/2 cup of your choice of nuts"},
    {"key":6, "loc":"175 450", "text":"Sprinkle nuts on top"},
    {"key":7, "loc":"175 515", "text":"Bake for 25 minutes and let cool"},
    {"key":8, "loc":"175 585", "text":"Cut into rectangular grid"},
    {"key":-2, "category":"End", "loc":"175 660", "text":"Enjoy!"}
     ],
      "linkDataArray": [
    {"from":1, "to":2, "fromPort":"B", "toPort":"T"},
    {"from":2, "to":3, "fromPort":"B", "toPort":"T"},
    {"from":3, "to":4, "fromPort":"B", "toPort":"T"},
    {"from":4, "to":6, "fromPort":"B", "toPort":"T"},
    {"from":6, "to":7, "fromPort":"B", "toPort":"T"},
    {"from":7, "to":8, "fromPort":"B", "toPort":"T"},
    {"from":8, "to":-2, "fromPort":"B", "toPort":"T"},
    {"from":-1, "to":0, "fromPort":"B", "toPort":"T"},
    {"from":-1, "to":1, "fromPort":"B", "toPort":"T"},
    {"from":-1, "to":5, "fromPort":"B", "toPort":"T"},
    {"from":5, "to":4, "fromPort":"B", "toPort":"T"},
    {"from":0, "to":4, "fromPort":"B", "toPort":"T"}
     ]}
      </textarea>
      <button @click="printDiagram">Print Diagram Using SVG</button>
    </div>
  </template>
  
  <script>
  import go from "gojs";
  export default {
    mounted() {
      const $ = go.GraphObject.make;
  
      const myDiagram = $(go.Diagram, "myDiagramDiv", {
        initialContentAlignment: go.Spot.Center,
        allowDrop: true,
        "undoManager.isEnabled": true
      });
  
      // Define the node templates
      myDiagram.nodeTemplateMap.add(
        "Comment",
        $(go.Node, "Auto", {
            selectable: true,
            resizable: true,
            position: new go.Point(200, 200),
            locationSpot: go.Spot.Center
          },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          $(go.Shape, "Rectangle", {
              fill: "#DEE0A3",
              stroke: null
            },
            new go.Binding("figure", "figure")),
          $(go.TextBlock, {
              margin: 5,
              editable: true
            },
            new go.Binding("text").makeTwoWay())
        )
      );
  
      myDiagram.nodeTemplateMap.add(
        "Start",
        $(go.Node, "Spot", {
            desiredSize: new go.Size(75, 75)
          },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          $(go.Shape, "Circle", {
            fill: "#79C900",
            stroke: null
          }),
          $(go.TextBlock, "Start", {
            font: "bold 16px sans-serif"
          })
        )
      );
  
      myDiagram.nodeTemplateMap.add(
        "End",
        $(go.Node, "Spot", {
            desiredSize: new go.Size(75, 75)
          },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          $(go.Shape, "Circle", {
            fill: "#DC3C00",
            stroke: null
          }),
          $(go.TextBlock, "End", {
            font: "bold 16px sans-serif"
          })
        )
      );
  
      myDiagram.nodeTemplateMap.add(
        "Step",
        $(go.Node, "Auto", {
            movable: true
          },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          $(go.Shape, "Rectangle", {
            fill: "#00A9C9",
            stroke: null
          }),
          $(go.TextBlock, {
              margin: 5,
              editable: true
            },
            new go.Binding("text").makeTwoWay())
        )
      );
  
      // Define the link template
      myDiagram.linkTemplate = $(
        go.Link, {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 4,
          selectable: true
        },
        new go.Binding("points").makeTwoWay(),
        $(go.Shape, {
          stroke: "#2F4F4F",
          strokeWidth: 2
        })
      );
  
      // Initialize the Palette
      const myPalette = $(go.Palette, "myPaletteDiv");
      myPalette.nodeTemplateMap = myDiagram.nodeTemplateMap;
      myPalette.model = new go.GraphLinksModel([
        {
          category: "Start",
          text: "Start"
        },
        {
          text: "Step"
        },
        {
          category: "End",
          text: "End"
        },
        {
          category: "Comment",
          text: "Comment"
        }
      ]);
  
      // Load the diagram model from JSON
      function load() {
        myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
      }
  
      // Save the diagram model to JSON
      function save() {
        document.getElementById("mySavedModel").value = myDiagram.model.toJson();
      }
  
      // Print the diagram using SVG
      function printDiagram() {
        const svgWindow = window.open();
        if (!svgWindow) return;
        const printSize = new go.Size(700, 960);
        const bnds = myDiagram.documentBounds;
        const x = bnds.x;
        const y = bnds.y;
        const svg = myDiagram.makeSvg({
          scale: 1,
          position: new go.Point(x, y),
          size: printSize
        });
        svgWindow.document.body.appendChild(svg);
        setTimeout(() => {
          svgWindow.print();
        }, 1);
      }
  
      // Expose the functions to Vue instance
      this.load = load;
      this.save = save;
      this.printDiagram = printDiagram;
    }
  };
  </script>
  