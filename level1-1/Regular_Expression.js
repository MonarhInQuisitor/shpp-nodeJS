
let validator = {
    //check the correctness of  an email address
    validateEmail : email =>
       /(^[0-9a-z][a-z.+-]{1,19})@([a-z.!$%&’*+/=?^_-]{1,15})\.[a-z]{1,5}$/i.test(email) ,
    //check the correctness of a phone number
    validatePhone : phone =>
       phone.length<=25 ? /^[\s-]*(\+(\d[\s-]*){2})?\(?(\d[\s-]*){3}\)?([\s-]*\d[\s-]*){7}$/g.test(phone)  : false,
    //check the correctness of  a password
   validatePassword : password =>
          /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])^\w{8,}$/.test(password),
}
// Data for testing
const emails = [
    /* Valid */
    "firstpart@secondpart.end", "fi@secondpart.end", "first-part@.se=cond%p.art.end", "first.part@se=cond%part.r",
    /* Invalid */
 "f@secondart.end", "first-part@.se=cond@part.end",  "-firstpart@.se=cond%.enddeded", "firs_tpart@.se.en", "firstpart@.se.enddeded"
];

const phones = [
    /* Valid */
    "+38 (099) 567 8901",   "+38 099 5 6 7 8 9  01",  "(09-9) 567-890-1",  "--  (099) 567 890-1",
    /* Invalid */
    "+38 (099) 567 8901 0", "+38 099 a0000000", "38 (0989) 567 8901",  "+48 (0989) 567 8901"
];

const passwords = [
    /* Valid */
    "C00l_Pass",  "SupperPas1",
    /* Invalid */
    "Cool_pass",  "C00l"
];
 // Tests
  emails.forEach(email => console.log(validator.validateEmail(email)));
  phones.forEach(phone => console.log(validator.validatePhone(phone)));
  passwords.forEach( password => console.log(validator.validatePassword( password)));

