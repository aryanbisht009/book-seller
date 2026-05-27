let images=[];
let currentIndex=0

const bookImage=document.getElementById("book-image");

// get book id from url
document.addEventListener("DOMContentLoaded",()=>{
    const params=new URLSearchParams(window.location.search);
    const bookId=params.get("id");

    if(!bookId){
        console.error("No book id found");
        return;
    }
    // fetch book from db
    fetch(`http://localhost:3000/books/${bookId}`)
        .then(res=> res.json())
        .then(books=>{
          const book=books[0]
          images=[
            `cards/${book.main_image}`,
            ...books.map(item=>`book_detail_img/${item.detail_image}`)
          ];
          console.log(images)
          displayBook(book,images)
        })
        .catch(err=>console.error(err));
});
// displaying books
function displayBook(book,images) {
  document.getElementById("book_title").innerText = book.book_name;

  bookImage.src =
    `${images[currentIndex]}`;

  document.getElementById("rating").innerText =
    `⭐ ${book.rating}`;

  document.getElementById("price").innerText =
    `₹${book.price}`;

  document.getElementById("original_price").innerText =
    `₹${book.original_price}`;

  // discount calculation
  const discount = Math.round(
    ((book.original_price - book.price) / book.original_price) * 100
  );

  document.getElementById("discount").innerText =
    `${discount}% OFF`;

  document.getElementById("stock").innerText =
    book.stock || "Not available";

  document.getElementById("delivery").innerText =
    book.delivery || "No delivery info avalaible";

  document.getElementById("description-text").innerText =
    book.description || "No description available";
}
//next button
document.getElementById("next-btn")
.addEventListener("click",()=>{
  currentIndex++;
  if(currentIndex>=images.length){
    currentIndex=0;
  }
  // console.log(currentIndex)
  bookImage.src=images[currentIndex];
});

//previous button
document.getElementById("prev-btn")
.addEventListener("click",()=>{
  currentIndex--;
  if(currentIndex<=0){
    currentIndex=images.length-1;
  }
  console.log(currentIndex)
  bookImage.src=images[currentIndex];
});
