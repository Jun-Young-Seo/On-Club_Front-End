import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenseData }) => {
  const labels = expenseData.map(item => item.transactionDetail);
  const dataValues = expenseData.map(item => item.totalAmount);

  const chartData = {
    labels,
    datasets: [
      {
        label: '출금 금액',
        data: dataValues,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ],
        hoverOffset: 4,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '이 달의 지출',
        font: {
          size: 15,
        },
        padding: {
          top: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value.toLocaleString()} 원`;
          },
        },
      },
    },
  };
  
  return (
    <div style={{ width: '250px', height: '250px', margin: 'auto' }}>
      {expenseData.length > 0 ? (
        <Doughnut data={chartData} options={chartOptions} />
      ) : (
        <p>데이터 없음</p>
      )}
    </div>
  );
};

export default ExpenseChart;
