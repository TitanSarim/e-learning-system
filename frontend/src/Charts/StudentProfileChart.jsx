import Chart from 'react-apexcharts';
import React from 'react'



const StudentProfileChart = () => {


    const chartData = {
        options: {
          chart: {
            id: 'column-chart',
            toolbar: {
                show: false, // Hide the toolbar
            },
          },
          xaxis: {
            categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            labels: {
                show: false,
              },
              lines:{
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false, 
              },
              grid: {
                show: false, 
              },
          },
          grid: {
            xaxis: {
                lines: {
                    show: false
                }
            },   
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
          yaxis: {
            labels: {
              show: false,
            },
            lines:{
                show: false,
            },
            grid:{
                show: false,
            }
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: 'top',
              },
                columnWidth: '70%', // Adjust the width of the bars
                borderRadius: 20, // Set the border radius for rounded bars
            },
          },
          dataLabels: {
            enabled: true,
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ['#304758'],
            },
          },
          title: {
            align: 'center',
            margin: 20,
            offsetY: 20,
            style: {
              fontSize: '20px',
            },
          },
        },
        series: [
          {
            name: 'Sales',
            data: [30, 40, 25, 50, 49],
          },
        ],
      };

    return (
        <div>
          <Chart options={chartData.options} series={chartData.series} type="bar" height={170} />
        </div>
    );
}

export default StudentProfileChart