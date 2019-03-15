import React, { Component } from "react";
import TopBar from "./TopBar/TopBar";
import BottomBar from "./BottomBar/BottomBar";
import Content from "./Content/Content";
import { ItemsProvider } from "../data/context";
import uuidV4 from "uuid/v4";
import { getItemIndex } from "../utils/utils";

class App extends Component {
  state = {
    itemsCollection: [],
    drawer: {
      open: false,
      mode: "adding",
      elemKey: ""
    }
  };

  toggleDrawer = (open, mode, elemKey) => () => {
    this.setState({
      drawer: {
        open: open,
        mode: mode,
        elemKey: elemKey
      }
    });
  };

  writeItem = (name, price, date, elemKey) => () => {
    const {
      drawer: { mode }
    } = this.state;

    //Добавить в список
    if (mode === "adding") {
      const key = uuidV4();
      const item = {
        name: name,
        price: price,
        date: date,
        key: key
      };

      this.setState(prevState => ({
        itemsCollection: [...prevState.itemsCollection, item]
      }));
    }

    //Редактировать покупку
    if (mode === "editing") {
      const { itemsCollection } = this.state;
      let collectionForEdit = [...itemsCollection];
      const newItem = {
        name: name,
        price: price,
        date: date,
        key: elemKey
      };

      const itemIndex = getItemIndex(collectionForEdit, elemKey);
      collectionForEdit[itemIndex] = newItem;

      this.setState({
        itemsCollection: [...collectionForEdit]
      });
    }
  };

  //Удалить из списка
  deleteItem = elemKey => () => {
    const { itemsCollection } = this.state;
    const filteredCollection = itemsCollection.filter(
      item => elemKey !== item.key
    );
    this.setState({
      itemsCollection: [...filteredCollection]
    });
  };

  //Сортировка
  sortItem = (name, direction) => {
    const { itemsCollection } = this.state;
    let collectionForSort = [...itemsCollection];
    collectionForSort.sort((a, b) => {
      return direction ? a[name] - b[name] : b[name] - a[name];
    });
    this.setState({
      itemsCollection: [...collectionForSort]
    });
  };

  render() {
    const {
      itemsCollection,
      drawer: { open, mode, elemKey }
    } = this.state;
    return (
      <ItemsProvider
        value={{
          writeItem: this.writeItem,
          deleteItem: this.deleteItem,
          toggleDrawer: this.toggleDrawer,
          sortItem: this.sortItem,
          itemsCollection: itemsCollection,
          elemKey: elemKey,
          open: open,
          mode: mode
        }}
      >
        <TopBar />
        <Content itemsCollection={itemsCollection} />
        <BottomBar />
      </ItemsProvider>
    );
  }
}

export default App;
