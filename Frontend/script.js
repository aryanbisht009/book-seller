let index=0;
function showSlides(){
    let slides=document.getElementsByClassName("slides");

    for(let i=0;i<slides.length;i++){
        slides[i].style.display="none"
    }

    slides[index].style.display="block"

    index=(index+1)%slides.length; //move to the next slide

    setTimeout(showSlides,3000);
}

//fetching book cards
document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("books-section");

  fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(data => {

      let allCards = "";

      data.forEach(book => {

        const discountPercent = Math.round(
          ((book.original_price - book.price) / book.original_price) * 100
        );

        allCards += `
          <div class="book-card">

            <div class="book-image">
              <img src="cards/${book.image}" alt="${book.book_name}">
            </div>

            <div class="rating">
              ⭐ ${book.rating}
            </div>

            <div class="book-title">
              ${book.book_name}
            </div>

            <div class="price-row">
              <span class="discount-price">₹${book.price}</span>
              <span class="original-price">₹${book.original_price}</span>
              <span class="discount">${discountPercent}% OFF</span>
            </div>

            <div class="author">
              ${book.author}
            </div>

          </div>
        `;
      });

      container.innerHTML = allCards;

    })
    .catch(err => {
      console.error("Fetch error:", err);
    });

});

//fetching slide images
document.addEventListener("DOMContentLoaded",()=>{
  const container_slide=document.getElementById("slideshow");

  fetch("http://localhost:3000/slideshow")
  .then(res=>res.json())
  .then(data=>{
    let slidesHtml="";
    data.forEach((slideshow,index)=>{
      slidesHtml+=`<img class="slides" src="slide_image/${slideshow.image}"
      style="display:${index===0?'block':'none'};">;`
    });
    container_slide.innerHTML=slidesHtml;
    showSlides();
  });
});



