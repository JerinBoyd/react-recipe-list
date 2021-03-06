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
    showAdd: false,
    showEdit: false,
    currentIndex: 0,
    newestRecipe: { recipeName: "", ingredients: [] }
  };
  //deletes a recipe
  deleteRecipe(index) {
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    this.setState({ recipes });
  }
  //Update newRecipe
  updateNewRecipe(recipeName, ingredients) {
    this.setState({
      newestRecipe: { recipeName: recipeName, ingredients: ingredients }
    });
  }
  //Saves new recipe to recipes
  saveNewRecipe() {
    let recipes = this.state.recipes.slice();
    recipes.push({
      recipeName: this.state.newestRecipe.recipeName,
      ingredients: this.state.newestRecipe.ingredients
    });

    this.setState({ recipes });
    this.setState({ newestRecipe: { recipeName: "", ingredients: [] } });
    this.close();
  }
  // Closes a modal
  close = () => {
    if (this.state.showAdd) {
      this.setState({ showAdd: false });
    } else if (this.showEdit) {
      this.setState({ showEdit: false });
    }
  };
  // opens a modal
  open = (state, currentIndex) => {
    this.setState({ [state]: true });
    this.setState({ currentIndex });
  }
  // Updates RecipeName of recipe 
  updateRecipeName(recipeName, currentIndex){
      let recipes = this.state.recipes.slice();
      recipes[currentIndex] = {recipeName: recipeName, ingredients: recipes[currentIndex].ingredients};
      this.setState(recipes);
  }
  //Update ingredients in a recipe
  updateIngredients(ingredients, currentIndex){
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = {recipeName:recipes[currentIndex].recipeName, ingredients:ingredients};
    this.setState({recipes});
  }
  render() {
    const { recipes, newestRecipe, currentIndex } = this.state;

    return (
      <div className="App container">
        {recipes.length > 0 && (
          <div>
            <PanelGroup accordion>
              {recipes.map((recipe, index) => (
                <Panel eventKey={index}>
                  <Panel.Heading>
                    <Panel.Title toggle>{recipe.recipeName}</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    <ul>
                      {recipe.ingredients.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <ButtonToolbar>
                      <Button
                        bsStyle="danger"
                        onClick={event => this.deleteRecipe(index)}
                      >
                        Delete Recipe
                      </Button>
                      <Button
                        bsStyle="default"
                        onClick={event => this.open("showEdit", index)}
                      >
                        Edit Recipe
                      </Button>
                    </ButtonToolbar>
                  </Panel.Body>
                </Panel>
              ))}
            </PanelGroup>
            )}
            <Modal show={this.state.showEdit} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title> Edit Recipe </Modal.Title>
                <Modal.Body>
                  <FormGroup controlId="formBasicText">
                    <ControlLabel>Recipe Name</ControlLabel>
                    <FormControl
                      type="text"
                      value={recipes[currentIndex].recipeName}
                      placeholder="Enter Recipe Name"
                      onChange={event =>
                        this.updateRecipeName(event.target.value, currentIndex)
                      }
                    />
                    <FormGroup controlId="formBasicText">
                      <ControlLabel>Recipe Name</ControlLabel>
                      <FormControl
                        type="text area"
                        value={newestRecipe.recipeName}
                        placeholder="Enter Ingredients (Seperate By Commas)"
                        onChange={event =>
                          this.updateNewRecipe(
                            newestRecipe.recipeName,
                            event.target.value.split(",")
                          )
                        }
                        value={newestRecipe.ingredients}
                      />
                    </FormGroup>
                  </FormGroup>
                </Modal.Body>
                {/* <ModalFooter> */}
                <Button onClick={event => this.saveNewRecipe()}>
                  Save New Recipe
                </Button>
                {/* </ModalFooter> */}
              </Modal.Header>
            </Modal>
          </div>
        )}
        <Modal show={this.state.showAdd} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title> Add Recipe </Modal.Title>
            <Modal.Body>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Recipe Name</ControlLabel>
                <FormControl
                  type="text"
                  value={newestRecipe.recipeName}
                  placeholder="Enter Recipe Name"
                  onChange={event =>
                    this.updateNewRecipe(
                      event.target.value,
                      newestRecipe.ingredients
                    )
                  }
                />
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Recipe Name</ControlLabel>
                  <FormControl
                    type="text area"
                    value={newestRecipe.recipeName}
                    placeholder="Enter Ingredients (Seperate By Commas)"
                    onChange={event =>
                      this.updateNewRecipe(
                        newestRecipe.recipeName,
                        event.target.value.split(",")
                      )
                    }
                    value={newestRecipe.ingredients}
                  />
                </FormGroup>
              </FormGroup>
            </Modal.Body>
            {/* <ModalFooter> */}
            <Button onClick={event => this.saveNewRecipe()}>
              Save New Recipe
            </Button>
            {/* </ModalFooter> */}
          </Modal.Header>
        </Modal>
        <Button bsStyle="primary" onClick={event => this.open("showAdd")}>
          Add Recipe
        </Button>
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
