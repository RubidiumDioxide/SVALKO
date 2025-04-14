// models/partModel.js

class partModel {
  constructor(id, name, partNumber, manufacturer, price, quantity, image){
    this.ID = id; 
    this.Name = name; 
    this.PartNumber = partNumber; 
    this.Manufacturer = manufacturer; 
    this.Price = price; 
    this.Quantity = quantity; 
    this.Image = image; 
  }
}

module.exports = {
  partModel
};
