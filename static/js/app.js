//Use the D3 library to read in samples.json from the URL provided.
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

//Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log("data", data);
});

//Initialise the plots and the display of demographic information with the dropdown menu.
function init(){
    //use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    //populate dropdown menu with the test subject ID (names).
    d3.json(url).then(function(data){
        let testSubjectID = data.names;
        //loop through the array of names in the data and append the names to the dropdown menu.
        testSubjectID.forEach((name) => {
            dropdownMenu.append("option").text(name).property("value") 
        });

        //Create the initial sample from the list
        let initialSample = testSubjectID[0];
        //Initialise the plots and disply of demographic information
        visualise(initialSample);
    });
};
init()

//Creeate the visualise function for the plots and display to be called upon the sample selection.
function visualise(testSubjectID){
    d3.json(url).then(function(data){
        let samples = data.samples;
        console.log("samples", samples);

        //Use the filter to get the data for the selected individual
        let sampleArray1 = samples.filter(sample =>sample.id == testSubjectID);
        //Sort the data by sample_values descending
        let sortedSampleArray1 = sampleArray1.sort((a,b) =>b.sample_values - a.sample_values);
        //Select the initial sample
        let sample1 = sampleArray1[0];
        //Define each array needed for plotting
        let otu_ids = sample1.otu_ids;
        let sample_values = sample1.sample_values;
        let otu_labels = sample1.otu_labels;

        //Trace1 for the horizontal bar chart to display the top 10 OUTs found in the selected individual
        let trace1 = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otu_ids =>"OTU " + otu_ids).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };
        //Data array
        let data1 = [trace1];
        //Apply a title to layout
        let layout1 = {
            title: ("Top 10 OTUs: " + testSubjectID)
        };
        //Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", data1, layout1);

        //Create a bubble chart that display each sample as required.
        //Trace2 for the bubble chart
        let trace2 = {
            x: otu_ids,
            y: sample_values,
            mode:"markers",
            marker:{
                size: sample_values,
                color: otu_ids
            },
            text: otu_labels
        };
        //Data array
        let data2 = [trace2];
        //Apply a title to layout
        let layout2 = {
            xaxis: {title:testSubjectID}
        };
        //Render the bubble chart to the div tag with id "bubble"
        Plotly.newPlot("bubble", data2, layout2);

        //Display the sample metadata.
        let metadata = data.metadata;
        console.log("metadata", metadata);

        //Display each key-value pair from the metadata JSON object on the page
        //Use filter to get the data for the selected individual
        let sampleArray2 = metadata.filter(sample =>sample.id == testSubjectID);
        //Select the initial sample
        let sample2 = sampleArray2[0];

        //Select the div tag with id "sample-metadata"
        let demographicInfo = d3.select("#sample-metadata");
        //Clear current content if any
        demographicInfo.html("");
        //Loop through each entry and append the key-value pairs to the page 
        for (entry in sample2){
            demographicInfo.append("h6").text(entry + ":" + sample2[entry])
        };

    //Additional: create a gauge chart for weekly washing frequency
    //Define a variable for the weekly washing frequency array
    let wfreq = sample2.wfreq;

    //Trace3 for the gauge chart
    let trace3 = {
        domain: {x: [0,1], y: [0,1]},
        value: wfreq,
        title: ("<b>Belly Button Washing Frequency</b> <br> Scrubs per week <br>" + testSubjectID + "<br>"),
        type: "indicator",
        shape: "angular",
        mode: "gauge+number",
        gauge:{
            axis: {range: [0,9]},
            bar: {color: "green", thickness: 0.08},
            steps: [
                {range: [0,1], color:"#E0FFE0"},
                {range: [1,2], color:"#B0FFB0"},
                {range: [2,3], color:"#80FF80"},
                {range: [3,4], color:"#40FF40"},
                {range: [4,5], color:"#00FF00"},
                {range: [5,6], color:"#00E000"},
                {range: [6,7], color:"#00C000"},
                {range: [7,8], color:"#00A000"},
                {range: [8,9], color:"#008000"},
            ]
        }
    };
    //Data array
    let data3 = [trace3];
    //specify layout
    let layout = {width: 600, height: 500};
    //Render the gauge chart to the div tag with id "gauge"
    Plotly.newPlot("gauge", data3, layout)
    });
};

//Update the plots and display upon the selection of a new sample
function optionChanged(testSubjectID){
    visualise(testSubjectID);
};