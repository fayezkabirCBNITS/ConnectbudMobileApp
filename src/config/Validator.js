const validator = {
  validateForm: (fieldName, formFields, formErrors) => {
    let fields = formFields;
    let errors = formErrors;
    errors['formIsValid'] = true;
    if (
      (fieldName == 'user_name' || fieldName == null) &&
      'user_name' in fields
    ) {
      if (!fields['user_name']) {
        errors['user_name'] = 'Please enter user name.';
        errors['formIsValid'] = false;
      } else {
        //     /^[a-zA-Z\s]+$/
       // if (!fields['user_name'].match(/^[a-zA-Z ]*$/))
        if (!fields['user_name'].match(/^[0-9a-zA-Z]*$/)) 

        {
          errors['user_name'] = 'Please enter alphabet characters only.';
          errors['formIsValid'] = false;
        } else errors['user_name'] = '';
      }
    }
    if (
      (fieldName == 'first_name' || fieldName == null) &&
      'first_name' in fields
    ) {
      if (!fields['first_name']) {
        errors['first_name'] = 'Please enter your first name.';
        errors['formIsValid'] = false;
      } else {
        if (!fields['first_name'].match(/^[a-zA-Z ]*$/)) {
          errors['first_name'] = 'Please enter alphabet characters only.';
          errors['formIsValid'] = false;
        } else errors['first_name'] = '';
      }
    }
    if (
      (fieldName == 'last_name' || fieldName == null) &&
      'last_name' in fields
    ) {
      if (!fields['last_name']) {
        errors['last_name'] = 'Please enter your last name.';
        errors['formIsValid'] = false;
      } else {
        if (!fields['last_name'].match(/^[a-zA-Z ]*$/)) {
          errors['last_name'] = 'Please enter alphabet characters only.';
          errors['formIsValid'] = false;
        } else errors['last_name'] = '';
      }
    }

    if ((fieldName == 'name' || fieldName == null) && 'name' in fields) {
      if (!fields['name']) {
        errors['name'] = 'Please enter name.';
        errors['formIsValid'] = false;
      } else {
        if (!fields['name'].match(/^[a-zA-Z ]*$/)) {
          errors['name'] = 'Please enter alphabet characters only.';
          errors['formIsValid'] = false;
        } else errors['name'] = '';
      }
    }
    /////

    if ((fieldName == 'college' || fieldName == null) && 'college' in fields) {
      if (!fields['college']) {
        errors['college'] = 'Please enter your college name.';
        errors['formIsValid'] = false;
      } else {
        ///^[a-zA-Z\s]+$/
        if (!fields['college'].match(/^[a-zA-Z ]*$/)) {
          errors['college'] = 'Please enter alphabet characters only.';
          errors['formIsValid'] = false;
        } else errors['college'] = '';
      }
    }
    /////
    if ((fieldName == 'major' || fieldName == null) && 'major' in fields) {
      if (!fields['major']) {
        errors['major'] = 'Please enter your major.';
        errors['formIsValid'] = false;
      } else {
        if (!fields['major'].match(/^[a-zA-Z ]*$/)) {
          errors['major'] = 'Please enter alphabet characters only.';
          errors['formIsValid'] = false;
        } else errors['major'] = '';
      }
    }
/////////////////
        //     /^[a-zA-Z\s]+$/
        if ((fieldName == 'enrollment' || fieldName == null) && 'enrollment' in fields) {
          if (!fields['enrollment']) {
            errors['enrollment'] = 'Please select enrollment.';
            errors['formIsValid'] = false;
          } else {
            if (!fields['enrollment'].match(/^[a-zA-Z ]+$/)) {
              errors['enrollment'] = 'Please Select enrollment.';
              errors['formIsValid'] = false;
            } else errors['enrollment'] = '';
          }
        }


    /////

    if ((fieldName == 'email' || fieldName == null) && 'email' in fields) {
      if (!fields['email']) {
        errors['email'] = 'Please enter your email address.';
        errors['formIsValid'] = false;
      } else {
        //regular expression for email validation
        // let pattern = new RegExp(
        //   /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?((?:[\w-]+\.)*\w[\w-]{1,30})\.ac.uk$/i,
        // );
        let pattern = new RegExp(
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        );
        if (!pattern.test(fields['email'])) {
          errors['email'] = 'please enter valid email address ';
          errors['formIsValid'] = false;
        } else errors['email'] = '';
      }
    }
    //Validating phone
    // if ((fieldName == 'phone' || fieldName == null) && 'phone' in fields) {
    //   if (!fields['phone']) {
    //     errors['phone'] = 'Enter your phone number.';
    //     errors['formIsValid'] = false;
    //   } else {
    //     errors['phone'] = '';
    //   }
    // }

    if (
      (fieldName == 'dateOfBirth' || fieldName == null) &&
      'dateOfBirth' in fields
    ) {
      if (!fields['dateOfBirth']) {
        errors['dateOfBirth'] = 'Please enter your date of birth';
        errors['formIsValid'] = false;
      } else {
        errors['dateOfBirth'] = '';
      }
    }
    if (
      (fieldName == 'password' || fieldName == null) &&
      'password' in fields
    ) {
      if (!fields['password']) {
        errors['password'] = 'Please enter your password.';
        errors['formIsValid'] = false;
      } 
      else {
        let pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        // let pattern = new RegExp(
        //   /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        // );
        if (fields['password'].length < 8) {
          errors['password'] = "*Password length must be 8 characters!'";
          errors['formIsValid'] = false;
        } 
       else if (!pattern.test(fields['password'])) {
        errors['password'] = "* Please enter at least one numeric digit, one uppercase and one lowercase letter!'";
        errors['formIsValid'] = false;
       }
        else {
          errors['password'] = '';
        }
      }
    }
//current_password
if (
  (fieldName == 'current_password' || fieldName == null) &&
  'current_password' in fields
) {
  if (!fields['current_password']) {
    errors['current_password'] = 'Please enter your current password.';
    errors['formIsValid'] = false;
  } else {
    let pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    // let pattern = new RegExp(
    //   /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    // );
    if (fields['current_password'].length < 8) {
      errors['current_password'] = "*Password length must be 8 characters!'";
      errors['formIsValid'] = false;
    } 
    else if (!pattern.test(fields['current_password'])) {
      errors['current_password'] = "* Please enter at least one numeric digit, one uppercase and one lowercase letter!'";
      errors['formIsValid'] = false;
     }
    else {
      errors['current_password'] = '';
    }
  }
}
    //Validating address
    if ((fieldName == 'address' || fieldName == null) && 'address' in fields) {
      if (!fields['address']) {
        errors['address'] = 'Please enter your address!';
        errors['formIsValid'] = false;
      } else {
        errors['address'] = '';
      }
    }
    //Validating sortCode
    if (
      (fieldName == 'sortCode' || fieldName == null) &&
      'sortCode' in fields
    ) {
      if (!fields['sortCode']) {
        errors['sortCode'] = 'Please enter sortCode!';
        errors['formIsValid'] = false;
      } else {
        errors['sortCode'] = '';
      }
    }

    //Validating postal
    if (
      (fieldName == 'postalCode' || fieldName == null) &&
      'postalCode' in fields
    ) {
      if (!fields['postalCode']) {
        errors['postalCode'] = 'Please enter postal code!';
        errors['formIsValid'] = false;
      } else {
        errors['postalCode'] = '';
      }
    }
//
    if (
      (fieldName == 'con_password' || fieldName == null) &&
      'con_password' in fields
    ) {
      if (!fields['con_password']) {
        errors['con_password'] = 'Please enter confirm your password.';
        errors['formIsValid'] = false;
      } else if (fields['con_password'] !== fields['password']) {
        errors['con_password'] = 'Password does not match.';
        errors['formIsValid'] = false;
      } else errors['con_password'] = '';
    }
    //

    //
    if (
      (fieldName == 'verifyOTP' || fieldName == null) &&
      'verifyOTP' in fields
    ) {
      if (!fields['verifyOTP']) {
        errors['verifyOTP'] = 'Please enter OTP.';
        errors['formIsValid'] = false;
      } else {
        if (fields['verifyOTP'].length < 4) {
          errors['verifyOTP'] = "Please enter OTP!'";
          errors['formIsValid'] = false;
        } else {
          errors['verifyOTP'] = '';
        }
      }
      //else errors['verifyOTP'] = '';
    }
    /*
        //Validating account_number
        if((fieldName == 'accountNumber' || fieldName == null) && ('accountNumber' in fields)){
            if(!fields['accountNumber']){
                errors['accountNumber'] = 'Please enter your account number!';
                errors["formIsValid"] = false;
            }else{
                errors['accountNumber'] = "";
            }
        }

        //Validating card number
        if((fieldName == 'cardNumber' || fieldName == null) && ('cardNumber' in fields)){
            if(!fields['cardNumber']){
                errors['cardNumber'] = 'Please enter your Card number!';
                errors["formIsValid"] = false;
            }else{
                    errors['cardNumber'] = "";
            }
        }
  
       //Validating expMonth
        if ((fieldName == 'expMonth' || fieldName == null) && ('expMonth' in fields)) {
            if (!fields['expMonth']) {
                errors['expMonth'] = 'Please enter expiry month!';
                errors["formIsValid"] = false;
            } else {
                if(fields['expMonth'] > 12 || fields['expMonth'] <= 0){
                    errors['expMonth'] = 'Please enter valid month!';
                    errors["formIsValid"] = false;
                }else{
                    errors['expMonth'] = "";
                }
            }
        }

        //Validating expYear
        if ((fieldName == 'expYear' || fieldName == null) && ('expYear' in fields)) {
            if (!fields['expYear']) {
                errors['expYear'] = 'Please enter expiry year!';
                errors["formIsValid"] = false;
            } else {
                errors['expYear'] = "";
            }
        }

         //Validating cvv
        if ((fieldName == 'cvv' || fieldName == null) && ('cvv' in fields)) {
            if (!fields['cvv']) {
                errors['cvv'] = 'Please enter cvv!';
                errors["formIsValid"] = false;
            } else {
                errors['cvv'] = "";
            }
        }
        
      
        //Validating city
        if((fieldName == 'city' || fieldName == null) && ('city' in fields)){
            if(!fields['city']){
                errors['city'] = 'Please enter your city!';
                errors["formIsValid"] = false;
            }else{
                    errors['city'] = "";
            }
        }

        //Validating state
        if((fieldName == 'state' || fieldName == null) && ('state' in fields)){
            if(!fields['state']){
                errors['state'] = 'Please enter your state!';
                errors["formIsValid"] = false;
            }else{
                errors['state'] = "";
            }
        }
*/

    return errors;
  },
};
module.exports = validator;
