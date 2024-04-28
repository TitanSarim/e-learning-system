import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const CourseRevenueAnalytics = ({ courseRevenue }) => {

    const [chartDataAnalytics, setChartDataAnalytics] = useState([])


    useEffect(() => {
        if (courseRevenue) {
            // Assuming courseRevenue is an array of objects
            setChartDataAnalytics(courseRevenue.slice(0, 20));
        }
    }, [courseRevenue]);


    // Extracting data for chart
    const chartData = chartDataAnalytics?.map(([index, { title, revenue, teacher }]) => ({
        x: title,
        y: revenue,
    }))?.slice(0, 20); 

    chartData?.sort((a, b) => b.y - a.y);
    
    const series = [{
        name: 'Revenue',
        data: chartData?.map(item => item.y)
    }];

    const options = {
        chart: {
            id: 'column-chart',
            height: 500,
            type: 'bar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: false,
                    position: 'top',
                },
                
                distributed: true,
                columnWidth: '70%', // Adjust the width of the bars
                borderRadius: 25, // Set the border radius for rounded bars
            },
        },
        dataLabels: {
            enabled: true,
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ['#ffffff'],
            },
        },
        xaxis: {
            categories: chartData?.map(item => item.x), // Title
            position: 'top',
            labels: {
              show: false,
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            tooltip: {
                enabled: false
            }
        },
        yaxis: {
          title: {
            text: 'Revenue',
            style: {
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 'Regular' 
            }
          },
          axisBorder: {
              show: false
          },
          axisTicks: {
              show: false,
          },
          labels: {
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
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$" + val;
                }
            }
        },
        legend: {
            show: false // Hide legend
        }
    };

    return (
        <div>
            <p>Top 20 Courses By Revenue</p>
            <Chart
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </div>
    );
}

export default CourseRevenueAnalytics;
