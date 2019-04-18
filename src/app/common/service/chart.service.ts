import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChartService {

    constructor() {
    }

    drawProgress(options) {
        const PI = Math.PI,
            percent = options.percent || 0,
            backgroundColor = options.backgroundColor || '#040E18',
            frontColor = options.frontColor,
            speed = options.speed || 10,
            id = options.id,
            r = options.r || 63,
            fontSize = options.fontSize || '38px',
            lineWidth = options.lineWidth || 8,
            backLineWidth = options.backLineWidth || 14,
            sR = options.sR * PI || 0.83 * PI; // 默认圆弧的起始点弧度为π/2
        if (percent < 0 || percent > 100) {
            return;
        }
        if (sR < PI / 2 || sR >= 3 / 2 * PI) {
            return;
        }

        const canvas = document.querySelector(id),
            cxt = canvas['getContext']('2d'),
            cWidth = canvas['width'],
            cHeight = canvas['height'] + 25;

        const finalRadian = sR + ((PI + (PI - sR) * 2) * percent / 100); // 红圈的终点弧度
        const step = (PI + (PI - sR) * 2) / 100; // 一个1%对应的弧度大小
        let value = 0; // 显示的数字
        const timer = setInterval(function () {
            cxt.clearRect(0, 0, cWidth, cHeight);
            const endRadian = sR + value * step;
            drawCanvas(cWidth / 2, cHeight / 2, r, sR, sR + (PI + (PI - sR) * 2), backgroundColor, backLineWidth, false);  // 背景圆弧
            drawCanvas(cWidth / 2, cHeight / 2, r, sR, endRadian, frontColor, lineWidth, false); // 进度条圆弧

            // 画红色圆头
            const angle = 2 * PI - endRadian; // 转换成逆时针方向的弧度（三角函数中的）
            const xPos = Math.cos(angle) * r + cWidth / 2; // 红色圆 圆心的x坐标
            const yPos = -Math.sin(angle) * r + cHeight / 2; // 红色圆 圆心的y坐标
            drawCanvas(xPos, yPos, 6, 0, 2 * PI, 'white', 2, true);
            drawCanvas(xPos, yPos, 3, 0, 2 * PI, '#EA8744', 2, true);

            // 数字
            cxt.fillStyle = frontColor;
            cxt.font = fontSize + ' PT Sans';
            const valueWidth = cxt.measureText(value + '%').width;
            cxt.fillText(value, cWidth / 2 - valueWidth / 2 + 10, cHeight / 2);
            cxt.font = '16px PT Sans';
            cxt.fillText('%', cWidth / 2 + 14, cHeight / 2);
            value++;

            cxt.fillStyle = '#CACACA';
            cxt.font = '14px PT Sans';
            const textWidth = cxt.measureText(value + '%').width;
            cxt.fillText(options.text, cWidth / 2 - textWidth / 2 - 20, cHeight / 2 + 25);

            if (endRadian.toFixed(2) >= finalRadian.toFixed(2)) {
                clearInterval(timer);
            }
        }, speed);

        function drawCanvas(x, y, radius, sRadian, eRadian, color, width, isFill) {
            cxt.beginPath();
            cxt.lineCap = 'round';
            if (isFill) {
                cxt.fillStyle = color;
            } else {
                cxt.strokeStyle = color;
            }
            cxt.lineWidth = width;
            cxt.arc(x, y, radius, sRadian, eRadian, false);
            isFill ? cxt.fill() : cxt.stroke();
        }
    }

    drawTemp(tmp, color, r, isDrawText) {
        const PI = Math.PI, radius = r || 6;
        const canvas = document.querySelector('#temp'),
            cxt = canvas['getContext']('2d'),
            cWidth = canvas['width'],
            cHeight = canvas['height'] + 80;

        // 底部半圆
        cxt.beginPath();
        cxt.lineCap = 'round';
        cxt.fillStyle = color;
        cxt.arc(cWidth / 8, cHeight / 2, radius, 0, PI, false);
        cxt.fill();

        // 顶部半圆
        cxt.beginPath();
        cxt.arc(cWidth / 8, cHeight / 2 - tmp, radius, PI, 2 * PI, false);
        cxt.fill();

        // 中间矩形温度
        cxt.beginPath();
        cxt.rect(cWidth / 8 - radius, cHeight / 2 - tmp, 2 * radius, tmp);
        cxt.fill();

        if (isDrawText) {
            cxt.fillStyle = '#50D076';
            cxt.font = '36px PT Sans';
            cxt.fillText('10', cWidth / 2 - 30, cHeight / 2 - 30);
            cxt.font = '16px PT Sans';
            cxt.fillText('℃', cWidth / 2 + 15, cHeight / 2 - 30);
            cxt.fillStyle = '#CACACA';
            cxt.font = '14px PT Sans';
            cxt.fillText('设备核心温度', cWidth / 2 - 30, cHeight / 2);
        }
    }

    drawFlowChart(data) {
        const flowData = [];
        data.forEach((item) => {
            flowData.push({
                type: 'line',
                name: item.name,
                smooth: true,
                showSymbol: false,
                symbolSize: 2,
                lineStyle: {
                    width: 1,
                    color: item.color
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{offset: 0, color: item.color}, {offset: 1, color: '#1D2C45'}]
                    },
                    opacity: 0.2
                },
                data: item.value
            });
        });
        return {
            legend: {
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: '#BAC0C0',
                    fontWeight: 'bold'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                x: 20,
                y: 20,
                x2: 20,
                y2: 20,
                height: 220,
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        textStyle: {
                            color: '#BAC0C0',
                            fontSize: 12
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#32346C',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#32346C',
                        }
                    },
                    data: ['1h', '2h', '3h', '4h', '5h', '6h', '7h']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#BAC0C0',
                            fontSize: 12
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#32346C',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#32346C',
                        }
                    },
                    axisTick: {
                        show: false
                    }
                }
            ],
            series: flowData
        };
    }

}
