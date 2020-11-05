var db = require("../db");
var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    auth: {
        user: 'domainebergerdesvignes@gmail.com',
        pass: 'dbdv69480'
    },
    tls: {
        rejectUnauthorized: false
    }
});

var mailOptions;

var mail = {

    sendMail: function (req, callback) {
        var body = req.body;
        console.log(body.data, body.data.length, body)
        var content = `<div _ngcontent-ile-c49="" class="d-flex flex-column-fluid">
        <div _ngcontent-ile-c49="" class="container" style="background-color: white !important;">
        <div _ngcontent-ile-c49="" class="card card-custom overflow-hidden">
        <div _ngcontent-ile-c49="" class="card-body p-0">
        <div _ngcontent-ile-c49="" class="row justify-content-center py-8 px-8 py-md-10 px-md-0">
        <div _ngcontent-ile-c49="" class="col-md-9"><div _ngcontent-ile-c49="" class="d-flex justify-content-between pb-10 pb-md-20 flex-column flex-md-row"><h1 _ngcontent-ile-c49="" class="display-4 font-weight-boldest mb-10">
        COMMANDE 
        </h1>
        <div _ngcontent-ile-c49="" class="d-flex flex-column align-items-md-end px-0">
        <a _ngcontent-ile-c49="" href="#" class="mb-5">
        <img _ngcontent-ile-c49="" src="/metronic/theme/html/demo2/dist/assets/media/logos/logo-dark.png" alt="">
        </a>
        <span _ngcontent-ile-c49="" class="d-flex flex-column align-items-md-end opacity-70">
        <span _ngcontent-ile-c49="">`
        content += body.nom;
        content += `</span><span _ngcontent-ile-c49="">
        69480 POMMIERS</span>
        </span>
        </div>
        </div>
        <div _ngcontent-ile-c49="" class="border-bottom w-100">
        </div>
        <div _ngcontent-ile-c49="" class="d-flex justify-content-between pt-6">
        <div _ngcontent-ile-c49="" class="d-flex flex-column flex-root">
        <span _ngcontent-ile-c49="" class="font-weight-bolder mb-2">
        Nom Prénom
        </span>
        <span _ngcontent-ile-c49="" class="opacity-70">`
        content += body.nom;
        content += `</span></div>
        <div _ngcontent-ile-c49="" class="d-flex flex-column flex-root"><span _ngcontent-ile-c49="" class="font-weight-bolder mb-2">
        Email, Numéro de téléphone
        </span>
        <span _ngcontent-ile-c49="" class="opacity-70">`
        content += body.mail;
        content += `</span>
        <span _ngcontent-ile-c49="" class="opacity-70">0633630734</span>
        </div><div _ngcontent-ile-c49="" class="d-flex flex-column flex-root">
        <span _ngcontent-ile-c49="" class="font-weight-bolder mb-2">
        Adresse de livraison</span><span _ngcontent-ile-c49="" class="opacity-70">8 rue henri pertus</span></div></div></div>
        </div><div _ngcontent-ile-c49="" class="row justify-content-center py-8 px-8 py-md-10 px-md-0">
        <div _ngcontent-ile-c49="" class="col-md-9"><div _ngcontent-ile-c49="" class="table-responsive">
        <table _ngcontent-ile-c49="" class="table"><thead _ngcontent-ile-c49=""><tr _ngcontent-ile-c49="">
        <th _ngcontent-ile-c49="" class="pl-0 font-weight-bold text-muted text-uppercase"> 
        Achat</th><th _ngcontent-ile-c49="" class="text-right font-weight-bold text-muted text-uppercase"> 
        Nombre</th><th _ngcontent-ile-c49="" class="text-right font-weight-bold text-muted text-uppercase"> 
        Prix</th><th _ngcontent-ile-c49="" class="text-right pr-0 font-weight-bold text-muted text-uppercase"> 
        Total</th></tr></thead><tbody _ngcontent-ile-c49=""><tr _ngcontent-ile-c49="" class="font-weight-boldest">
        <td _ngcontent-ile-c49="" class="pl-0 pt-7">
        Beaujolais Rouge "Cuvée Tradition" 2018</td>
        <td _ngcontent-ile-c49="" class="text-right pt-7">2 </td>
        <td _ngcontent-ile-c49="" class="text-right pt-7">7.5 € </td>
        <td _ngcontent-ile-c49="" class="text-danger pr-0 pt-7 text-right"> 
        15 €</td></tr></tbody><tbody _ngcontent-ile-c49="">
        <tr _ngcontent-ile-c49="" class="font-weight-boldest">
        <td _ngcontent-ile-c49="" class="pl-0 pt-7">
        IGP Comtés Rhodaniens Rosés 2019 (Bib 5 litres)</td>
        <td _ngcontent-ile-c49="" class="text-right pt-7">3 
        </td><td _ngcontent-ile-c49="" class="text-right pt-7">
        18 € </td><td _ngcontent-ile-c49="" class="text-danger pr-0 pt-7 text-right"> 54 €</td>
        </tr></tbody><tbody _ngcontent-ile-c49=""><tr _ngcontent-ile-c49="" class="font-weight-boldest">
        <td _ngcontent-ile-c49="" class="pl-0 pt-7">Cuvée Insolite 2016 (stock limité)</td>
        <td _ngcontent-ile-c49="" class="text-right pt-7">3 </td><td _ngcontent-ile-c49="" class="text-right pt-7">
        10 € </td><td _ngcontent-ile-c49="" class="text-danger pr-0 pt-7 text-right"> 30 €</td></tr></tbody>
        <!--bindings={
  "ng-reflect-ng-for-of": "[object Object],[object Object"
}--></table></div></div></div>
<div _ngcontent-ile-c49="" class="row justify-content-center bg-gray-100 py-8 px-8 py-md-10 px-md-0">
<div _ngcontent-ile-c49="" class="col-md-9"><div _ngcontent-ile-c49="" class="table-responsive">
<table _ngcontent-ile-c49="" class="table"><thead _ngcontent-ile-c49=""><tr _ngcontent-ile-c49="">
<th _ngcontent-ile-c49="" class="font-weight-bold text-muted text-uppercase"> Total final</th></tr>
</thead><tbody _ngcontent-ile-c49=""><tr _ngcontent-ile-c49="" class="font-weight-bolder">
<td _ngcontent-ile-c49="" class="text-danger font-size-h3 font-weight-boldest"> 
99 €</td></tr></tbody></table></div></div></div>
<div _ngcontent-ile-c49="" class="row justify-content-center py-8 px-8 py-md-10 px-md-0">
<div _ngcontent-ile-c49="" class="col-md-9">
<div _ngcontent-ile-c49="" class="d-flex justify-content-between">
<button _ngcontent-ile-c49="" type="button" onclick="window.print();" class="btn btn-light-primary font-weight-bold">Imprimer</button>
</div></div></div></div></div></div></div>`
        //mail = 'bonjour mr' + body.nom;
        // content_command = "";
        // body.data.forEach(element => {
        //     let a = '<h1>';
        //     a += 'Quantité : ' + element.qte + " ; nom : " + element.nom + " ; prix : " + element.prix + "€";
        //     a += '<h1/>'
        //     content_command += a;
        // });
        // content_command += '<h1>Votre total de la commande : ' + body.total + '<h1/>';

        // console.log(content_command);
        // mail += content_command + content;



    
        mailOptions = {
            from: 'gmail',
            to: 'louis.gnolfi@isen.yncrea.fr',
            cc: 'bergerco@wanadoo.fr',
            subject: 'body.subject',
            html: content
        };


        console.log(mailOptions);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("email sent");
            }
        })
    },
};

module.exports = mail;