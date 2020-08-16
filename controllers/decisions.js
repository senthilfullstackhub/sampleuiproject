const axios = require('axios');

// To get the decision response from decision check microservices 
// where it provide service decision as Barclay,Vanquis and not eligible

exports.check = function (req, res, next) {
  const formData = req.body;

  let data = {
    FirstName : formData.firstName,
    LastName : formData.lastName,
    DateOfBirth : formData.dob,
    Salary : formData.income
  } 

  axios({
    method: 'post',
    url: 'http://localhost:8080/api/Customers',
    data: data,
    headers: {'Content-Type': 'application/json; charset=utf-8' }
    })
    .then(response => {

    let serviceDecision = '';
    let serviceAPR = '';
    if(response.data.isEligible)
    {
      serviceDecision = response.data.customerCard.bankName;
      serviceAPR = response.data.customerCard.apr;
    }
    else{
      serviceDecision = 'NotEligible';
    }
    
    res.status(200).send({
    firstName: response.data.firstName,
    lastName: response.data.lastName,
    dob: response.data.dateOfBirth,
    income: response.data.salary,
    timestampLog: response.data.createdOn,
    serviceDecision: serviceDecision,
    apr: serviceAPR
    });    
  })
  .catch((error) => {
      console.log(error)
      res.status(500).send({apiErrorMessage: 'Internal Server Error'})
  });
}