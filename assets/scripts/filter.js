"use strict";




function createCheckbox(g,x,y,alist)
{
    let filterItems = g.selectAll("g.filter-input")
    .data(Object.keys(alist))
    .enter()
    .append("g",":first-child")
    .classed("filter-input",true)
    .on("change",filtered)

    let lbl = filterItems.append("label")
    .attr('for',d=>d)
    .attr('class',"el-checkbox is-checked")
    lbl.append("input")
    .attr("type","checkbox")
    .attr("id",d=>d)
    .attr('class',"el-checkbox__input is-checked")
    .property("checked",true)

    lbl.append("span")
    .attr('class',"el-checkbox__label")
    .text(d=>cleanItUp(alist[d]))


}


function filtered()
{
    var choices = [];
    d3.selectAll("g.filter-input").each(
        function(d)
        {        
            let cb = d3.select(this).select("input");
            if(cb.property("checked")){
                choices.push(cb.attr("id"));
            }
        }
    )

    d3.selectAll("circle.dot")
    .each(
        function(d) {
            if (! (choices.includes(d.TYPE) && choices.includes(d.PUR)))
            {
                d3.select(this).classed("fade",true)
            }
            else {
                d3.select(this).classed("fade",false)
            }
        }
    )
}

function cleanItUp(str){
    var s = str.toLowerCase();
    if (s.includes('atmospheric,')) {
        s = s.replace('atmospheric,', '');
        return s = s.charAt(1).toUpperCase() + s.slice(2);
    } else {
        return s = s.charAt(0).toUpperCase() + s.slice(1);
    }
}
