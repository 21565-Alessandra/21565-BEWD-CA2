//CONTINUOUS ASSESSMENT II - BSC30921
//STUDENT ID: 21565
//STUDENT NAME: ALESSANDRA SILVA DOS REIS

//declarations and imports
const express = require('express') //for server and routes
const bodyParser = require('body-parser') //for x-www-urlencoded
const app = express() //defining the app to manage the requests and commands (such as get, push, post, put, delete...)
const port = 3001 //back-end (server) port
const mongoose = require('mongoose') //requesting the driver to allow the connection to the database    
const Singer = require('./singer.js') //calling and accessing the class constructor from another file

//bodyParser being called/used by the app
app.use(bodyParser.urlencoded({
    extended: false
}))

//API ROUTES

//show singer list from database through the GET request
app.get('/singer', (req, res) => {

    //with the data found and stored in the result variable
    //the Model on singer.js will be used to obtain all singers information entered from the database
    Singer.find((err, singers) => {

        // in case of an error on the input, a message will be sent to the user 
        if (err) {
            res.status(404).send(err)
            return
        }

        //in case of no error, the input will be sent
        res.status(200).send(singers)
        //the result will also be logged and showed on the terminal
        console.log(singers)
    })
})


// FIND ONE BY ID
//GET request and A PARAMETER (that in this case is ID) will be used to to find/get the id
app.get('/singer/:id', (req, res) => {
    const id = req.params.id;

    Singer.findById(id, (err, singer) => {

        // in case of not indentifying the input, a message will be sent to the user 
        if (err) {
            res.status(404).send("Singer not found")
            return
        }

        //the user will get the information back
        res.status(200).send(singer)
        //it will also log the singer in the console
        console.log(singer)
    })
})

// TO POST 
// insert request to add singer into the database

app.post('/singer', (req, res) => {
    console.log("Inserting a singer in the database")
    //add singer in the database

    let grammyWinner = false;
    if (req.body.grammyWinner === 'true') {
        grammyWinner = true;
    }

    let singer = new Singer({

        name: req.body.name, // String
        age: parseInt(req.body.age), //Number
        nationality: req.body.nationality, // String
        grammyWinner: grammyWinner // Boolean

    });

    //insert a singer and check if is there any error in the input
    singer.save(err => {
        if (err) {

            //in case of an error the message below will be sent to the user
            res.status(404).send('Singer details not inserted into the database')
            return

        }

        //the message below is sent when the input is correct
        res.status(201).send('Singer details inserted into the database')
        //the message below will also be logged on the console
        console.log("Singer details are in the database")
    })

    return
})


//TO PUT (CHANGE DETAILS ALREADY INSERTED)
//request to update, correct or change any information that was previously inserted and that is retrieved on the database
app.put('/singer/:id', (req, res) => {

    // the attempt to change will be logged on the console
    console.log("Trying to edit singer")
    console.log(parseInt(req.body.age))

    //the data that can be found and put available for changes
    Singer.findByIdAndUpdate(
        req.params.id,
        {

            name: req.body.name,
            age: ((parseInt(req.body.age) == NaN) ? 0 : parseInt(req.body.age)),
            nationality: req.body.nationality,
            grammyWinner: (req.body.grammyWinner === 'true')

        }, err => {

            //in case of errors the command below will let the user knows what is wrong with the input
            if (err) {
                res.send("The information couldn't be edited. The error is: " + err)
                return;
            }

            //message to let the user know that the input has modified
            res.send("It was successfully edited")
        })
})

//DELETE
//request to remove a singer by using DELETE  and a PARAMETER (that in this case is ID)
app.delete('/singer/:id', (req, res) => {

    Singer.findByIdAndDelete(req.params.id, err => {

        //in case of error the message will be sent to the user
        if (err) {
            res.send("The singer details couldn't be deleted")
            return
        }

        //when the singer is deleted the message below will be shown to the user
        res.send("Singer details were successfully deleted")

        //the message with the specific id of the singer will be logged on the console
        console.log(`Singer with id ${req.params.id} is now deleted`)
    })
})

//start the server
app.listen(port, () => {

    //my database link from mongodb
    mongoose.connect('mongodb+srv://admin1:admin1@singercluster.bqg8e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
        catch(error => console.log(error));
    console.log(`Example app listening at http://localhost:${port}`)

})

