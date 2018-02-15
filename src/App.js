import React, { Component } from "react";
import "./App.css";
import PanelGroup from "react-bootstrap/lib/PanelGroup";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Modal from "react-bootstrap/lib/Modal";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";

class App extends Component {
  state = {
    recipes: [
      { recipeName: "jeff1", ingredients: ["pepper1", "bacon", "salt"] },
      { recipeName: "jeff2", ingredients: ["pepper2", "bacon", "salt"] },
      { recipeName: "jeff3", ingredients: ["pepper3", "bacon", "salt"] }
    ],
    showAdd: false
  };
  //deletes a recipe
  deleteRecipe(index){
      let recipes = this.state.recipes.slice();
      recipes.splice(index, 1);
      this.setState({recipes});
  }
  close = () => {
    if(this.state.showAdd){
    this.setState({showAdd: false})
    }
  }
  render() {
    const {recipes} = this.state;
    return (
      <div className="App container">
        <PanelGroup accordion>
          {recipes.map((recipe, index) =>(
            <Panel eventKey={index}>
              <Panel.Heading>
                <Panel.Title toggle>{recipe.recipeName}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <ul>
                {recipe.ingredients.map((item) => (
                  <li key={item}>{item}</li>
                ))}
                </ul>
                <ButtonToolbar>
                  <Button bsStyle="danger" onClick={(event)=>this.deleteRecipe(index)}>Delete Recipe</Button>
                  <Button bsStyle="default">Edit Recipe</Button>
                </ButtonToolbar>
              </Panel.Body>
            </Panel>
          ))}
        </PanelGroup>
        <Modal show={this.state.showAdd} onHide={this.close}>


        </Modal>
        <Button bsStyle="primary">Add Recipe</Button>
      </div>
    );
  }
  //   const { recipes } = this.state;
  //   return (
  //     <div className="container">
  //       <PanelGroup accordion id='pg'>
  //         {recipes.map((recipe, index) => (
  //           <Panel header={recipe.recipeName} eventKey={index} key={index}>
  //             <ol>
  //               {recipe.ingredients.map(item => <li key={item}>{item}</li>)}
  //             </ol>
  //             <ButtonToolbar>
  //               <Button bsStyle="danger">Delete Recipe</Button>
  //               <Button bsStyle="default">Edit Recipe</Button>
  //             </ButtonToolbar>
  //           </Panel>
  //         ))}
  //       </PanelGroup>
  //       <Button bsStyle="primary">Add Recipe</Button>
  //     </div>
  //   );
  // }
}

export default App;
