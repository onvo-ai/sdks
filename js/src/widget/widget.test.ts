import { Onvo } from "../index";

describe("Widget", () => {
  let onvo: Onvo;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should get widget image", async () => {
    let response = await onvo
      .widget("adc6b5b5-1256-4c2e-90b7-acc4abe105dd")
      .getImage();

    expect(response).toBeDefined();
  });
  it("should update widget prompt", async () => {
    let newWidget = await onvo
      .widget("adc6b5b5-1256-4c2e-90b7-acc4abe105dd")
      .updatePrompts([
        {
          role: "user",
          content:
            "Create a bar chart showing the orders per month. The x axis should show the month and year in MM-YYYY format",
        },
      ]);
    expect(newWidget).toBeDefined();
    expect(newWidget.id).toBeDefined();
  }, 30000);

  it("should execute widget code", async () => {
    let response = await onvo.widget("adc6b5b5-1256-4c2e-90b7-acc4abe105dd")
      .executeCode(`
import pandas as pd
import numpy as np

def main():
    # Load the necessary columns from the first CSV file
    df1 = pd.read_csv('/tmp/d2c3422b-e0c9-4946-bc42-8dd13a2c8bc5.csv', 
                      usecols=['Order ID', 'Order Date'])
    
    # Extract the year from the 'Order Date' column
    df1['Year'] = pd.to_datetime(df1['Order Date']).dt.year
    
    # Count the number of orders per year
    order_counts = df1.groupby('Year')['Order ID'].nunique()
    
    # Create the chart.js object
    chart = {
        "type": "bar",
        "data": {
            "labels": order_counts.index.tolist(),
            "datasets": [{
                "label": "Number of Orders",
                "data": order_counts.values.tolist(),
                "backgroundColor": 'rgba(75, 192, 192, 0.2)',
                "borderColor": 'rgba(75, 192, 192, 1)',
                "borderWidth": 1
            }]
        },
        "options": {
            "responsive": True,
            "maintainAspectRatio": False,
            "plugins": {
                "datalabels": {
                    "display": False
                },
                "title": {
                    "display": True,
                    "text": 'Yearly Order Count'
                }
            }
        }
    }
    
    return chart
    `);
    expect(response).toBeDefined();
  }, 30000);
});
