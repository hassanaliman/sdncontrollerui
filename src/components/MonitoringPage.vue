<template>
  <div>
    <h3 class="mt-3">of:000062349de15b46</h3>
    <canvas ref="myChart"></canvas><br><br>
    <h3>of:000092491a93524c</h3>
    <canvas ref="myChart2"></canvas><br><br>
    <h3>of:000072114471fa4b</h3>
    <canvas ref="myChart3"></canvas><br><br>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import {ref, onMounted} from 'vue';
import UserService from '../services/user.service';

export default {
  setup() {
    const myChart = ref(null);
    const myChart2 = ref(null);
    const myChart3 = ref(null);

    onMounted(() => {
      const canvas = myChart.value;
      canvas.height = 75;

      const canvas2 = myChart2.value;
      canvas2.height = 75;

      const canvas3 = myChart3.value;
      canvas3.height = 75;

      const labels = [];

      const labels2 = [];

      const labels3 = [];

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Port 1',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
          },
          {
            label: 'Port 2',
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            data: [],
          },
          {
            label: 'Port 3',
            backgroundColor: 'rgb(255, 162, 235)',
            borderColor: 'rgb(255, 162, 235)',
            data: [],
          },
        ]
      };

      const data2 = {
        labels: labels2,
        datasets: [
          {
            label: 'Port 1',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
          },
          {
            label: 'Port 2',
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            data: [],
          },
          {
            label: 'Port 3',
            backgroundColor: 'rgb(255, 162, 235)',
            borderColor: 'rgb(255, 162, 235)',
            data: [],
          },
        ]
      };

      const data3 = {
        labels: labels3,
        datasets: [
          {
            label: 'Port 1',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
          },
          {
            label: 'Port 2',
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            data: [],
          },
          {
            label: 'Port 3',
            backgroundColor: 'rgb(255, 162, 235)',
            borderColor: 'rgb(255, 162, 235)',
            data: [],
          },
        ]
      };


      const config = {
        type: 'line',
        data: data,
        options: {}
      };

      const config2 = {
        type: 'line',
        data: data2,
        options: {}
      };

      const config3 = {
        type: 'line',
        data: data3,
        options: {}
      };

      const chart = new Chart(
        canvas,
        config
      );

      const chart2 = new Chart(
        canvas2,
        config2
      );

      const chart3 = new Chart(
        canvas3,
        config3
      );

      function addData(chart, label, data1, data2, data3) {
        if(chart.data.labels.length < 20) {
          chart.data.labels.push(label);
          chart.data.datasets.forEach((dataset, index) => {
            if (index == 0) {
              dataset.data.push(data1);
            } else if (index == 1) {
              dataset.data.push(data2);
            } else {
              dataset.data.push(data3);
            }
          });
          chart.update();
        } else {
          chart.data.labels.shift();
          chart.data.datasets.forEach((dataset) => {
            dataset.data.shift();
          });
        }
      }

      function addData2(chart, label, data1, data2, data3) {
        if(chart.data.labels.length < 20) {
          chart.data.labels.push(label);
          chart.data.datasets.forEach((dataset, index) => {
            if (index == 0) {
              dataset.data.push(data1);
            } else if (index == 1) {
              dataset.data.push(data2);
            } else {
              dataset.data.push(data3);
            }
          });
          chart.update();
        } else {
          chart.data.labels.shift();
          chart.data.datasets.forEach((dataset) => {
            dataset.data.shift();
          });
        }
      }

      function addData3(chart, label, data1, data2, data3) {
        if(chart.data.labels.length < 20) {
          chart.data.labels.push(label);
          chart.data.datasets.forEach((dataset, index) => {
            if (index == 0) {
              dataset.data.push(data1);
            } else if (index == 1) {
              dataset.data.push(data2);
            } else {
              dataset.data.push(data3);
            }
          });
          chart.update();
        } else {
          chart.data.labels.shift();
          chart.data.datasets.forEach((dataset) => {
            dataset.data.shift();
          });
        }
      }

      setInterval(async () => {
        const d = new Date();
        const n = d.toLocaleTimeString();
        var newData1 = 0;
        var newData2 = 0;
        var newData3 = 0;
        var newData4 = 0;
        var newData5 = 0;
        var newData6 = 0;
        var newData7 = 0;
        var newData8 = 0;
        var newData9 = 0;
        await UserService.getMonitoring().then((response) => {
          var temp = response.data;
          newData1 = temp.statistics[0].ports[0].bytesReceived;
          newData2 = temp.statistics[0].ports[1].bytesReceived;
          newData3 = temp.statistics[0].ports[2].bytesReceived;
          newData4 = temp.statistics[1].ports[0].bytesReceived;
          newData5 = temp.statistics[1].ports[1].bytesReceived;
          newData6 = temp.statistics[1].ports[2].bytesReceived;
          newData7 = temp.statistics[2].ports[0].bytesReceived;
          newData8 = temp.statistics[2].ports[1].bytesReceived;
          newData9 = temp.statistics[2].ports[2].bytesReceived;
        })
        addData(chart, n, newData1, newData2, newData3);
        addData2(chart2, n, newData4, newData5, newData6);
        addData3(chart3, n, newData7, newData8, newData9);
      }, 1000);
    });

    return {
      myChart,
      myChart2,
      myChart3
    };
  }
};
</script>