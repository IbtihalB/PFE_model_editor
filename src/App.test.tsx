import { render, screen } from '@testing-library/react';
import App from './App';
/*
describe("minimal", () => {
  beforeAll(async () => {
    await Page.goto('index.html');
  });

  it('should show 4 nodes and 5 links', async () => {
    expect(await Page.$("#myDiagramDiv")).not.toBeNull();

    expect(await page.waitForFunction(() => {
      const myDiagram = document.getElementById("myDiagramDiv").goDiagram;
      return myDiagram.nodes.count === 4 &&
              myDiagram.links.count === 5;
    })).toBeTruthy();
  });

  it('show that the Beta node is orange', async () => {
    expect(await page.waitForFunction(() => {
      const myDiagram = document.getElementById("myDiagramDiv").goDiagram;
      const beta = myDiagram.findNodeForKey("Beta");
      return beta !== null && beta.data.color === "orange";
    })).toBeTruthy();
  });

  it('demonstrates deleting a node', async () => {
    expect(await page.waitForFunction(() => {
      const myDiagram = document.getElementById("myDiagramDiv").goDiagram;
      const beta = myDiagram.findNodeForKey("Beta");
      myDiagram.select(beta);
      myDiagram.commandHandler.deleteSelection();
      return true;
    })).toBeTruthy();

    expect(await page.waitForFunction(() => {
      const myDiagram = document.getElementById("myDiagramDiv").goDiagram;
      return myDiagram.nodes.count === 3 &&
              myDiagram.links.count === 3 &&
              myDiagram.findNodeForKey("Beta") === null;
    })).toBeTruthy();
  });

});


describe("minimal", () => {
  let myDiagram = null
  let myRobot = null

  beforeEach(() => {
    // more likely you would be running the sample locally,
    // say at http://localhost:5500/samples/minimal.html
    cy.visit("https://gojs.net/latest/samples/minimal.html")

    // make sure the HTMLDivElement exists holding the Diagram
    cy.get("#myDiagramDiv")

    // load extensions/Robot.js dynamically
    cy.window().then(win => {
      const scr = win.document.createElement("script");
      scr.src = "https://unpkg.com/gojs/extensions/Robot.js";
      win.document.body.appendChild(scr);
    })

    // make sure it's loaded
    cy.window().should("have.property", "Robot")

    // save these references for each test, which simplifies each test code
    cy.window().then(win => {
      myDiagram = win.go.Diagram.fromDiv(win.document.getElementById("myDiagramDiv"));
      myRobot = new win.Robot(myDiagram);
    })

    // wait for the Diagram to finish initializing; is there a better way?
    cy.wait(1)
  })

  // A minimal test to make sure the Diagram got set up OK.
  it("has nodes and links", () => {
    cy.window().then(win => {
      expect(myDiagram.nodes.count).to.equal(4)
      expect(myDiagram.links.count).to.equal(5)
      const delta = myDiagram.findNodeForKey("Delta");
      expect(delta).to.not.equal(null)
      expect(delta.elt(0).fill).to.equal("pink")
    })
  })

  // A test that uses Robot to simulate input by producing InputEvents.
  it("copies a node with Robot", () => {
    cy.window().then(win => {
      // Find the center of the Delta node in document coordinates.
      const delta = myDiagram.findNodeForKey("Delta");
      const loc = delta.actualBounds.center;

      // Simulate a mouse drag to move the Delta node:
      const options = { control: true, alt: true };
      myRobot.mouseDown(loc.x, loc.y, 0, options);
      myRobot.mouseMove(loc.x + 80, loc.y + 50, 50, options);
      myRobot.mouseMove(loc.x + 20, loc.y + 100, 100, options);
      myRobot.mouseUp(loc.x + 20, loc.y + 100, 150, options);
      // If successful, this will have made a copy of the "Delta" node below it.

      // Check that the new node is at the drop point,
      // and that it is a copy, different from the original node.
      const newloc = new win.go.Point(loc.x + 20, loc.y + 100);
      const newnode = myDiagram.findPartAt(newloc);
      expect(newnode).to.not.equal(delta)
      expect(newnode.key).to.equal("Delta2")
      expect(newnode.isSelected).to.equal(true)
    })
  })

})*/
