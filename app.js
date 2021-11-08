const express = require("express");
const fs = require("fs");
const app = express();
const port = 5000;

app.use(express.json());

const addFile = (movie) => {
  fs.writeFile("./movie.json", JSON.stringify(movie), () => {
    console.log("added successfally");
  });
};

//....
//get
// all movies is (deleted = false)
app.get("/moving", (req, res) => {
  fs.readFile("./movie.json", (err, data) => {
    let movie = JSON.parse(data.toString());

    const found = movie.filter((movie) => {
      return movie.isDel === false;
    });
    if (found) {
      res.status(200);
      res.json(found);
    } else {
      res.status(404);
      res.json("not found");
    }
  });
});

// get movie by id (query)
app.get("/movieById", (req, res) => {
  fs.readFile("./movie.json", (err, data) => {
    let movie = JSON.parse(data.toString());

    const { id } = req.query;
    const f = movie.find((e) => {
      return e.id == id;
    });
    if (f) {
      res.status(200);
      res.json(f);
    } else {
      res.status(404);
      res.json("not found");
    }
  });
});

//get favorite movie (isFav= true)
app.get("/movies", (req, res) => {
  fs.readFile("./movie.json", (err, data) => {
    let movie = JSON.parse(data.toString());
    // const {isDel} = req.query;
    const found = movie.filter((movie) => {
      return movie.isFav === true;
    });
    if (found) {
      res.status(200);
      res.json(found);
    } else {
      res.status(404);
      res.json("not found");
    }
  });
});

//......
//post
//create new movie
app.post("/create", (req, res) => {
  fs.readFile("./movie.json", (err, data) => {
    let movie = JSON.parse(data.toString());

    let newMovie = {
      // id: req.body.id,
      id: movie.length + 1,
      nameMovie: req.body.nameMovie,
      isFav: false,
      isDel: false,
    };
    movie.push(newMovie);
    addFile(movie);
    res.json(movie);
  });
});
//......
//put
//update name movie by id (params)
app.put("/update/:id", (req, res) => {
  fs.readFile("./movie.json", (err, data) => {
    let movie = JSON.parse(data.toString());
    let found = movie.find((e) => {
      return e.id == req.params.id;
    });
    if (found) {
      let update = {
        id: found.id,
        nameMovie: req.body.nameMovie,
        isFav: found.isFav,
        isDel: found.isDel,
      };
      let fd = movie.indexOf(found);
      movie.splice(fd, 1, update);
      addFile(movie);
      res.json(movie);
    } else {
      res.status(404);
      res.json("not found");
    }
  });
});

//update isFave => true or false by id (params)
app.put("/updateIsFav/:id", (req, res) => {
  fs.readFile("./movie.json", (err, data) => {
    let movie = JSON.parse(data.toString());
    let found = movie.find((e) => {
      return e.id == req.params.id;
    });
    if (found) {
      let update = {
        id: found.id,
        nameMovie: found.nameMovie,
        isFav: req.body.isFav,
        isDel: found.isDel,
      };
      let fd = movie.indexOf(found);
      movie.splice(fd, 1, update);
      addFile(movie);
      res.json(movie);
    } else {
      res.status(404);
      res.json("not found");
    }
  });
});

//.....
//delete
//delete movie by id (params)
app.delete("/delete/:id", (req, res) => {
  fs.readFile("./movie.json", (err, data) => {
    let movie = JSON.parse(data.toString());
    let del = movie.find((e) => {
      return e.id == req.params.id;
    });
    if (del) {
      let dle = movie.indexOf(del);
      movie.splice(dle, 1);
      addFile(movie);
      res.json(movie);
    } else {
      res.status(404);
      res.json("not found");
    }
  });
});

app.listen(port, () => {
  console.log(`server run on ${port}`);
});
