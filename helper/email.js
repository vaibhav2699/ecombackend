const nodeMailer = require("nodemailer");
const CONFIG = require("../config/config");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: CONFIG.email.EMAILUSERNAME,
    pass: CONFIG.email.EMAILPASSWORD,
  },
  // host: CONFIG.email.SMTP,
  // port: CONFIG.email.SMTP_PORT,
  // secure: false,
  // auth: {
  //   user: CONFIG.email.EMAILUSERNAME,
  //   pass: CONFIG.email.EMAILPASSWORD,
  // },
});

module.exports = {
  sendForVeriy: async (body) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.welcome,
      text: `   
    Hi ${body.firstName},
        Thank you for choosing us.
        We warmly welcome you to our family
Please Verify using the link:- ${CONFIG.BASEURL}/api/v1/user/verify/${body._id}
    Regards,
    ECOM
`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return {
          successMail: true,
          messageMail: "Mail sended",
        };
      } else {
        return {
          successMail: false,
          messageMail: "EMAIL NOT SENT",
        };
      }
    } catch (error) {
      return { successMail: false, messageMail: "ERROR HAPPEND IN SEND MAIl" };
    }
  },
  sendForEmailUpdate: async (body) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.email_Changed,
      text: `   
    Hi ${body.firstName},
        Thank you for choosing us.
       Your email has been updated 
Please Verify your account using the link:- ${CONFIG.BASEURL}/api/v1/user/verify/${body._id}
    Regards,
    ECOM
`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return {
          successMail: true,
          messageMail: "Mail sended",
        };
      } else {
        return {
          successMail: false,
          messageMail: "EMAIL NOT SENT",
        };
      }
    } catch (error) {
      return { successMail: false, messageMail: "ERROR HAPPEND IN SEND MAIl" };
    }
  },
  sendForPasswordUpdate: async (body) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.password_Changed,
      text: `   
    Hi ${body.firstName},
        Please Change your password using below 
        Link:- https://ecommercefa.netlify.app/confirmpassword?uid=${body._id}
    Regards,
    ECOM
`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return {
          successMail: true,
          messageMail: "Mail sended",
        };
      } else {
        return {
          successMail: false,
          messageMail: "EMAIL NOT SENT",
        };
      }
    } catch (error) {
      return { successMail: false, messageMail: "ERROR HAPPEND IN SEND MAIl" };
    }
  },
  sendForPasswordUpdateSuccess: async (body) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.password_Changed,
      text: `   
    Hi ${body.firstName},
    Your password has been changed successfully
    Regards,
    ECOM
`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return {
          successMail: true,
          messageMail: "Mail sended",
        };
      } else {
        return {
          successMail: false,
          messageMail: "EMAIL NOT SENT",
        };
      }
    } catch (error) {
      return { successMail: false, messageMail: "ERROR HAPPEND IN SEND MAIl" };
    }
  },
  sendOrderSuccess: async (body, response) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: response.userId.email,
      subject: CONFIG.emailSubject.order_confirmation,
      html: `
      <html>
<body>

<div  style="background-color:#ffffff;border: 4px solid #b4b4b4;">
<table style="margin:10px;"  width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td colspan="2"><img style ="margin-left:10px;margin-top:10px" src="https://ecommercefa.netlify.app/images/logo.png" width="150"  /></td>
  </tr>
  <tr>
    <td colspan="2"> </td>
  </tr>
  <tr>
    <td width="49%"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td><table style ="margin-left:10px" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="font-family:Verdana, Geneva, sans-serif;font-weight:600; font-size:15px;">Payment Information</td>
          </tr>
          <tr>
            <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">Date: ${
              response.createdAt
            }</td>
          </tr>
          <tr>
          <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">Payment-Id: ${
            response.paymentId
          }</td>
        </tr>
        <tr>
          <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">Order-Status: ${
            response.orderStatus
          }</td>
        </tr>
        <tr>
        <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">Promo-code used: ${
          response.promocodeId.couponcode
        }</td>
      </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:15px;">Invoice to: </td>
          </tr>
          <tr>
          <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">${
            response.userId.firstName + " " + response.userId.lastName
          }</td>
        </tr>
          <tr>
            <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">${
              response.addressId.address_1
            }</td>
          </tr>
          <tr>
            <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">${
              response.addressId.address_2
            }</td>
          </tr>
          <tr>
            <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">${
              response.addressId.landmark
            }</td>
          </tr>
          <tr>
          <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">${
            response.addressId.pincode
          }</td>
        </tr> 
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">Phone no:${
              response.userId.phoneNumber
            }</td>
          </tr>
          <tr>
            <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;">Addres-type:${
              response.addressId.type
            }</td>
          </tr>
        
          <tr>
            <td> </td>
          </tr>
          </table></td>
      </tr>
    </table></td>
    
  <tr>
    <td colspan="2"> </td>
  </tr>
  <tr>
    <td colspan="2"><table width="97%" border="0" cellspacing="0" cellpadding="0">
      <thead>
      <tr>
        <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px; border-top:1px solid #333; border-bottom:1px solid #333; border-left:1px solid #333; border-right:1px solid #333;" width="34%" height="32" align="center">Product Name</td>
        <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px; border-top:1px solid #333; border-bottom:1px solid #333; border-right:1px solid #333;" width="26%" align="center">Quantity</td>
        <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px; border-top:1px solid #333; border-bottom:1px solid #333; border-right:1px solid #333;" width="25%" align="center">Price</td>
        <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px; border-top:1px solid #333; border-bottom:1px solid #333; border-right:1px solid #333; border-right:1px solid #333;" width="15%" align="center">Discount-Price</td>
      </tr>
      </thead>
      <tbody>
      ${response.cartdetail
        .map(
          (value) =>
            `<tr>
            <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px; border-bottom:1px solid #333; border-left:1px solid #333; border-right:1px solid #333;" height="32" align="center">${value.productId.name}</td>
            <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px; border-bottom:1px solid #333; border-right:1px solid #333;" align="center">${value.quantity}</td>
            <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px; border-bottom:1px solid #333; border-right:1px solid #333;" align="center">${value.productId.price}</td>
            <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px; border-bottom:1px solid #333; border-right:1px solid #333; border-right:1px solid #333;" align="center">${value.productId.discountPrice}</td>
          </tr>`
        )
        .join("")}
      </tbody>
    </table></td>
  </tr>
  <tr>
    <td colspan="2"> </td>
  </tr>
  <tr >

    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" colspan="2">Discount-taken: ${
      response.discountPrice
    }</td>
   
  </tr>
  <tr >

    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" colspan="2">Total amount to be paid: ${
      response.totalPrice
    }</td>
   
  </tr>
  <tr>
    <td colspan="2"> </td>
  </tr>
  <tr>
    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px;" colspan="2">Please Note:</td>
  </tr>
  <tr>
    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" colspan="2">Dear Consumer, the bill payment will reflect in next 48 hours or in the next billing cycle, at your service provider’s end. Please  contact paytm customer support for any queries regarding this order.</td>
  </tr>
  <tr>
    <td colspan="2"> </td>
  </tr>
  <tr>
    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:600; font-size:13px;" colspan="2">DECLARATION:</td>
  </tr>
  <tr>
    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" colspan="2">This is invoice is only a confirmation of the receipt of the amount paid against for the service as described above.  Subject to terms and conditions mentioned at Shoppy</td>
  </tr>
  <tr>
    <td colspan="2"> </td>
  </tr>
  <tr>
    <td colspan="2"> </td>
  </tr>
  <tr>
    <td style="font-family:Verdana, Geneva, sans-serif; font-weight:300; font-size:13px;" colspan="2" align="center">(This is computer generated receipt and does not require physical signature.)  <br />804, Fortune Business Hub,<br/>Ahmedabad, Gujarat. 380060, <br/> PH: +91 79-46006836<br />  Service tax registration number: AAACO4007ASD002</td>
  </tr>
  <tr>
    <td colspan="2"> </td>
  </tr>
  <tr>
    <td colspan="2"> </td>
  </tr>
  <tr>
    <td colspan="2"> </td>
  </tr>
</table>
</div>
</body>
</html>
      `,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return {
          successMail: true,
          messageMail: "Mail sended",
        };
      } else {
        return {
          successMail: false,
          messageMail: "EMAIL NOT SENT",
        };
      }
    } catch (error) {
      return { successMail: false, messageMail: "ERROR HAPPEND IN SEND MAIl" };
    }
  },
  sendForAdminRegister: async (body, password) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.welcome,
      text: `Hi ${body.firstName},
         You have successfully registered to our Admin and your password is ${password}
        Regards,
        ECOM`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return {
          successMail: true,
          messageMail: "Mail sended",
        };
      } else {
        return {
          successMail: false,
          messageMail: "EMAIL NOT SENT",
        };
      }
    } catch (error) {
      return { successMail: false, messageMail: "ERROR HAPPEND IN SEND MAIl" };
    }
  },
  sendPwdUpdationSuccessfull: async (body, password) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.welcome,
      text: `Hi ${body.firstName},
         Your passwors has been updated and your new password is ${password}.
        Regards,
        ECOM`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return {
          successMail: true,
          messageMail: "Mail sended",
        };
      } else {
        return {
          successMail: false,
          messageMail: "EMAIL NOT SENT",
        };
      }
    } catch (error) {
      return { successMail: false, messageMail: "ERROR HAPPEND IN SEND MAIl" };
    }
  },
  sendPwdByMail: async (body, password) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.welcome,
      text: `Hi ${body.firstName},
         Your passwors has been updated and your new password is ${password}.
        Regards,
        ECOM`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return {
          successMail: true,
          messageMail: "Mail sended",
        };
      } else {
        return {
          successMail: false,
          messageMail: "EMAIL NOT SENT",
        };
      }
    } catch (error) {
      return { successMail: false, messageMail: "ERROR HAPPEND IN SEND MAIl" };
    }
  },
  adminUser_Pwd_Mail_Link: async (body) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.password_Changed,
      text: `   
    Hi ${body.firstName},
        Please Change your password using below 
        Link:- https://fea-admin.herokuapp.com/confirmPassword?uid=${body._id}
    Regards,
    ECOM
`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return {
          successMail: true,
          messageMail: "Mail sended",
        };
      } else {
        return {
          successMail: false,
          messageMail: "EMAIL NOT SENT",
        };
      }
    } catch (error) {
      return { successMail: false, messageMail: "ERROR HAPPEND IN SEND MAIl" };
    }
  },
};

//   text: `Hi ${body.firstName},
//   You have successfully registered as an ${body.role} and your
//   password is ${body.password}
//   Regards,
//  ECOM`,
