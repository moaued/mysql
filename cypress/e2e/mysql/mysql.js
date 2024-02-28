
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
Given("INSERT INTO db",()=>{
   
    //   cy.task("queryDb",
    //  'INSERT INTO `payments` (`id`, `name`, `de`) VALUES (NULL, "ssffrf", "esdxcc")'
    //     ).then(count => {

    //       // expect(count.message).to.equal("");
    //     });

})



Given("Select from db",()=>{
   
  // cy.task("queryDb",
// 'select * from payments'

 
//     ).then(count => {

//       // expect(count.message).to.equal("");
//     });
  })
  Given("insert into db",()=>{
 
    cy.task("queryDb",
    "INSERT INTO `payments`(`customerNumber`, `checkNumber`, `paymentDate`, `amount`) VALUES ('103','HQ33633386','2009-10-19','444445844')"
    
     
        ).then(count => {
    
          // expect(count.message).to.equal("");
        });
       

  })