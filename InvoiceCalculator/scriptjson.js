document.getElementById("selectName").addEventListener("load", fillDrowDown());
var companyData;
var getElelemtsForChart = [];

function fillDrowDown(){
    
    var myRequest = new XMLHttpRequest();
    
    myRequest.open("GET", "https://raw.githubusercontent.com/VDzhurkova/projects/master/company.json", true);

    myRequest.onload = function() {
        
       
        companyData = JSON.parse(myRequest.responseText);
         
        for (var i=0; i<companyData.company.length; i++){
				var companyName = companyData.company[i].name;
				var select =  document.getElementById("selectName");
				options = document.createElement("option");
				options.textContent = companyName;
				options.value = companyName;
				select.appendChild(options);

		}
       
    };
        
    myRequest.onerror = function() {
        
        console.log("Error");
    }
    
    myRequest.send();
    
  }  

  function showAddress() {

		var select = document.getElementById("selectName");
		var option = select.options[select.selectedIndex];
		for (var i=0; i<companyData.company.length; i++){

			 if (option.value == companyData.company[i].name)
				{
					document.getElementById("street-input").value = companyData.company[i].address.street;
					document.getElementById("town-input").value = companyData.company[i].address.city;
					document.getElementById("postcode-input").value = companyData.company[i].address.postcode;
				}

	}
}



function calculateInvoice(input) {
        var laborTotal = parseInt(input,10);
        var vat =0; 
        var subTotal;
        
        if (document.getElementById("selectRate").value == "1"){
            subTotal = laborTotal;
        }
        else{
		vat = laborTotal*0.2;
		subTotal = laborTotal + vat;	
        }
        
        var less20 = laborTotal * 0.2;
        var totaldue = subTotal - less20 ;
    
     
        document.getElementById("vat").innerHTML = vat;
        getElelemtsForChart.push(vat);
        document.getElementById("subtotal").innerHTML = subTotal;
        getElelemtsForChart.push(subTotal);
        document.getElementById("less").innerHTML = less20; 
        getElelemtsForChart.push(less20);
		document.getElementById("totalDue").innerHTML = totaldue;
        getElelemtsForChart.push(totaldue);
    
}

function htmlToPdf(){
   
    html2canvas(document.getElementById('toPdf'), {
            onrendered: function(canvas) {
                var wid;
        var hgt;
        var img = canvas.toDataURL("image/png", wid = canvas.width, hgt = canvas.height);
        var hratio = hgt/wid;
        var doc = new jsPDF('p','pt','a4');
        var width = doc.internal.pageSize.width;    
        var height = width * hratio;
        doc.addImage(img,'JPEG',5,150, width, height);
        doc.save('invoice.pdf');  
            }
        });
 
}


document.getElementById("chartButton").addEventListener("click", getCharts, false);
document.getElementById("chartType").addEventListener("change", getCharts, false);


function getCharts() {

    var chartType = document.getElementById("chartType").value;
    document.getElementById("myChartLabel").innerHTML = "Chart: " + document.getElementById("selectName").value + "<br/>Date: " + document.getElementById("invoiceD-input").value
    
var chart = new CanvasJS.Chart("chartContainer", {
    theme:"theme2",
	animationEnabled: true,
    backgroundColor: "transparent",
    dataPointMaxWidth: 20,
    axisX:{
        labelFontColor: "black",
        gridColor: "white",
        lineColor: "white"
    },
    axisY:{
        //maximum: 5,
        labelFontColor: "black",
        gridColor: "white",
        gridThickness: 1,
        lineColor: "white"
    },
	/*title:{
		text: "Date: " + document.getElementById("invoiceD-input").value,
		horizontalAlign: "center"
	},*/
    
    
	data: [{
         indexLabelFontColor: "black",
        // Change type 
        type: chartType,
        indexLabelFontSize: 10,
		indexLabel: "{label} - #percent%",
		toolTipContent: "<b>{label}:</b> {y} (#percent%)",
		dataPoints: [
         
			{ label: "Labor Total", y:parseInt(document.getElementById("laborTotal").value) },
			{ label: "VAT" , y: parseInt(getElelemtsForChart[0])},
			{ label: "Sub Total", y:parseInt(getElelemtsForChart[1])},
			{ label: "Less CIS 20%",y:parseInt(getElelemtsForChart[2])},
			{ label: "Total Due", y:parseInt(getElelemtsForChart[3])},

		]
	}]
    
});                
              
chart.render();

}





		