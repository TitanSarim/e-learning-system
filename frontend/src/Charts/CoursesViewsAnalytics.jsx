import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';


const CoursesViewsAnalytics = ({viewsByCourse}) => {

    const [data, setData] = useState([])

    useEffect(() => {

        if(viewsByCourse){
            setData(viewsByCourse)
        }

    }, [viewsByCourse])

    const courseTitles = data.map(item => item.course_title);
    const views = data.map(item => item.views);

    // Options for the bar chart
    const options = {
        chart: {
            height: 350,
            type: 'bar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {

                horizontal: true,
                distributed: true,
                barHeight: '80%', // Adjust the height of the bars
                borderRadius: 20, // Set the border radius for rounded bars
            },
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                fontSize: '12px',
                colors: ['#333']
            },
            formatter: function (val) {
                return val;
            }
        },
        xaxis: {
            categories: courseTitles, // Course titles on x-axis
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
                text: 'Views',
                style: {
                    fontSize: '15px',
                    color: 'white',
                    fontWeight: 'regular'
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
        tooltip: {
            enabled: true,
            shared: false,
            y: {
                formatter: function (val) {
                    return val + " views";
                }
            }
        },
        legend: {
            show: false // Hide legend
        }
    };

    // Series data for the bar chart
    const series = [{
        name: 'Views',
        data: views
    }];



    console.log("data", data)

  return (
    <div>
        <p>Course Views</p>
        <Chart options={options} series={series} type="bar" height={350} />
    </div>
  )
}

export default CoursesViewsAnalytics