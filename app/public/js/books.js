const SomeApp = {
    data() {
        return {
            books: [],
            bookForm: {},
            selectedBook: null
        }
    },
    computed: {},
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectBook(b) {
            if (b == this.selectedBook) {
                return;
            }
            this.selectedBook = b;
            //this.books = [];
            //this.fetchBooksData(this.selectedBook);
        },
        fetchBooksData() {
            //console.log("Fetching offer data for ", s);
            fetch('/api/books/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
        postBook(evt) {
            console.log ("Test:", this.selectedBook)
            if (this.selectedBook) {
                this.postEditBook(evt);
            } else {
                this.postNewBook(evt);
            }
        },
        postNewBook(evt) {
            //this.offerForm.studentId = this.selectedStudent.id;        
            
            console.log("Posting!", this.bookForm);
    
            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
                .then( response => response.json() )
                .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                // reset the form
                this.bookForm = {};
                });
        },
        postEditBook(evt) {
            this.bookForm.id = this.selectedBook.id;
            //this.bookForm.id = this.selectedBook.id;
    
            console.log("Updating!", this.bookForm);
    
            fetch('api/books/update.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
    
                // reset the form
                this.resetBookForm();
              });
        },
        postDeleteBook(b) {  
            if ( !confirm("Are you sure you want to delete the book " + b.Title + "?") ) {
                return;
            }  
            
            console.log("Delete!", b);
    
            fetch('api/books/delete.php', {
                method:'POST',
                body: JSON.stringify(b),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                // reset the form
                this.resetBookForm();
              });
        },
        selectBookToEdit(book) {
            this.selectedBook = book;
            this.bookForm = Object.assign({}, this.selectedBook);
        },
        resetBookForm() {
            this.selectedBook = null;
            this.bookForm = {};
        }
    },
    created() {
          this.fetchBooksData();
    }
    
}

Vue.createApp(SomeApp).mount('#bookApp');