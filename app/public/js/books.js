const SomeApp = {
    data() {
      return {
      books: [],
      selectedBook: null,
      bookForm: {}
        }
    },
    computed: {},
    methods: {
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
          }
      },
      created() {
          this.fetchBooksData();
      }
    
    }
    
    Vue.createApp(SomeApp).mount('#bookApp');