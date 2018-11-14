window.onload = function () {
    document.getElementById('main').style.visibility = 'hidden';
    getStateAndYearAndQuarterOnChange();
};



document.getElementById('state-info-input').onchange = function () {

    //console.log(data);
    document.getElementById('main').style.visibility = 'visible';

    document.getElementById("summary1").innerHTML = "";
    document.getElementById("summary2").innerHTML = "";

    // Select the input element and get the raw HTML node
    var inputElement = document.getElementById('state-info-input');
    var filteredData = null;
    // document.getElementById('mainresult').style.visibility ='hidden';
    if (inputElement) {
        var inputIndex = inputElement.selectedIndex;
        //var inputValue = inputElement.value;
        var inputText = inputElement.options[inputIndex].text;

        if (inputIndex === 0) {
            document.getElementById('main').style.visibility = 'hidden';
            inputElement.options[0].text = "Select State";
        }
        else 
        {
            inputElement.options[0].text = "Clear Selection";
            filteredData = data.filter(info => info.State === inputText);
            console.log(filteredData);
            if (filteredData && filteredData[0] && filteredData[0]["Total Number of Workers (in thousands)"]) {
                var workersNumber = filteredData[0]["Total Number of Workers (in thousands)"];
                console.log("Total Number of Workers (in thousands): " + workersNumber);
            }
            if (filteredData && filteredData[0] && filteredData[0]["Total Median Weekly Earnings"]) {
                var totalMedian = filteredData[0]["Total Median Weekly Earnings"];
                //console.log("Total Median Weekly Earnings: " + totalMedian);
            }
            if (filteredData && filteredData[0] && filteredData[0]["Women Number of Workers (in thousands)"]) {
                var womenNumber = filteredData[0]["Women Number of Workers (in thousands)"];
                //console.log("Women Number of Workers (in thousands): " + womenNumber);
            }
            if (filteredData && filteredData[0] && filteredData[0]["Women Median weekly earnings"]) {
                var womenMedian = filteredData[0]["Women Median weekly earnings"];
                console.log("Women Median weekly earnings: " + womenMedian);
            }
            if (filteredData && filteredData[0] && filteredData[0]["Men Number of workers (in thousands)"]) {
                var menNumber = filteredData[0]["Men Number of workers (in thousands)"];
                //console.log("Men Number of workers (in thousands) " + menNumber);
            }
            if (filteredData && filteredData[0] && filteredData[0]["Median weekly earnings"]) {
                var menMedian = filteredData[0]["Median weekly earnings"];
                //console.log("Men Median weekly earnings: " + menMedian);
            }
            if (filteredData && filteredData[0] && filteredData[0]["Women's earnings as a percentage of men's"]) {
                var earningsComparison = filteredData[0]["Women's earnings as a percentage of men's"];
                //console.log("Women's earnings as a percentage of men's: " + earningsComparison);
            }
            if (filteredData && filteredData[0] && filteredData[0]["Rating"]) {
                var rating = filteredData[0]["Rating"];
                //console.log("Rating: " + rating);
            }
            else {
                console.log("Data is invalid");
            }

            d3.select("#summary1")
                .append("li").text(`Number of workers (in thousands): ${workersNumber}`)
                .append("li").text(`TotalMedian weekly earnings : ${totalMedian}`)
                .append("li").text(`Women Number of workers (in thousands): ${womenNumber}`)
                .append("li").text(`Women Median weekly earnings: ${womenMedian}`)
            d3.select("#summary2")
                .append("li").text(`Men Number of workers (in thousands): ${menNumber}`)
                .append("li").text(`Men Median weekly earnings : ${menMedian}`)
                .append("li").text(`Women's earnings as a percentage of men's: ${earningsComparison}`)
                .append("li").text(`Rating: ${rating}`);
            
        }
        
        getStateAndYearAndQuarterOnChange();
    }
};

function getStateAndYearAndQuarterOnChange () {

    // Select the input element and get the raw HTML node
    
    var inputElementState = document.getElementById('state-info-input');
    var inputElementStateIndex = inputElementState.selectedIndex;
    
    var inputElementStateText = "";
    
    if (inputElementStateIndex > 0)
        inputElementStateText = inputElementState.options[inputElementStateIndex].text;
    else
        inputElementStateText = "";

    var inputElementQuarter = document.getElementById('quarter');

    var inputElementYear = document.getElementById('year');

    if (inputElementQuarter && inputElementYear) {
        filterOnChange(inputElementYear.value, inputElementQuarter.value, inputElementStateText);
    }
}

document.getElementById('year').onchange = function () {
    getStateAndYearAndQuarterOnChange();
    var inputIndex = document.getElementById('year').selectedIndex;

    if (inputIndex == 0)
        document.getElementById('year').options[0].text = "Select Year";
    else
        document.getElementById('year').options[0].text = "Clear Selection";
}

document.getElementById('quarter').onchange = function () {
    getStateAndYearAndQuarterOnChange();
    var inputIndex = document.getElementById('quarter').selectedIndex;
   
    if (inputIndex ==0)
        document.getElementById('quarter').options[0].text = "Select State";
    else
        document.getElementById('quarter').options[0].text = "Clear Selection";
}

function filterOnChange(year, quarter, state) {
    var data_years_quarters_states = years_quarters_states;
    if (year.length>0)
        data_years_quarters_states = data_years_quarters_states.filter(y => y.Year == year);

    if (quarter.length>0)
        data_years_quarters_states = data_years_quarters_states.filter(q => q.Quarter == quarter);
    
    if (state.length > 0) {
        data_years_quarters_states = data_years_quarters_states.filter(s => s.State == state);
    }
    drawTable(data_years_quarters_states);
}


function drawTable(tableData) {
    document.getElementById("table-area-tbody").innerHTML = "";
    d3.select("tbody")
        .selectAll("tr")
        .data(tableData)
        .enter()
        .append("tr")
        .style("text-align", "right")
        .html(function (d) {
            return `<td>${d["State"]}</td><td>${d["Year"]}</td><td>${d["Quarter"]}</td><td>${d["One-Year Employment Gain/Loss (Percent)"]}</td><td>${d["Average Weekly Wages"]}</td><td>${d["On-Year Weekly Wages Gain/Loss (Percent)"]}</td>`;
        });
}







