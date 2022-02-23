export function barLineTransformer(data, indicator) {
  var final_data = [];
  let fiscalData = [];
  let valueData = [];
  let labelData = {
    "Budget Estimates": "Value (In Crores)",
    "Revised Estimates": "Value (In Crores)",
    "Actual Expenditure": "Value (In Crores)",
    "Actual Expenditure as a % of Total Actual Expenditure":
      "Value (in Percent)",
    "Actual Expenditure as a % of Ministry": "Value (in Percent)",
    "Fund Utilisation": "Value (in Percent)",
  };

  for (var i = 0; i < data.length; i++) {
    fiscalData.push(data[i]["fiscalYear"]);
    valueData.push(
      data[i]["value"].includes("%")
        ? data[i]["value"].slice(0, -2)
        : data[i]["value"]
    );
  }

  final_data.push(fiscalData);
  final_data.push(valueData);
  final_data.push(["Fiscal Year", labelData[indicator]]);

  return final_data;
}
