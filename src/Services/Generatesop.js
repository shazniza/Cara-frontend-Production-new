
import pdfMake from 'pdfmake/build/pdfmake'
/* import htmlToPdfmake from 'html-to-pdfmake'; */
import pdfFonts from "pdfmake/build/vfs_fonts";



pdfMake.vfs = pdfFonts.pdfMake.vfs;


function getBase64ImageFromURL(url) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      resolve(dataURL);
    };

    img.onerror = error => {
      reject(error);
    };

    img.src = url;
  });
}

async function generatePdf(Sop) {

  function extractPlainText(html) {
    // Create a temporary element
    var tempElement = document.createElement('div');
    // Set the HTML content to the input HTML string
    tempElement.innerHTML = html;
    // Extract the plain text
    var plainText = tempElement.textContent || tempElement.innerText;
    // Remove the temporary element
    tempElement.remove();
    // Return the plain text
    return plainText.trim();
  }


  for (const index in Sop.images) {
    const urls = Sop.images[index];
    console.log(`URLs for index ${index}:`);
    urls.forEach((url, i) => {
      console.log(`URL ${i + 1}: ${url}`);
      console.log('url before going isnide', url)
    });
  } 

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();


    const docDefinition = {
      content: [
      {
    image: `data:image/png;base64,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`,
    width: 250,
    height: 100,
    alignment: 'center',
  
  },
   // SOP Title
   { text: 'Standard Operating Procedures (SOP)', style: 'header',tocItem: true ,alignment: 'center', margin: [0, 40, 0, 20]},
   { text: Sop.sopTitle, style: 'header',tocItem: true ,alignment: 'center', margin: [0, 40, 0, 20]},
  
   {
    absolutePosition: {x: 10, y: 660},
    table: {
      headerRows: 1,
      widths: ['*', 'auto', 100, '*'],
      body: [
        [{ text: 'Version History', colSpan: 4, bold: true }, {}, {}, {}], // First row with one cell that spans all columns
        [{ text: 'Version No.', colSpan: 1, bold: true }, { text: '1.0', colSpan: 1, bold: true }, { text: 'Effective Date', colSpan: 1, bold: true },{ text: Sop.effectiveDate, colSpan: 1, bold: true }], // Second row with four columns
        [{ text: 'Process Owner', colSpan: 1, bold: true },{ text: Sop.processOwner, colSpan: 3, bold: true }, {}, {}], 
        [{ text: 'Process Execution ', colSpan: 1, bold: true },{ text: Sop.processExecution, colSpan: 3, bold: true }, {}, {}], 
        [{ text: 'Reviewed By', colSpan: 1, bold: true }, { text: '', colSpan: 1, bold: true }, { text: 'Approved By ', colSpan: 1, bold: true },{ text: Sop.effectiveDate, colSpan: 1, bold: true }],
      ]
    },
    pageBreak: 'after'
  },
  // Table of Contents
  {
    toc: {
      title: { text: 'Table of Contents', style: 'header' }
    },
    pageBreak: 'after'
  },
  
  
   // Document Log
  {
    stack: [
  {
    absolutePosition: {x: 140, y: 100},
    table: {
      headerRows: 1,
      alignment: 'center',
      body: [
        [{ text: 'Date', colSpan: 1, bold: true }, { text: 'Created by', colSpan: 1, bold: true }, { text: 'Chnaged by', colSpan: 1, bold: true },{ text: 'Staff ID', colSpan: 1, bold: true },{ text: 'Business Unit', colSpan: 1, bold: true }], // Second row with four columns
        [{ text: formattedDate, colSpan: 1 }, { text: 'Created by', colSpan: 1}, { text: 'Chnaged by', colSpan: 1 },{ text: 'Staff ID', colSpan: 1 },{ text: 'Business Unit', colSpan: 1 }],
      ]
    },
    pageBreak: 'after'
  },
  ] 
  },
      // Policy
      { text: 'Policy: ', style: 'headerText',bold:true, tocItem: true },
      { text: extractPlainText(Sop.policy), style: 'italic',  margin: [0, 0, 0, 10] },

     
     // Polisi
     {
      text: Sop.Malaypolicy ? 'Purpose and Scope: ' : '',
      style: 'headerText',
    },
    {
      text: Sop.Malaypolicy ? extractPlainText(Sop.purposeScope) : '',
      style: 'italic',
      margin: [0, 0, 0, 10]
    },

      // Purpose and Scope
      { text: 'Purpose and Scope: ', style: 'headerText',tocItem: true },
      { text: extractPlainText(Sop.purposeScope), style: 'italic', margin: [0, 0, 0, 10] },


    //   TUJUAN DAN SKOP
      {
        text: Sop.MalaypurposeScope? 'Purpose and Scope: ' : '',
        style: 'headerText',
      },
      {
        text: Sop.MalaypurposeScope ? extractPlainText(Sop.purposeScope) : '',
        style: 'italic',
        margin: [0, 0, 0, 10]
      }, 




      // Review, Monitoring and Update
      { text: 'Review, Monitoring and Update: ', style: 'headerText',tocItem: true },
      { text: extractPlainText(Sop.monitoring), style: 'normal', margin: [0, 0, 0, 10], font: "Arial"},


       //SEMAKAN, PEMANTAUAN DAN KEMAS KINI
      {
        text: Sop.Malaymonitoring? 'Purpose and Scope: ' : '',
        style: 'headerText',
      },
      {
        text: Sop.Malaymonitoring ? extractPlainText(Sop.Malaymonitoring) : '',
        style: 'italic',
        margin: [0, 0, 0, 10]
      },

     




      // Procedures
      { text: 'Procedure and Description', style: 'subheader', margin: [0, 20, 0, 0], tocItem: true},
      {
        ul: Sop.procedures.flatMap((procedure, index) => [
          {
            text: `${index + 1}: ${extractPlainText(procedure)}`,
            fontSize: 12,
            bold: true,
            margin: [0, 0, 0, 10], // Add bottom margin of 10 units for line break
          },
          [
            {
              ul: [
                {
                  text: extractPlainText(Sop.descriptions[index]),
                  fontSize: 12,
                  margin: [0, 0, 0, 10], // Add bottom margin of 10 units for line break
                },
              ],
            },
          ],
        ]),
        pageBreak: 'after'
      },
      
      
      
      
      
      {
        text: 'Appendix',
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 10]
      },
    


      ...await Promise.all(
        Object.entries(Sop.images).map(async ([index, urls]) => {
          const appendixIndex = parseInt(index, 10) + 1; // Convert index to a number and add 1
          console.log(`URLs for index ${index}:`);
          if(Object.keys(Sop.images).length > 0) {
          return [
            { text: `Appendix: ${appendixIndex}`, style: 'heading' }, // Add the index as a text heading
            ...await Promise.all(
              urls.map(async (url, i) => {
                console.log(`URL ${i + 1}: ${url}`);
                console.log('URL before going inside', url);
                const imageUrl = url.startsWith('https://cara-sop.s3.ap-southeast-1.amazonaws.com/')
                  ? url
                  : `https://cara-sop.s3.ap-southeast-1.amazonaws.com/images/${url}`;
                  console.log('edit cheeck',imageUrl)
                const base64Image = await getBase64ImageFromURL(imageUrl);
                return {
                  image: base64Image,
                  fit: [600, 600], // Set the width and height of the image
                  pageBreak: 'after'
                };
              })
            ),
          ];
        }
        })
      ),
      
    ],

      styles: {
        header: { fontSize: 30, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        pageNumber: { fontSize: 10, alignment: 'right', margin: [0, 0, 20, 0] },
        normal: { fontSize: 12, margin: [0, 0, 0, 10] },
        headerText: { fontSize: 14, bold: true }
      },
      footer: function(currentPage, pageCount) {
    return {
      columns: [
      {
    text: 'Copyright 2023 AEON CO.(M) BHD. All rights reserved | Digital Interal Audit (DIA)',
    alignment: 'center',
    style: 'footer',
    margin: [0, 0, 0, 0],
    noWrap: true,
    lineHeight: 1.2
  },
  
        {
          text: currentPage.toString() + ' of ' + pageCount.toString(),
        alignment: 'right',
        style: 'footer',
        width: 'auto'
        }
      ],
      margin: [10, 0],
    style: 'footer'
    }
  },
      defaultStyle: {
        // Set the link color for the table of contents
        link: 'blue',
        font: 'Arial'
      }
      // Add a table of contents to the beginning of the document
      // Define the custom style for the table of contents
    };
      pdfMake.fonts = {
      Arial: {
        normal: '/arial.ttf',
        bold: '/Arial Bold.ttf',
        italic:'/Arial Italic.ttf'
        },
    }
    

    try {
      const pdf = pdfMake.createPdf(docDefinition,null,pdfMake.fonts);
      pdf.open();
    } catch (error) {
      // Handle the error here
      console.error('Error opening PDF:', error);
    }

  }
  export { generatePdf };