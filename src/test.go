package main
import (
    "fmt"
    "log"
    "net/http"
    "github.com/gorilla/mux"
    "context"
    "encoding/json"
	  "github.com/kr/pretty"
  	"googlemaps.github.io/maps"
    "html/template"
)

type ColorGroup struct {
  ID     int
  Name   string
  Colors []string
}


func GetRequest() {
  c, err := maps.NewClient(maps.WithAPIKey("AIzaSyBV8iWuM-TmtoQwN91nBigfreJvys4tTiY"))
  if err != nil {
    log.Fatalf("fatal error: %s", err)
  }
  r := &maps.DirectionsRequest{
    Origin:      "Sydney",
    Destination: "Perth",
  }
  route, _, err := c.Directions(context.Background(), r)
  if err != nil {
    log.Fatalf("fatal error: %s", err)
  }

  pretty.Println(route)
}

type TarikPage struct {
  HistoryOf string
  Description string
}

func home(w http.ResponseWriter, r *http.Request) {
  // w.Header().Set("Content-Type", "text/html")
  w.Header().Set("Content-Type", "application/json")
  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.WriteHeader(http.StatusCreated)
  group := ColorGroup{
    ID:     1,
    Name:   "Reds",
    Colors: []string{"Crimson", "Red", "Ruby", "Maroon"},
  }
  // returns a json data
  json.NewEncoder(w).Encode(group)
  // fmt.Fprint(w, "<h1>Whoa, this place is neat!</h1>")
  // return "<h1>Whoa, this place is neat!</h1>"
}

func contact(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "text/html")
  fmt.Fprintf(w, "To get in touch, please send an email to <a href=\"mailto:support@lenslocked.com\"> support@lenslocked.com</a>.")
}

func TarikHandler(w http.ResponseWriter, r *http.Request) {
  tarik := TarikPage{HistoryOf: "ChinaTown", Description: "For the first Chinatown in the world...."}
  t, _ := template.ParseFiles("index.html")
  t.Execute(w, tarik)
}

func main() {
    // GetRequest()
    r := mux.NewRouter()
    r.HandleFunc("/", home)
    r.HandleFunc("/contact", contact)
    r.HandleFunc("/tarik", TarikHandler)
    fmt.Println("Starting server on the port 8000...")
    log.Fatal(http.ListenAndServe(":8000", r))

}
