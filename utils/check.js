//验证手机号
const checkPhoneNum = function(phoneNum){
  const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(phoneNum)) {
    return false;
  } else {
    return true;
  } 
}

module.exports = {
  checkPhoneNum: checkPhoneNum
}