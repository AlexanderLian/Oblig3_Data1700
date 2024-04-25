function kjopBillet() {

    let film = $("#film").val();
    let antall = $("#numAnt").val();
    let fornavn = $("#txtFornavn").val();
    let etternavn = $("#txtEtternavn").val();
    let telefonnr = $("#numTlf").val();
    let epost = $("#txtEpost").val();
    let validInput = true;

    if (film == "-1") {
        $("#filmError").html("Må velge film");
        validInput = false;
    } else {
        $("#filmError").html("");
    }

    if (antall <= 0) {
        $("#antError").html("Må skrive noe i antall");
        validInput = false;
    } else {
        $("#antError").html("");
    }

    if (fornavn === "") {
        $("#fornavnError").html("Må skrive noe i fornavn");
        validInput = false;
    } else {
        $("#fornavnError").html("");
    }

    if (etternavn === "") {
        $("#etternavnError").html("Må skrive noe i etternavn");
        validInput = false;
    } else {
        $("#etternavnError").html("");
    }

    const norwegianPhoneRegex = /^(?:\+47)?\s?(\d{2}\s?\d{2}\s?\d{2}\s?\d{2}|\d{3}\s?\d{2}\s?\d{3}|\d{5}\s?\d{3})$/;
    if (!norwegianPhoneRegex.test(telefonnr)){
        $("#telError").html("Skriv in gyldig telefonnr");
        validInput = false;
    } else {
        $("#telError").html("");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    if (!emailRegex.test(epost)){
        $("#epostError").html("Skriv in gyldig epost");
        validInput = false;
    } else {
        $("#epostError").html("");
    }
    if (validInput === true) {
        let billett = {
            film : $("#film").val(),
            antall : $("#numAnt").val(),
            fornavn : $("#txtFornavn").val(),
            etternavn : $("#txtEtternavn").val(),
            telefonnr : $("#numTlf").val(),
            epost : $("#txtEpost").val()
        };
        $.post("/lagre", billett, function (){
            hentAlle();
        });
        $("#film").val(-1);
        $("#numAnt").val("");
        $("#txtFornavn").val("");
        $("#txtEtternavn").val("");
        $("#numTlf").val("");
        $("#txtEpost").val("");
    }
}

function hentAlle(data) {
    $.get( "/hentAlle", function ( data ) {
        formaterData(data);
    });
}
function formaterData(billetter) {
    let ut = "<table><tr> <th>film</th> <th>antall</th>  <th>fornavn</th>  <th>etternavn</th>  <th>telefonnr</th>  <th>epost</th> </tr>";
    for (const billett of billetter) {
        ut+="<tr><td>"+billett.film+"</td> <td>"+billett.antall+"</td> <td>"+billett.fornavn+"</td> <td>"+billett.etternavn+"</td> <td>"+billett.telefonnr+"</td> <td>"+billett.epost+"</td></tr>";
    }
    ut+="</table>";
    $("#print").html(ut);
}

function slettBillett() {
    $.get( "/slettAlle", function () {
        hentAlle();
    });
}