import * as go from 'gojs';


function initializeFlowchartBuilder() {
     // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates
    var myDiagram =
      $(go.Diagram, "myDiagramDiv", {
        initialContentAlignment: go.Spot.Center,
        allowDrop: true,
        "LinkDrawn": showLinkLabel,
        "LinkRelinked": showLinkLabel,
        "animationManager.duration": 800,
        "undoManager.isEnabled": true
      });
  
    function nodeStyle() {
      return [
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          locationSpot: go.Spot.Center,
          mouseEnter: function (e, obj) { showPorts(obj.part, true); },
          mouseLeave: function (e, obj) { showPorts(obj.part, false); }
        }
      ];
    }
  
    function makePort(name, spot, output, input) {
      return $(go.Shape, "Circle",
        {
          fill: "transparent",
          stroke: null,
          desiredSize: new go.Size(8, 8),
          alignment: spot,
          alignmentFocus: spot,
          portId: name,
          fromSpot: spot,
          toSpot: spot,
          fromLinkable: output,
          toLinkable: input,
          cursor: "pointer"
        });
    }
  
    myDiagram.nodeTemplateMap.add("", $(go.Node, "Spot", nodeStyle(),
      $(go.Panel, "Auto",
        $(go.Shape, "Rectangle", { fill: "#00A9C9", stroke: null },
          new go.Binding("figure", "figure")),
        $(go.TextBlock,
          {
            font: "bold 11pt Helvetica, Arial, sans-serif",
            stroke: "whitesmoke",
            margin: 8,
            maxSize: new go.Size(160, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true
          },
          new go.Binding("text").makeTwoWay())
      ),
      makePort("T", go.Spot.Top, false, true),
      makePort("L", go.Spot.Left, true, true),
      makePort("R", go.Spot.Right, true, true),
      makePort("B", go.Spot.Bottom, true, false)
    ));
  
    // Define other node templates and link template here...
  
    function showLinkLabel(e) {
      var label = e.subject.findObject("LABEL");
      if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
    }
  
    function showPorts(node, show) {
      var diagram = node.diagram;
      if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
      node.ports.each(function(port) {
        port.stroke = (show ? "white" : null);
      });
    }
  
    return myDiagram;
  }
  
  // Usage:
  var diagram = initializeFlowchartBuilder();
  

  export {  diagram };