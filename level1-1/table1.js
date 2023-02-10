
/**
 * Constructor of the Product object 
 * 
 * @param {string} ID unique value of product
 * @param {string} name of product
 * @param {string} description of product
 * @param {number} price of product
 * @param {string} brand of product
 * @param {string} activeSize  of product
 * @param {number} quantity of product in stock
 * @param {[]} images array of  of product
 */

function Product(id,name,description,price,brand,activeSize,quantity,images){
   this.id=id;
   this.name=name;
   this.description=description;
   this.price=price;
   this.brand=brand;
   this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
   this.activeSize=activeSize;
   this.quantity=quantity;
   this.date=new Date();
   this.reviews=[];
   this.images=images;
 //getters
 this.getId =  () => this.id ;
 this.getName =  () => this.name ;
 this.getDescription =  () => this.description ;
 this.getPrice=() => this.price ;
 this.getBrand =  () => this.brand;
 this.getSizes =  () => this.sizes;
 this.getQuantity =  () => this.quantity;
 this.getDate =  () => this.date;
 this.getReviews =  () => this.reviews;
 this.getImages =  () => this.images;
 //setters
 this.setId =  id => this.id=id ;
 this.setName =  name => this.name = name ;
 this.setDescription =  description => this.descriptio=description ;
 this.setPrice=price => this.price =price;
 this.setBrand =  brand => this.brand=brand;
 this.setSizes =  sizes => this.sizes=sizes;
 this.setQuantity =  quantity => this.quantity=quantity;
 this.setDate =  date => this.date=date;
 this.setReviews =  reviews=> this.reviews=reviews;
 this.setImages =  images => this.images=images;


/**
 * Adds the size to products
 * @param {*} size for adding
 * @returns new sizes
 */
 this.addSize= size =>
   this.sizes.includes(size)? this.sizes:this.sizes.push(size);


/**
 * Deletes the size from product
 * @param {*} size for delettting
 * @returns new sizes
 */
 this.deleteSize= size =>
   this.sizes.includes(size)?this.sizes=this.sizes.filter(siz=>siz!=size):this.sizes;

 /**
  * will return image if it exists else returns first image
  * @param {*} path for returning
  * @returns image
  */
   this.getImage = path => path!==undefined? this.images.find(image => image===path): this.images[0];


/**
 * finds review by id
 * @param {*} id for finding
 * @returns review by id
 */
   this.getReviewById = id => this.reviews.find(rev => rev.getId() === id);

  /**
   * adds the commebt
   * @param {*} review for adding
   */
 this.addReview = function(review){
      this.reviews.push(review);
 }


 /**
  * delete the comment
  * @param {*} id for deleting
  */
 this.deleteReview =function(id){
   for(let i=id ; i < this.reviews.length-1;i++){
      this.reviews[i]=this.reviews[i+1];
   }
    this.reviews.pop();
}


/**
 * Finds avarage average rating of the product.
 * @returns  avareg number
 */
this.getAverageRating=function(){
   let sum =0;
 for(let i=0 ; i<this.reviews.length;i++){
   let ratings = this.reviews[i].rating;
    for(let key in ratings){
     sum+=ratings[key];
    }
 }
return sum;
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
function Reviews(id,author,comment,rating){
   this.id=id;
   this.author=author;
   this.date=new Date();
   this.comment=comment;
   this.rating={
      'service' : rating[0],
       'price' : rating[1], 
      'value'  : rating[2], 
      'quality' : rating[3],
   };

   //getters
   this.getId =  () => this.id ;
   this.getAuthor =  () => this.author ;
   this.getDate =  () => this.date ;
   this.getComment =  () => this.comment ;
   this.getRating =  () => this.rating ;
   
   //setters
   this.setId =  id => this.id=id ;
   this.setAuthor =  autho => this.author=autho ;
   this.setDate =  date => this.date=date ;
   this.setComment = comment => this.comment=comment ;
   this.setRating =  comment=> this.rating=comment ;
}

/**
 * Finds elemtns of arrau with the word. Finds in 'name ' and 'description'
 * @param {[]} products array
 * @param {String} search  word for search
 * @returns new Array with correct elements
 */
function searchProducts(products , search){
let result=[];
   products.forEach(element => {
      if(element.getName().includes(search.toLowerCase())||element.getDescription().includes(search.toLowerCase())){
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
function sortProducts(products , sortRule){
 return products.sort((a,b)=> a[sortRule.toLowerCase()]-b[sortRule.toLowerCase()]);
};


let products=[];
let product1 = new Product("5", 'dima1',"Dmytro",61,"nokia1","XL1",101,"asdf1",["image","image1"]);
let product2 = new Product("2", 'ihor',"Michenko",79,"nokia2","XL2",102,"asdf2",["image","image1"]);
let product3 = new Product("4", 'roman',"Zaplesvichko",66,"nokia3","XL3",103,"asdf3",["image","image1"]);
let product4 = new Product("3", 'oleh',"111111",49,"nokia4","XL4",104,"asdf4",["image","image1"]);
let product5 = new Product("1", 'maryna',"Yakovenko",65,"nokia5","XL5",105,"asdf5",["image","image1"]);
   products.push(product1);
   products.push(product2);
   products.push(product3);
   products.push(product4);
   products.push(product5);
/*
   for(let key of products){
      console.log(key.name);
  }
*/
   products.forEach(el => {
      console.log(el.name);
   });
  //console.log(searchProducts(products,"1"));
  console.log(sortProducts(products,"name"));
/*
for(let key in products){
    console.log(key);
    console.log(product[key]);
}
*/
/*
let review1 = new Reviews(0,"dima","asda",[0,1,8,3]);
let review2 = new Reviews(1,"dima1","asda",[2,0,2,5]);
let review3 = new Reviews(2,"dima2","asda",[4,6,24,3]);
let review4 = new Reviews(3,"dima2","asda",[4,6,24,3]);
let review5 = new Reviews(4,"dima2","asda",[4,6,24,3]);
let review6 = new Reviews(5,"dima2","asda",[4,6,24,3]);
product.addReview(review1);
product.addReview(review2);
console.log(product.getReviewById(1));
product.addSize("as");
product.addSize("df");
console.log(product.sizes);
product.deleteSize("as");
product.deleteSize("XS");
product.deleteSize("as");
console.log(product.sizes);
console.log(product.getAverageRating());
console.log(product.getReviewById(1));
*/
