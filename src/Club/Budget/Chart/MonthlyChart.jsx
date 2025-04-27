import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyChart = ({ monthlyData }) => {
    const incomeData = monthlyData.map(item => Number(item.income));
    const expenseData = monthlyData.map(item => Math.abs(Number(item.expense))); // 음수를 양수로 변환!
    const labels = monthlyData.map(item => item.yearMonth);
    
    const data = {
    labels,
    datasets: [
      {
        label: '수입',
        data: incomeData,
        borderColor: '#36A2EB',
        backgroundColor: '#36A2EB33',
        tension: 0.3,
        fill: false,
      },
      {
        label: '지출',
        data: expenseData,
        borderColor: '#FF6384',
        backgroundColor: '#FF638433',
        tension: 0.3,
        fill: false,
      },
    ],
  };
  const options = {
    responsive: true,
    animation: {
      duration: 2000, // 2초로 느리게
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: '월별 수입 / 지출 그래프',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${value.toLocaleString()} 원`;
          },
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 0,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
    
  return (
    <div style={{ width: '100%', height:'100%', maxWidth: '800px', margin: 'auto' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthlyChart;
