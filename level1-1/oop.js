

/**
 * Abstract claaa
 * 
 * @param {string} ID unique value of product
 * @param {string} name of product
 * @param {string} description of product
 * @param {number} price of product
 * @param {string} brand of product
 * @param {number} quantity of product in stock
 * @param {[]} images array of  of product
 */
class AbstractProduct {
  constructor(id, name, description, price, brand, quantity, images) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.quantity = quantity;
    this.date = new Date();
    this.reviews = [];
    this.images = images;
  }

  get id() { return this._id };
  get name() { return this._name };
  get description() { return this._description };
  get price() { return this._price };
  get brand() { return this._brand };
  get quantity() { return this._quantity };
  get date() { return this._date };
  get reviews() { return this._reviews };
  get images() { return this._images };

  set id(id) { this._id = id };
  set name(name) { this._name = name };
  set description(description) { this._description = description };
  set price(price) { this._price = price };
  set brand(brand) { this._brand = brand };
  set quantity(quantity) { this._quantity = quantity };
  set date(date) { this._date = date };
  set reviews(reviews) { this._reviews = reviews };
  set images(images) { this._images = images };

  /**
* finds review by id
* @param {*} id for finding
* @returns review by id
*/
  getReviewById(id) { return this.reviews.find(rev => rev.getId() === id) };

  /**
 * will return image if it exists else returns first image
 * @param {*} path for returning
 * @returns image
 */
  getImage(path) {
    return path !== undefined ? this.images.find(image => image === path) : this.images[0];
  }

  /**
   * adds the commebt
   * @param {*} review for adding
   */
  addReview(review) {
    this.reviews.push(review)
  }


  /**
   * delete the comment
   * @param {*} id for deleting
   */
  deleteReview(id) {
    for (let i = id; i < this.reviews.length - 1; i++) {
      this.reviews[i] = this.reviews[i + 1];
    }
    this.reviews.pop();
  }


  /**
   * Finds avarage average rating of the product.
   * @returns  avareg number
   */
  getAverageRating() {
    let sum = 0;
    for (let i = 0; i < this.reviews.length; i++) {
      let ratings = this.reviews[i].rating;
      for (let key in ratings) {
        sum += ratings[key];
      }
    }
    return sum;
  }
  /**
   *  
   * @returns full information ablout the object
   */
  getFullInformation() {
    let result = "";
    for (let key in this) {
      result += ` ${key} -  ${this[key]} \n`;
    }
    return result;
  }

  /**
   *  calculate sum of n products
   * @param {String} n - price
   * @returns 
   */
  getPriceForQuantity(n) {
    return `$${n * this.price}`;
  }

  /**
   * both getter and setter for everything
   * @param {String} key 
   * @param {*} value 
   * @returns 
   */
  getSet(key, value) {
    if (value === undefined) {
      return this[key];
    } else {
      this[key] = value;
    }
  }
}

/**
 * Constructor of the review object
 * 
 * @param {string}id - id of review
 * @param {string}author - review author
 * @param {Date}date - date of creating review
 * @param {string}comment - product review
 * @param {ObjMap}rating - ranking
 */
class Reviews {
  constructor(id, author, comment, rating) {
    this.id = id;
    this.author = author;
    this.date = new Date();
    this.comment = comment;
    this.rating = {
      'service': rating[0],
      'price': rating[1],
      'value': rating[2],
      'quality': rating[3],
    }
  }
  //getters
  get id() { this._id };
  get author() { this._author };
  get date() { this._date };
  get comment() { this._comment };
  get rating() { this._rating };

  //setters
  set id(id) { this._id = id };
  set author(author) { this._author = author };
  set date(date) { this._date = date };
  set comment(comment) { this._comment = comment };
  set rating(rating) { this._rating = rating };
}


class Clothes extends AbstractProduct {
  /**
   * Constructor of the Clothes object
   * 
   * @param {String} material 
   * @param {String} color 
   */
  constructor(id, name, description, price, brand, quantity, images, material, color) {
    super(id, name, description, price, brand, quantity, images);
    this.material = material;
    this.color = color;
  }
  //getters
  get material() { return this._material; }
  get color() { return this._color; }
  //setters
  set material(material) { this._material = material }
  set color(color) { this._color = color }
}

class Electronics extends AbstractProduct {
  /**
   *  Constructor of the Electronics object
   * 
   * @param {String} warranty 
   * @param {String} power 
   */
  constructor(id, name, description, price, brand, quantity, images, warranty, power) {
    super(id, name, description, price, brand, quantity, images);
    this.warranty = warranty;
    this.power = power;
  }
  //getters
  get warranty() { return this._warranty; }
  get power() { return this._power; }
  //setters
  set warranty(material) { this._material = material }
  set power(power) { this._material = power }

}

/**
 * Finds elemtns of arrau with the word. Finds in 'name ' and 'description'
 * @param {[]} products array
 * @param {String} search  word for search
 * @returns new Array with correct elements
 */
function searchProducts(products, search) {
  let result = [];
  products.forEach(element => {
    if (element.name.includes(search.toLowerCase()) || element.description.includes(search.toLowerCase())) {
      result.push(element);
    }
  });
  return result;
};

/**
 * Sorts array by ID, price, or name
 * @param {[]} products array
 * @param {String} sortRule  sortRule  ID, price, or name
 * @returns new sorted array
 */
function sortProducts(products, sortRule) {
  return products.sort((a, b) => a[sortRule.toLowerCase()] - b[sortRule.toLowerCase()]);
};



//------------------------tests-----------------------------------------------------------
AbstractProduct.prototype.qqq = "4";
let clotheses = [];
let product = new AbstractProduct(1, "1", "qwe", "123", "adasddf", [1, 2, 3, 4, 5], "path");
let clothes1 = new Clothes(1, "Dima", "qwe", "123", "adasddf", [1, 2, 3, 4, 5], "path", "koja", "black");
let clothes2 = new Clothes(2, "vicor", "qwe", "245", "adasddf", [1, 2, 3, 4, 5], "path", "koja", "black");
let clothes3 = new Clothes(3, "alina", "qwe", "1", "adasddf", [1, 2, 3, 4, 5], "path", "koja", "black");
let clothes4 = new Clothes(4, "mucola", "qwe", "12", "adasddf", [1, 2, 3, 4, 5], "path", "koja", "black");
clotheses.push(clothes1);
clotheses.push(clothes2);
clotheses.push(clothes3);
clotheses.push(clothes4);
//console.table(product);
//console.log(product.id);
//console.table(clotheses);

let review1 = new Reviews(0, "dima", "asda", [0, 1, 8, 3]);
//let review2 = new Reviews(1,"dima1","asda",[2,0,2,5]);
//let review3 = new Reviews(2,"dima2","asda",[4,6,24,3]);
//let review4 = new Reviews(3,"dima2","asda",[4,6,24,3]);
//console.log(review1);
clothes1.addReview(review1);
//product.addReview(review2);
//console.log(product.reviews);
//product.deleteReview(0);
//console.log(clothes1.reviews);

// TESTS
//console.table(searchProducts(clotheses,"a"));
//console.table(sortProducts(clotheses,"price"));
//console.log(clothes1.getFullInformation());
console.log(clothes1.getPriceForQuantity(5));

//getset
console.log(clothes1.getSet("id"));
clothes1.getSet("id", 7);
console.log(clothes1.id);

