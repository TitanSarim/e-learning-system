import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const IncomeByMonthChart = ({ incomeByMonth }) => {
    const [monthlyIncome, setMonthlyIncome] = useState([]);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        if (incomeByMonth) {
            setMonthlyIncome(Object.values(incomeByMonth)); // Convert object values to array
        }
    }, [incomeByMonth]);

    const options = {
        chart: {
            type: 'polarArea',
            height: 350,
            sparkline: {
                enabled: true // Remove lines connecting points
            }
        },
        labels: monthNames,
        fill: {
            opacity: 0.9
        },
        grid: {
            show: true,
            borderColor: 'rgb(172, 172, 172)', // Set color of circular lines
            strokeDashArray: 0, // Remove straight lines
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ],
        plotOptions: {
            polarArea: {
              rings: {
                strokeWidth: 1,
                strokeColor: "rgb(172, 172, 172)"
              },
              spokes: {
                strokeWidth: 0
              },
            }
        },
        theme: {
            monochrome: {
              enabled: true,
              shadeTo: 'light',
              shadeIntensity: 10
            }
        }
    };

    const series = monthlyIncome;

    return (
        <div>
            <p>Monthly Income</p>
            <Chart options={options} series={series} type="polarArea" height={350} />
        </div>
    );
}

export default IncomeByMonthChart;
