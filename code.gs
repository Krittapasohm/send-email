function doGet() {
  var template = HtmlService.createTemplateFromFile('index');
  template.action = 'sendpdf';
  return template.evaluate();
}

function processForm(form) {
  var fullName = form.fullName;
  var numberproject = form.numberproject;  //หมายเลขโครงการ
  var nameproject = form.nameproject;  //ชื่อโครงการ 
  var namereport = form.namereport;   //เลขที่รายงาน  
  var nameretopic = form.nameretopic;   //หัวข้ออุบัติเหตุ(อย่างย่อ)  
  var date = form.date;
  var recipient = form.email;
  var sendType = form.sendType;
  var sendType1 = form.sendType1;


  if ((sendType === 'pdf' || sendType1 === 'wold') || sendType === 'form') {
    var attachments = [];
    if (sendType === 'pdf') {
      attachments = attachments.concat(form.pdf); 
    }
    if (sendType1 === 'wold') {
      attachments = attachments.concat(form.wold);
    }

    var message = '\nหมายเลขโครงการ: '+ numberproject+'\nชื่อโครงการ : '+nameproject+'\nเลขที่รายงาน : '+namereport+ '\nหัวข้ออุบัติเหตุ(อย่างย่อ): '+nameretopic + '\nวันที่เกิดเหตุ : '+date + '\nชื่อผู้รายงาน: '+fullName + '\nเบอร์โทรผู้รายงาน: ' ;
    
    if (sendType === 'form') {
      var formData = '';
      for (var field in form) {
        if (field !== 'pdf' && field !== 'wold' && field !== 'sendType' && field !== 'sendType1' && field !== 'email'  && field !== 'fullName' &&field !== 'numberproject'&&field !== 'nameproject'&&field !== 'namereport'&&field !== 'nameretopic'&&field !== 'data') {
          formData += field + ': ' + form[field] + '\n';
        }
      }
      message += + formData;
    }

    if (recipient !== '') {
      GmailApp.sendEmail(recipient, 'PDF files', 'Here  the files you requested.\n\n' + message, {attachments: attachments});
      return true;
    }
  }
  return false;
}
