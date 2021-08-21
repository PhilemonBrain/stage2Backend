const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

// serve your css as static
app.use(express.static(__dirname));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message;
    async function main() {      
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'king.ohara@ethereal.email',
                pass: 'HTXr2XAnfUWmvPtxDg'
            }
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: email, // sender address
          to: 'king.ohara@ethereal.email', // list of receivers
          subject: name, // Subject line
          text: message, // plain text body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
    main().catch(e => console.log(e))
    console.log("is it sending")
    res.json("Thank you for subscribing");
});