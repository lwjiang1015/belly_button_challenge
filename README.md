# belly-button-challenge

## Overview
This assignment visualises the presence of microbial species (also called operational taxonomic units, or OTUs) in human navels. Specifically:

## 1. Use the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

** The function init() is used to initialise the visualisation before the following plots/display are conducted.**
## 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in the selected sample(individual).

    **Use sample_values as the values for the bar chart.
    **Use otu_ids as the labels for the bar chart.
    **Use otu_labels as the hovertext for the chart.

## 3. Create a bubble chart that displays each sample.
    **Use otu_ids for the x values.
    **Use sample_values for the y values.
    **Use sample_values for the marker size.
    **Use otu_ids for the marker colors.
    **Use otu_labels for the text values.

## 4. Display the sample metadata, i.e., an individual's demographic information.
## 5. Display each key-value pair from the metadata JSON object under the heading Demographic Info.
## 6. Update all the plots when a new sample is selected. 

## Additionally: 
Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.
    **Modify the example gauge code to account for values ranging from 0 through 9.
    **Update the chart whenever a new sample is selected.

## 7. App is deployed to Github Pages; here is the link: https://lwjiang1015.github.io/belly-button-challenge/


## References/acknowledgement
- University of Adelaide. (2023). Module 14 content.
https://bootcampspot.instructure.com/courses/4781/pages/14-interactive-web-visualisations?module_item_id=1163045
- Bellyt Button Biodiversity. Retrived from: https://robdunnlab.com/projects/belly-button-biodiversity/
- Bubble charts in JavaScript. Retrieved from: https://plotly.com/javascript/bubble-charts/
- Gauge charts in JavaScript. Retrieved from: https://plotly.com/javascript/gauge-charts/
- The help from the teaching team, from the Xpert Learning Assistant at Datacampspot, and from the ChatGPT are acknowledged. 