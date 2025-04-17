export class Part {
  constructor(id, name, manufacturer, partNumber, category, price, quantity, image) {
      this.Id = id || null; 
      this.Name = name;
      this.Manufacturer = manufacturer;
      this.PartNumber = partNumber;
      this.Category = category; 
      this.Price = price;
      this.Quantity = quantity;
      this.Image = image || null; // Default to null if not provided
  }
}


