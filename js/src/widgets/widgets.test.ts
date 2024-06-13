import { Onvo, Widget } from "../index";

describe("Widgets", () => {
  let onvo: Onvo;
  let newWidget: Widget;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should list widgets", async () => {
    let widgets = await onvo.widgets.list({
      dashboard: "f90182a2-f485-45a8-a9d6-b72021c03b50",
    });

    expect(widgets).toBeDefined();
    expect(widgets.length).toBeDefined();
    expect(widgets.length).toBeGreaterThan(0);
  });
  it("should create widget", async () => {
    newWidget = await onvo.widgets.create({
      title: "Test widget",
      messages: [
        {
          role: "user",
          content:
            "Create a bar chart showing the orders per month. The x axis should show the month and year in MM-YYYY format",
        },
      ],
      layouts: {
        lg: {
          x: 6,
          y: 3,
          w: 6,
          h: 3,
        },
      },
      settings: {
        disable_download_images: false,
        disable_download_reports: false,
        title_hidden: false,
      },
      code: `import pandas as pd
import numpy as np

def main():
    # Load the necessary columns from the first CSV file
    df1 = pd.read_csv('/tmp/d65edfb2-f781-4815-899e-5f50134b36b8.csv', 
                      usecols=['Order ID', 'Order Date'])
    
    # Convert 'Order Date' to datetime format and extract the month and year
    df1['Order Date'] = pd.to_datetime(df1['Order Date'])
    df1['Month-Year'] = df1['Order Date'].dt.strftime('%m-%Y')
    
    # Count the number of orders per month
    orders_per_month = df1['Month-Year'].value_counts().sort_index()
    
    # Create the chart.js object
    chart = {
        "type": "bar",
        "data": {
            "labels": orders_per_month.index.tolist(),
            "datasets": [{
                "label": "Number of Orders",
                "data": orders_per_month.values.tolist(),
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
                    "text": 'Orders per Month'
                }
            }
        }
    }
    
    return chart`,
      team: "3d05b990-c855-4945-bdd1-b3a8305ffc59",
      dashboard: "f90182a2-f485-45a8-a9d6-b72021c03b50",
      cache: JSON.stringify({
        type: "bar",
        data: {
          labels: [
            "01-2015",
            "01-2016",
            "01-2017",
            "01-2018",
            "02-2015",
            "02-2016",
            "02-2017",
            "02-2018",
            "03-2015",
            "03-2016",
            "03-2017",
            "03-2018",
            "04-2015",
            "04-2016",
            "04-2017",
            "04-2018",
            "05-2015",
            "05-2016",
            "05-2017",
            "05-2018",
            "06-2015",
            "06-2016",
            "06-2017",
            "06-2018",
            "07-2015",
            "07-2016",
            "07-2017",
            "07-2018",
            "08-2015",
            "08-2016",
            "08-2017",
            "08-2018",
            "09-2015",
            "09-2016",
            "09-2017",
            "09-2018",
            "10-2015",
            "10-2016",
            "10-2017",
            "10-2018",
            "11-2015",
            "11-2016",
            "11-2017",
            "11-2018",
            "12-2015",
            "12-2016",
            "12-2017",
            "12-2018",
          ],
          datasets: [
            {
              label: "Orders",
              data: [
                79, 58, 89, 155, 46, 64, 83, 107, 157, 138, 163, 238, 135, 160,
                170, 203, 122, 146, 225, 242, 135, 138, 199, 245, 143, 140, 201,
                226, 153, 159, 176, 218, 268, 293, 363, 459, 159, 166, 196, 298,
                318, 324, 370, 459, 278, 316, 352, 462,
              ],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              display: false,
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Month-Year (MM-YYYY)",
                },
              },
            ],
          },
        },
      }),
    });

    expect(newWidget).toBeDefined();
    expect(newWidget.id).toBeDefined();
  });

  it("should update widget", async () => {
    let widget = await onvo.widgets.update(newWidget.id, {
      title: "Automation test",
    });
    expect(widget).toBeDefined();
    expect(widget.id).toBeDefined();
    expect((widget.settings as any).title).toBeDefined();
    expect((widget.settings as any).title).toEqual("Automation test");
  });

  it("should get widget", async () => {
    let widget = await onvo.widgets.get(newWidget.id);
    expect(widget).toBeDefined();
    expect(widget.id).toBeDefined();
  });

  it("should delete widget", async () => {
    let response = await onvo.widgets.delete(newWidget.id);

    expect(response).toBeDefined();
    expect(response.success).toEqual(true);
  });
});
