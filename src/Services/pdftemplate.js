

import jsPDF from 'jspdf';


function generatePDF() {
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Add content to the document

    doc.addImage('https://cara-sop.s3.ap-southeast-1.amazonaws.com/palestramgb_A_woman_she_is_happy_she_is_with_your_dog_cute_swee_e9666ffc-3ff0-44a2-ba1d-c158edf01301.png', 'PNG', 10, 10, 100, 100);
  
    // Save the document
    doc.save('sample.pdf');
  }
  

  export { generatePDF };  