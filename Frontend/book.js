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
        .then(book=>{
            displayBook(book)
        })
        .catch(err=>console.error(err));
});
// displaying books
function displayBook(book) {

  document.getElementById("book-title").innerText = book.book_name;

  document.getElementById("main-image").src =
    `cards/${book.image}`;

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
    books.Stock || "Not available";

  document.getElementById("delivery").innerText =
    books.Delivery || "No delivery info avalaible";

  document.getElementById("description").innerText =
    books.Description || "No description available";
}
