var company= [

	{
		name: "Fireclad Ltd",
		address: {
					street: "120 Old Broad Street",
					city: "London",
					postcode: "EC2N 1AR"
		}
	},

	{
		name: "Jarvis Ltd",
		address: {
					street: "10 Artiellery Passage",
					city: "London",
					postcode: "E1 7LU"
		}
	},

	{
		name: "MG Drywall",
		address: {
					street: "14 Finchley Park",
					city: "London",
					postcode: "N12 9JN"
		}
	}

]

document.getElementById("selectName").addEventListener("load", fillDrowDown());

function fillDrowDown(){

		for (var i=0; i<company.length; i++){
				var companyName = company[i].name;
				var select =  document.getElementById("selectName");
				options = document.createElement("option");
				options.textContent = companyName;
				options.value = companyName;
				select.appendChild(options);

		}
}

function showAddress() {

		var select = document.getElementById("selectName");
		var option = select.options[select.selectedIndex];
		console.log(option.value);
		for (var i=0; i<company.length; i++){

			 if (option.value == company[i].name)
				{
					document.getElementById("street-input").value = company[i].address.street;
					document.getElementById("town-input").value = company[i].address.city;
					document.getElementById("postcode-input").value = company[i].address.postcode;
				}

	}
		}

var getElelemtsForChart = [];

function calculateInvoice(input) {
        var laborTotal = parseInt(input,10);
        getElelemtsForChart.push(laborTotal);
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
    /*var item = document.getElementById("hide");
    if (item.style.display === "none") {
        item.style.display = "block";
    } else {
        item.style.display = "none";
    }
    
    item = document.getElementById("hide2");
    if (item.style.display === "none") {
        item.style.display = "block";
    } else {
        item.style.display = "none";
    }*/
    
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


document.getElementById("chartType").addEventListener("change", getCharts, false);

function getCharts() {

    var chartType = document.getElementById("chartType").value;
    document.getElementById("myChartLabel").innerHTML = "Chart: " + document.getElementById("selectName").value
    
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
	title:{
		text: "Date: " + document.getElementById("invoiceD-input").value,
		horizontalAlign: "center"
	},
    
    
	data: [{
         indexLabelFontColor: "black",
        // Change type 
        type: chartType,
        indexLabelFontSize: 10,
		indexLabel: "{label} - #percent%",
		toolTipContent: "<b>{label}:</b> {y} (#percent%)",
		dataPoints: [
         
			{ label: "Labor Total", y:parseInt(getElelemtsForChart[0]) },
			{ label: "VAT" , y: parseInt(getElelemtsForChart[1])},
			{ label: "Sub Total", y:parseInt(getElelemtsForChart[2])},
			{ label: "Less CIS 20%",y:parseInt(getElelemtsForChart[3])},
			{ label: "Total Due", y:parseInt(getElelemtsForChart[4])},

		]
	}]
    
});                
              
chart.render();

}





